const getLanguage = () => navigator.language || navigator.userLanguage;

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    api_key: API_KEY,
  }
});


// Utils

const createNoMoviesContainer = (container) => { 
  const noMoviesContainer = document.createElement('div');
  noMoviesContainer.classList.add('no-movies-container');
  const noMoviesText = document.createElement('p');
  noMoviesText.textContent = getLangLabels(getLanguage()).no_movies;
  noMoviesContainer.appendChild(noMoviesText);
  container.appendChild(noMoviesContainer);
}

const toggleLike = (movieContainer) => { 
  const likeBtn = movieContainer.querySelector('.like-button');
  const likeIcon = likeBtn.querySelector('i');
  likeIcon.classList.toggle('fas');
  likeIcon.classList.toggle('far');
  const favorites = getFavorites();
  const movie = {
    id: Number(movieContainer.getAttribute('data-id')),
    title: movieContainer.getAttribute('data-title'),
    poster_path: movieContainer.getAttribute('data-poster_path'),
  }
  if (likeIcon.classList.contains('fas')) {
    // Add to favorites
    favorites.push(movie);
  } else {
    // Remove from favorites
    const index = favorites.findIndex(favorite => favorite.id === movie.id);
    favorites.splice(index, 1);
    Array.from(trendingMoviesPreviewList.children).forEach(movieContainerElement => {
      if (Number(movieContainerElement.getAttribute('data-id')) === movie.id) {
        const likeIcon = movieContainerElement.querySelector('.like-button i');
        likeIcon.classList.add('far');
        likeIcon.classList.remove('fas');
      }
    });
  }
  setFavorites(favorites);
  renderMovies(favorites, favoriteMoviesList, true);
}

const getFavorites = () => { 
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites;
}

const setFavorites = (favorites) => { 
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

const lazyLoader = new IntersectionObserver((entries, observer) => {
  // This function will be called each time an image is intersecting the viewport
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target.querySelector('img');
      const src = img.getAttribute('data-src');
      img.setAttribute('src', src);
      observer.unobserve(entry.target);
    }
  })
});

function createInfiniteScroll(callback) {
  // Singleton pattern for easy cleanup
  if (createInfiniteScroll.instance) createInfiniteScroll.instance.disconnect();
  
  createInfiniteScroll.instance = new IntersectionObserver((entries, observer) => {
    // This function will be called each time the footer container is approaching the viewport
    // It will destroy the observer upon calling the callback
    anyIntersection = false;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback();
        anyIntersection = true;
      }
    })
    if (anyIntersection) {
      observer.disconnect();
    }
  }, {
    rootMargin: '0px 0px 100px 0px',
  });
  createInfiniteScroll.instance.observe(footerSection);
}

function renderMovies(movies, container, lazyLoad = false, append = false) {

  // If there are no movies, create a no movies container
  if (movies.length === 0) {
    container.innerHTML = '';
    createNoMoviesContainer(container);
    return;
  }

  // Clean the container
  if (!append) container.innerHTML = '';

  // Create a movie container for each movie in the DOM
  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.setAttribute('data-id', movie.id);
    movieContainer.setAttribute('data-title', movie.title);
    movieContainer.setAttribute('data-poster_path', movie.poster_path);

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute(lazyLoad ? 'data-src' : 'src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
    movieImg.setAttribute('alt', movie.title);
    movieContainer.appendChild(movieImg);
    movieImg.addEventListener('error', () => {
      movieContainer.removeChild(movieImg);
      const defaultCover = document.createElement('div');
      defaultCover.classList.add('default-cover');
      const textContainer = document.createElement('p');
      textContainer.textContent = movie.title;
      defaultCover.appendChild(textContainer);
      movieContainer.appendChild(defaultCover);
    });

    const likeBtn = document.createElement('div');
    const isFavorite = getFavorites().find(favorite => favorite.id === movie.id) !== undefined;
    likeBtn.classList.add('like-button');
    likeBtn.innerHTML = `<i class="${isFavorite ? "fas" : "far"} fa-heart"></i>`;
    likeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLike(movieContainer);
    });
    movieContainer.appendChild(likeBtn);
    
    movieContainer.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}-${movie.title}`;
    });
    
    if (lazyLoad) lazyLoader.observe(movieContainer);

    container.appendChild(movieContainer);
  })
}

function renderCategories(categories, container) {
  
    // Clean the container
    container.innerHTML = '';
  
    // Create a category container for each category in the DOM
    categories.forEach(category => {
      const categoryContainer = document.createElement('div');
      categoryContainer.classList.add('category-container');
  
      const categoryTitle = document.createElement('h3');
      categoryTitle.classList.add('category-title');
      categoryTitle.setAttribute('id', 'id' + category.id);
      categoryTitle.textContent = category.name;
      categoryContainer.appendChild(categoryTitle);
  
      categoryContainer.addEventListener('click', () => {
        location.hash = `#category=${category.id}-${category.name}`;
      });
  
      container.appendChild(categoryContainer);
    })
}

// API calls

async function getTrendingMoviesPreview() {

  // Retrieve the movies from the API
  const { data } = await api('trending/movie/day', {
    params: {
      language: getLanguage(),
    }
  });
  const movies = data.results;

  // Render the movies
  renderMovies(movies, trendingMoviesPreviewList, true);
}

async function getCategoriesPreview() {

  // Retrieve the categories from the API
  const { data } = await api('genre/movie/list', {
    params: {
      language: getLanguage(),
    }
  });
  const categories = data.genres;

  // Render the categories
  renderCategories(categories, categoriesPreviewList);

}

async function getMoviesByCategory(id, page = 1) {

  // Retrieve the movies from the API
  const { data } = await api('discover/movie', {
    params: {
      with_genres: id,
      page,
      language: getLanguage(),
    }
  });
  const movies = data.results;
  const total_pages = data.total_pages;

  // Render the movies
  renderMovies(movies, genericSection, true, page > 1);

  // Create the infinite scroll
  if (page < total_pages)
    createInfiniteScroll(() => getMoviesByCategory(id, page + 1));
}

async function getMoviesBySearch(query, page = 1) {

  // Retrieve the movies from the API
  const { data } = await api('search/movie', {
    params: {
      query,
      page,
      language: getLanguage(),
    }
  });
  const movies = data.results;
  const total_pages = data.total_pages;
  
  // Render the movies
  renderMovies(movies, genericSection, true, page > 1);

  // Create the infinite scroll
  if (page < total_pages)
    createInfiniteScroll(() => getMoviesBySearch(query, page + 1));
}

async function getTrendingMovies(page = 1) {

  // Retrieve the movies from the API
  const { data } = await api('trending/movie/day', {
    params: {
      page,
      language: getLanguage(),
    }
  });
  const movies = data.results;
  const total_pages = data.total_pages;

  // Render the movies
  renderMovies(movies, genericSection, true, page > 1);

  // Create the infinite scroll
  if (page < total_pages)
    createInfiniteScroll(() => getTrendingMovies(page + 1));
}

async function getMovieDetails(movieId) {

  // Retrieve the details from the API
  const { data: movie } = await api('movie/' + movieId, {
    params: {
      language: getLanguage(),
    }
  });

  // Set the movie details
  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average.toFixed(1);

  // Set the background image
  if (movie.backdrop_path) {
    headerSection.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
  } else if (movie.poster_path) {
    headerSection.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`;
  }
  
  // Set the categories
  const categories = movie.genres;
  renderCategories(categories, movieDetailCategoriesList);

  // Retrieve the related movies from the API
  const { data } = await api('movie/' + movieId + '/recommendations', {
    params: {
      language: getLanguage(),
    }
  });
  const relatedMovies = data.results;

  // Render the related movies
  renderMovies(relatedMovies, relatedMoviesContainer, true);
}
