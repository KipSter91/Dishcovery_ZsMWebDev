import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import navigationView from "./views/navigationView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";
// Remove SVG import - we'll use the helper function instead

import "core-js/actual";
import "regenerator-runtime/runtime.js";

if (module.hot) {
  module.hot.accept();
}

// UI elements to hide initially
const searchResultsEl = document.querySelector(".search-results");
const containerEl = document.querySelector(".container");
let hasInteracted = false;

// Helper function to check if device is mobile (small screen)
const isMobileDevice = function () {
  return window.innerWidth <= 600; // Using the same breakpoint as in navigationView
};

// Helper function to hide search results when only showing a recipe
const hideSearchResultsForDirectRecipe = function () {
  // If there are no search results (page was refreshed with recipe hash)
  // and we have a recipe ID, hide the search results panel
  if (model.state.search.results.length === 0 && window.location.hash) {
    searchResultsEl.classList.add("hidden");
    containerEl.classList.add("recipe-only");
  } else {
    searchResultsEl.classList.remove("hidden");
    containerEl.classList.remove("recipe-only");
  }
};

// Helper function to scroll to recipe div smoothly
const scrollToRecipe = function () {
  if (isMobileDevice()) {
    const recipeElement = document.querySelector(".recipe");
    const headerElement = document.querySelector(".header");

    if (recipeElement && headerElement) {
      // Get header height including padding
      const headerHeight = headerElement.offsetHeight;

      // Use window.scrollTo for more precise control over scroll position
      window.scrollTo({
        // Calculate the position where the recipe should be positioned right below the header
        top: recipeElement.offsetTop - headerHeight,
        behavior: "smooth",
      });
    }
  }
};

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

    // Scroll to recipe on mobile devices
    scrollToRecipe();

    // Hide search results if directly showing a recipe
    hideSearchResultsForDirectRecipe();
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

// UNIFIED BOOKMARK UPDATE FUNCTION
const updateAllBookmarkViews = function () {
  // 1) Update recipe view if a recipe is loaded
  if (model.state.recipe.id) {
    recipeView.update(model.state.recipe);
  }

  // 2) Update search results to reflect bookmark changes
  if (model.state.search.results.length > 0) {
    resultsView.render(model.getSearchResultsPage());
  }

  // 3) Update bookmarks view
  bookmarksView.render(model.state.bookmarks);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark based on current state
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // 2) Update all views to show current bookmark state
  updateAllBookmarkViews();
};

const controlSearchResultBookmark = function (id) {
  // Find the recipe in search results
  const recipe = model.state.search.results.find((res) => res.id === id);

  if (!recipe) return;

  // Toggle bookmark status
  if (!recipe.bookmarked) {
    // Need to load full recipe data first if not already loaded
    if (model.state.recipe.id !== id) {
      // Create a minimal recipe object with the data we have
      const minimalRecipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image,
        bookmarked: true,
      };
      model.addBookmark(minimalRecipe);
    } else {
      // If current recipe, use full data
      model.addBookmark(model.state.recipe);
    }
  } else {
    model.deleteBookmark(id);
  }

  // Update all views to show current bookmark state
  updateAllBookmarkViews();
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlClearBookmarks = function () {
  // Clear all bookmarks
  model.clearBookmarks();

  // Update all views to show cleared bookmark state
  updateAllBookmarkViews();
};

const controlSearchResults = async function () {
  // Show search results container once a search is performed
  if (searchResultsEl.classList.contains("hidden-initially")) {
    searchResultsEl.classList.remove("hidden-initially");
    // Remove initial state from container
    containerEl.classList.remove("initial-state");
  }

  // Make sure search results are visible (in case they were hidden for direct recipe view)
  searchResultsEl.classList.remove("hidden");
  containerEl.classList.remove("recipe-only");

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

  // Create fun, emoji-based welcome screen with animations
  const recipeContainer = document.querySelector(".recipe");
  recipeContainer.innerHTML = `
    <div class="welcome">
      <div class="welcome__hero">
        <div class="welcome__emoji-background">
          <span class="welcome__floating-emoji" style="--delay: 0s; --duration: 25s; --position: 15%;">🍕</span>
          <span class="welcome__floating-emoji" style="--delay: 5s; --duration: 30s; --position: 25%;">🥗</span>
          <span class="welcome__floating-emoji" style="--delay: 8s; --duration: 22s; --position: 60%;">🍔</span>
          <span class="welcome__floating-emoji" style="--delay: 12s; --duration: 28s; --position: 70%;">🍜</span>
          <span class="welcome__floating-emoji" style="--delay: 18s; --duration: 23s; --position: 85%;">🍰</span>
          <span class="welcome__floating-emoji" style="--delay: 7s; --duration: 26s; --position: 35%;">🌮</span>
          <span class="welcome__floating-emoji" style="--delay: 14s; --duration: 24s; --position: 50%;">🍣</span>
          <span class="welcome__floating-emoji welcome__floating-emoji--reverse" style="--delay: 4s; --duration: 32s; --position: 10%;">🥪</span>
          <span class="welcome__floating-emoji welcome__floating-emoji--reverse" style="--delay: 10s; --duration: 28s; --position: 40%;">🍝</span>
          <span class="welcome__floating-emoji welcome__floating-emoji--reverse" style="--delay: 16s; --duration: 36s; --position: 75%;">🍲</span>
          <span class="welcome__floating-emoji welcome__floating-emoji--reverse" style="--delay: 2s; --duration: 26s; --position: 90%;">🥐</span>
        </div>
        
        <div class="welcome__content-wrapper">
          <h1 class="welcome__title">Find Your <span class="welcome__highlight">Perfect</span> Recipe</h1>
          <div class="welcome__emoji-row">
            <div class="welcome__emoji-spotlight">
              <span class="welcome__spotlight-emoji">🍳</span>
            </div>
          </div>
          <p class="welcome__subtitle">Your culinary adventure starts with a simple search</p>
          
          <div class="welcome__search-hint">
            <div class="welcome__arrow-container">
              <div class="welcome__arrow">⬆️</div>
            </div>
            <p>Start typing above to discover delicious dishes</p>
          </div>
        </div>
      </div>
      
      <div class="welcome__cards">
        <div class="welcome__card welcome__card--categories">
          <div class="welcome__card-header">
            <span class="welcome__card-emoji">🔍</span>
            <h2>Popular Searches</h2>
          </div>
          <div class="welcome__tags">
            <button class="welcome__tag" data-search="pizza">🍕 Pizza</button>
            <button class="welcome__tag" data-search="pasta">🍝 Pasta</button>
            <button class="welcome__tag" data-search="chicken">🍗 Chicken</button>
            <button class="welcome__tag" data-search="vegetarian">🥦 Vegetarian</button>
            <button class="welcome__tag" data-search="dessert">🍰 Dessert</button>
            <button class="welcome__tag" data-search="burger">🍔 Burger</button>
          </div>
        </div>
        
        <div class="welcome__features-container">
          <div class="welcome__card welcome__card--feature">
            <div class="welcome__card-header">
              <span class="welcome__card-emoji">🔎</span>
              <h3>Search</h3>
            </div>
            <p>Find the perfect recipe by ingredient or dish name</p>
          </div>
          
          <div class="welcome__card welcome__card--feature">
            <div class="welcome__card-header">
              <span class="welcome__card-emoji">⭐</span>
              <h3>Save</h3>
            </div>
            <p>Bookmark your favorites for quick access later</p>
          </div>
          
          <div class="welcome__card welcome__card--feature">
            <div class="welcome__card-header">
              <span class="welcome__card-emoji">🍽️</span>
              <h3>Adjust</h3>
            </div>
            <p>Modify serving sizes with real-time ingredient updates</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add event listeners for popular search tags
  const searchTags = document.querySelectorAll(".welcome__tag");
  searchTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      const searchQuery = this.dataset.search;
      document.querySelector(".search__field").value = searchQuery;
      searchView.getQuery = function () {
        return searchQuery;
      };
      controlSearchResults();
    });
  });
};

// Helper function to return to the welcome page
const returnToWelcome = function () {
  // Clear the URL hash to return to root URL
  history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search
  );

  // Reset hasInteracted state
  hasInteracted = false;

  // Reset search field if there's any text
  document.querySelector(".search__field").value = "";

  // Reset the model's search results
  model.state.search.results = [];

  // Set up the welcome UI
  setupInitialUI();

  // Render empty bookmarks view to maintain consistency
  bookmarksView.render(model.state.bookmarks);
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
  resultsView.addHandlerBookmark(controlSearchResultBookmark);
  bookmarksView.addHandlerDeleteAll(controlClearBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);

  // Add click event listener to the logo to return to welcome page
  document
    .querySelector(".header__logo")
    .addEventListener("click", returnToWelcome);
  document.querySelector(".header__logo").style.cursor = "pointer"; // Change cursor to pointer on hover
};

init();
