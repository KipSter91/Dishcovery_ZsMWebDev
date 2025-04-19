import View from "./View";
import fracty from "fracty";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = `Oops! That recipe doesn’t exist. Try a different one!`;
  _successMessage = "";

  _generateMarkup() {
    // Get SVG path from parent class helper method
    const iconPath = this._getSvgPath();

    return `
    <figure class="recipe__fig">
<img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
<h1 class="recipe__title">
  <span>${this._data.title}</span>
</h1>
</figure>

<div class="recipe__details">
<div class="recipe__info">
  <svg class="recipe__info-icon">
    <use href="${iconPath}#icon-clock"></use>
  </svg>
  <span class="recipe__info-data recipe__info-data--minutes">${
    this._data.cookingTime
  }</span>
  <span class="recipe__info-text">minutes</span>
</div>
<div class="recipe__info">
  <svg class="recipe__info-icon">
    <use href="${iconPath}#icon-users"></use>
  </svg>
  <span class="recipe__info-data recipe__info-data--people">${
    this._data.servings
  }</span>
  <span class="recipe__info-text">servings</span>

  <div class="recipe__info-buttons">
    <button class="btn--tiny btn--decrease-servings" data-update-to="${
      this._data.servings - 1
    }">
      <svg>
        <use href="${iconPath}#icon-minus-circle"></use>
      </svg>
    </button>
    <button class="btn--tiny btn--increase-servings" data-update-to="${
      this._data.servings + 1
    }">
      <svg>
        <use href="${iconPath}#icon-plus-circle"></use>
      </svg>
    </button>
  </div>
</div>

<div class="recipe__user-buttons">
  <button class="btn--round btn--bookmark">
    <svg class="">
      <use href="${iconPath}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
    </svg>
  </button>
</div>
</div>

<div class="recipe__ingredients">
<h2 class="heading--2">Recipe ingredients</h2>
<ul class="recipe__ingredient-list">
${this._data.ingredients.reduce(this._generateMarkupIngredient.bind(this), "")}
  
</ul>
</div>

<div class="recipe__directions">
<h2 class="heading--2">How to cook it</h2>
<p class="recipe__directions-text">
  This recipe was carefully designed and tested by
  <span class="recipe__publisher">${
    this._data.publisher
  }</span>. Please check out
  directions at their website.</p>
<a
  class="btn--small recipe__btn"
  href=${this._data.source}
  target="_blank"
>
  <span>Directions</span>
  <svg class="search__icon">
    <use href="${iconPath}#icon-arrow-right"></use>
  </svg>
</a>
</div>
    `;
  }
  _generateMarkupIngredient(acc, ingr) {
    // Get SVG path from parent class helper method
    const iconPath = this._getSvgPath();

    return (
      acc +
      `<li class="recipe__ingredient">
                    <svg class="recipe__icon">
                    <use href="${iconPath}#icon-check"></use>
                    </svg>
                      <div class="recipe__quantity">${
                        ingr.quantity ? fracty(ingr.quantity) : ""
                      }</div>
                      <div class="recipe__description">
                        <span class="recipe__unit">${ingr.unit}</span>
                        ${ingr.description}
                      </div>
                  </li>`
    );
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(
        ".btn--increase-servings, .btn--decrease-servings"
      );
      if (!btn) return;

      // Get the new servings from data attribute
      const updateTo = +btn.dataset.updateTo;
      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }

  // Add function to handle image blur toggling
  addHandlerImageBlur() {
    // This is set up after content is rendered
    this._parentElement.addEventListener("click", (e) => {
      const img = e.target.closest(".recipe__img");

      // If the click was on the image
      if (img) {
        // Toggle the no-blur class
        img.classList.toggle("no-blur");
        e.stopPropagation(); // Prevent triggering document listener immediately
      }
    });

    // Add event listener to document to remove no-blur class when clicking elsewhere
    document.addEventListener("click", (e) => {
      const img = this._parentElement.querySelector(".recipe__img");
      const clickedOutsideApp =
        !e.target.closest(".recipe") &&
        !e.target.closest(".search-results") &&
        !e.target.closest(".header");

      // Don't do anything if we don't have an image or clicked within the app components
      if (!img || clickedOutsideApp) return;

      // Remove the no-blur class when clicking elsewhere in the app
      // Only if the image has the no-blur class
      if (img.classList.contains("no-blur")) {
        img.classList.remove("no-blur");
      }
    });
  }
}

export default new RecipeView();
