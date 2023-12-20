const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    api_key: API_KEY,
  }
});

async function getTrendingMoviesPreview() {

  if (trendingMoviesPreviewList.children.length > 0) return;

  // Retrieve the movies from the API
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  // Create a movie container for each movie in the DOM
  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
    movieImg.setAttribute('alt', movie.title);
    movieContainer.appendChild(movieImg);

    trendingMoviesPreviewList.appendChild(movieContainer);
  })
}

async function getCategoriesPreview() {

  if (categoriesPreviewList.children.length > 0) return;

  // Retrieve the categories from the API
  const { data } = await api('genre/movie/list');
  const categories = data.genres;

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
 
    categoriesPreviewList.appendChild(categoryContainer);
  })
}

async function getMoviesByCategory(id) {

  // Retrieve the movies from the API
  const { data } = await api('discover/movie', {
    params: {
      with_genres: id,
    }
  });
  const movies = data.results;

  // Clean the container
  genericSection.innerHTML = '';

  // Create a movie container for each movie in the DOM
  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
    movieImg.setAttribute('alt', movie.title);
    movieContainer.appendChild(movieImg);

    genericSection.appendChild(movieContainer);
  })
}
