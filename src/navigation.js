searchFormBtn.addEventListener('click', () => location.hash = `#search=${searchFormInput.value}`);
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
  headerSection.style.background = '';
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
}

function categoriesPage() {

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
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
  headerCategoryTitle.textContent = categoryName;

}

function movieDetailsPage() {

  headerSection.classList.add('header-container--long');
  //headerSection.style.background = '';
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

}

function searchPage() {

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
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
}

function trendsPage() {

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
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
}
