import "regenerator-runtime/runtime.js";
import { API_URL, API_KEY } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
};

export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}${id}?key=${API_KEY}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      source: recipe.source_url,
      title: recipe.title,
    };
  } catch (err) {
    console.error(`☠️${err}☠️`);
    throw err;
  }
};

export const loadSearchResult = async (query) => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}&key=${API_KEY}`);
    // console.log(data);
    state.search.results = data.data.recipes.map((res) => {
      return {
        id: res.id,
        title: res.title,
        image: res.image_url,
        publisher: res.publisher
      };
    });

    // console.log(state);
  } catch (err) {
    console.error(`☠️${err}☠️`);
    throw err;
  }
};
