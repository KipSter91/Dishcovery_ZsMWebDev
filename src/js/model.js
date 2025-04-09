import "regenerator-runtime/runtime.js";
import { API_URL, API_KEY } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
};

export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}${id}?key=${API_KEY}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
  } catch (err) {
    console.error(err);
  }
};
