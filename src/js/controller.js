import * as model from "./model";
import recipeView from "./views/recipeView";
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

const init = () => {
  recipeView.addHandleRender(controlRecipe);
  // NavigationView is automatically initialized through its constructor
};

init();
