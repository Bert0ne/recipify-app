import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import { Logger } from 'sass';

// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    // 0) Update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //model.state.search.results

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query)
      return resultsView.renderError('You put nothing. Try put some query');
    // 2) Loading search results
    await model.loadSearchResults(query);
    // 3) Render search results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);

    // 5) Sorting buttons init
    resultsView.showSortContainer();
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // 2) Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  // 1.ADD/REMOVE Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe);
  // 2. Update recipe view
  recipeView.update(model.state.recipe);
  // 3. Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe, recipeIng) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe, recipeIng);

    // render recipe
    recipeView.render(model.state.recipe);

    // succes message
    addRecipeView.renderMessage();

    // Render  bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change id in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.history.back()

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC);
  } catch (err) {
    console.error('error bro', err);
    addRecipeView.renderError(err.message);
  }
};
const controlSortChoice = function (sortType) {
  // 1) hide sort menu
  resultsView.toggleSortWindow();

  // 2) sort array
  model.sortResults(sortType);

  // 3) render sorted array
  resultsView.render(model.getSearchResultsPage());
};

const clearURL = function () {
  window.location = '';
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.renderForm();
  addRecipeView.addHandlerUpload(controlAddRecipe);
  resultsView.addSortHandlerClick(controlSortChoice);
  recipeView.clearUrlHandler(clearURL);
};
init();
