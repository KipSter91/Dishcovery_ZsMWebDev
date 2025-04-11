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

const controlRecipe = async function () {
  try {
    const id = window.location.hash.replace("#", "");
    // console.log(id);
    if (!id) return;

    //Rendering loader (bouncing dots)
    recipeView.renderLoader();

    // Loading recipe
    await model.loadRecipe(id);

    //Redering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(`☠️${err}☠️`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
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

const init = () => {
  navigationView.init();
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
