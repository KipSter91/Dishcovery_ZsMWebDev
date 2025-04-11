import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import navigationView from "./views/navigationView";

import "core-js/actual";
import "regenerator-runtime/runtime.js";

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
  try {
    const query = searchView.getQuery();
    if (!query) return;



    //Loading serch results
    await model.loadSearchResult(query);
  } catch (err) {
    console.error(`☠️${err}☠️`);
    // searchView.renderError();
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
