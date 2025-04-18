import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import navigationView from "./views/navigationView";
import paginationView from "./views/paginationView";

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
  navigationView.init();
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
