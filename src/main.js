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

function renderMovies(movies, container) {

  // Clean the container
  container.innerHTML = '';

  // Create a movie container for each movie in the DOM
  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const imgSrc = movie.poster_path ? movie.poster_path : movie.backdrop_path;

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + imgSrc);
    movieImg.setAttribute('alt', movie.title);
    movieContainer.appendChild(movieImg);

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

  if (trendingMoviesPreviewList.children.length > 0) return;

  // Retrieve the movies from the API
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  // Render the movies
  renderMovies(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {

  if (categoriesPreviewList.children.length > 0) return;

  // Retrieve the categories from the API
  const { data } = await api('genre/movie/list');
  const categories = data.genres;

  // Render the categories
  renderCategories(categories, categoriesPreviewList);

}

async function getMoviesByCategory(id) {

  // Retrieve the movies from the API
  const { data } = await api('discover/movie', {
    params: {
      with_genres: id,
    }
  });
  const movies = data.results;

  // Render the movies
  renderMovies(movies, genericSection);
}

async function getMoviesBySearch(query) {

  // Retrieve the movies from the API
  const { data } = await api('search/movie', {
    params: {
      query,
    }
  });
  const movies = data.results;

  // Render the movies
  renderMovies(movies, genericSection);
}

async function getTrendingMovies() {

  // Retrieve the movies from the API
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  // Render the movies
  renderMovies(movies, genericSection);
}
