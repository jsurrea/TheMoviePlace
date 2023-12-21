searchFormBtn.addEventListener('click', () => {
  if (searchFormInput.value.trim() === '') return;
  location.hash = `#search=${searchFormInput.value}`;
});
trendingBtn.addEventListener('click', () => location.hash = '#trends');
arrowBtn.addEventListener('click', () => {
  const stateLoad = window.history.state ? window.history.state.loadUrl : 
    '';
  console.log(stateLoad);
  if (stateLoad.includes('#')) {
    window.location.hash = '';
  } else {
    window.history.back();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  navigator();
  // Add a initial loading state
  window.history.pushState({ loadUrl: window.location.href }, null, '')
}, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {

  // Clear background image
  headerSection.style.backgroundImage = '';

  if (location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
  } else {
    homePage();
  }

  // Scroll to top
  document.documentElement.scrollTop = 0;
}

function homePage() {

  headerSection.classList.remove('header-container--long');
  headerSection.classList.remove('header-container-back')
  footerSection.classList.remove('inactive');
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');

  getTrendingMoviesPreview();
  getCategoriesPreview();
  document.title = "The Movie Place 🍿"
}

function categoriesPage() {

  headerSection.classList.remove('header-container--long');
  headerSection.classList.add('header-container-back')
  footerSection.classList.remove('inactive');
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [categoryId, categoryName] = location.hash.split('=')[1].split('-');
  getMoviesByCategory(categoryId);
  headerCategoryTitle.textContent = decodeURI(categoryName).trim();
  document.title = decodeURI(categoryName).trim();
}

function movieDetailsPage() {

  headerSection.classList.add('header-container--long');
  headerSection.classList.remove('header-container-back')
  footerSection.classList.add('inactive');
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');

  const [movieId, movieTitle] = location.hash.split('=')[1].split('-');
  // Preload the movie details
  movieDetailTitle.innerText = decodeURI(movieTitle).trim();
  getMovieDetails(movieId);
  document.title = decodeURI(movieTitle).trim() + " 🎬";
}

function searchPage() {

  headerSection.classList.remove('header-container--long');
  headerSection.classList.remove('header-container-back')
  footerSection.classList.remove('inactive');
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const query = decodeURI(location.hash.split('=')[1]).trim();
  getMoviesBySearch(query);

  headerCategoryTitle.textContent = `Search results: "${query}"`;
  document.title = "Search Results 🔎"
}

function trendsPage() {

  headerSection.classList.remove('header-container--long');
  headerSection.classList.add('header-container-back')
  footerSection.classList.remove('inactive');
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  getTrendingMovies();
  headerCategoryTitle.textContent = "Trending Movies";
  document.title = "Trending Movies 📈"
}
