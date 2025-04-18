import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import navigationView from "./views/navigationView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";

import "core-js/actual";
import "regenerator-runtime/runtime.js";

if (module.hot) {
  module.hot.accept();
}

// UI elements to hide initially
const searchResultsEl = document.querySelector(".search-results");
const containerEl = document.querySelector(".container");
let hasInteracted = false;

const controlRecipe = async function () {
  try {
    const id = window.location.hash.replace("#", "");
    // console.log(id);
    if (!id) return;

    // Show search results container once a recipe is selected
    if (searchResultsEl.classList.contains("hidden-initially")) {
      searchResultsEl.classList.remove("hidden-initially");
      // Remove initial state from container
      containerEl.classList.remove("initial-state");
    }
    hasInteracted = true;

    //Rendering loader (bouncing dots)
    recipeView.renderLoader();

    // Update results view to mark the selected result
    if (model.state.search.results.length > 0) {
      resultsView.update(model.getSearchResultsPage());
    }

    // Update bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // Loading recipe
    await model.loadRecipe(id);

    //Redering recipe
    recipeView.render(model.state.recipe);

    // Initialize image blur handler
    recipeView.addHandlerImageBlur();
  } catch (err) {
    console.error(`☠️${err}☠️`);
    recipeView.renderError();
  }
};

const controlServings = function (newServings) {
  // Update the recipe servings in the model
  model.updateServings(newServings);

  // Update the recipe view with the new state (without reloading the whole page)
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/remove bookmark based on current state
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // Update recipe view to show bookmarked status
  recipeView.update(model.state.recipe);

  // Update search results to highlight bookmarked recipes
  if (model.state.search.results.length > 0) {
    resultsView.update(model.getSearchResultsPage());
  }

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlClearBookmarks = function () {
  model.clearBookmarks();

  // Update recipe view if a recipe is loaded
  if (model.state.recipe.id) {
    recipeView.update(model.state.recipe);
  }

  // Update search results to remove bookmark highlights
  if (model.state.search.results.length > 0) {
    resultsView.update(model.getSearchResultsPage());
  }

  // Render empty bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlSearchResults = async function () {
  // Show search results container once a search is performed
  if (searchResultsEl.classList.contains("hidden-initially")) {
    searchResultsEl.classList.remove("hidden-initially");
    // Remove initial state from container
    containerEl.classList.remove("initial-state");
  }
  hasInteracted = true;

  resultsView.renderLoader();
  // console.log(resultsView);

  try {
    const query = searchView.getQuery();
    if (!query)
      return resultsView.renderError(
        "We couldn't process your search because no search term was entered. Please type something in the search bar and try again!"
      );

    //Loading search results
    await model.loadSearchResult(query);

    //Render results
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //Render inital pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(`☠️${err}☠️`);
  }
};

const controlPagination = (nextPage) => {
  // console.log(nextPage);
  resultsView.render(model.getSearchResultsPage(nextPage));

  //Render inital pagination buttons
  paginationView.render(model.state.search);
};

const setupInitialUI = () => {
  // Hide search results initially
  searchResultsEl.classList.add("hidden-initially");

  // Add initial-state class to container for better grid layout
  containerEl.classList.add("initial-state");

  // Update welcome message with food emoji
  const recipeContainer = document.querySelector(".recipe");
  recipeContainer.innerHTML = `
    <div class="message message--welcome">
      <div class="message__emoji">🍳</div>
      <p>Ready to discover something delicious? Start searching!</p>
    </div>
  `;
};

const init = () => {
  // Set up initial UI state
  setupInitialUI();

  // Initialize app components
  bookmarksView.render(model.state.bookmarks);
  navigationView.init();
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  bookmarksView.addHandlerDeleteAll(controlClearBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
