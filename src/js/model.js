import "regenerator-runtime/runtime.js";
import { API_URL, RESULTS_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}${id}`);
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

    // Check if recipe is already bookmarked
    if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    console.error(`☠️${err}☠️`);
    throw err;
  }
};

export const updateServings = function (newServings) {
  // Don't allow negative or zero servings
  if (newServings <= 0) return;

  // Update ingredient quantities based on new serving size
  state.recipe.ingredients.forEach((ing) => {
    if (ing.quantity) {
      // newQt = oldQt * newServings / oldServings
      ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    }
  });

  // Update the servings in state
  state.recipe.servings = newServings;
};

export const loadSearchResult = async (query) => {
  try {
    state.search.query = query;
    // Reset page to 1 for new search queries
    state.search.page = 1;

    const data = await getJSON(`${API_URL}?search=${query}`);
    // console.log(data);
    state.search.results = data.data.recipes.map((res) => {
      return {
        id: res.id,
        title: res.title,
        image: res.image_url,
        publisher: res.publisher,
        bookmarked: state.bookmarks.some((bookmark) => bookmark.id === res.id),
      };
    });

    // console.log(state);
  } catch (err) {
    console.error(`☠️${err}☠️`);
    throw err;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

// Bookmark management functions
export const addBookmark = function (recipe) {
  // Add bookmark to state
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  // Also mark in search results if present
  if (state.search.results.length > 0) {
    const recipeInResults = state.search.results.find(
      (res) => res.id === recipe.id
    );
    if (recipeInResults) recipeInResults.bookmarked = true;
  }

  // Save to localStorage
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // Find index of bookmark with this id
  const index = state.bookmarks.findIndex((bookmark) => bookmark.id === id);
  if (index === -1) return;

  // Remove from bookmarks array
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }

  // Also update in search results if present
  if (state.search.results.length > 0) {
    const recipeInResults = state.search.results.find((res) => res.id === id);
    if (recipeInResults) recipeInResults.bookmarked = false;
  }

  // Save to localStorage
  persistBookmarks();
};

export const clearBookmarks = function () {
  // Remove all bookmarks
  state.bookmarks = [];

  // Update current recipe if loaded
  if (state.recipe.id) {
    state.recipe.bookmarked = false;
  }

  // Update search results
  if (state.search.results.length > 0) {
    state.search.results.forEach((res) => {
      res.bookmarked = false;
    });
  }

  // Save empty array to localStorage
  persistBookmarks();
};

// Save bookmarks to localStorage
const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

// Initialize bookmarks from localStorage
const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
