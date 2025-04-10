import icons from "url:../../img/icons.svg";
import fracty from "fracty";

class RecipeView {
  #parentElement = document.querySelector(".recipe");
  #data;
  #errorMessage = `Oops! That recipe doesn’t exist. Try a different one!`;
  #successMessage = "";

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  #generateMarkup() {
    return `
    <figure class="recipe__fig">
<img src="${this.#data.imageUrl}" alt="${
      this.#data.title
    }" class="recipe__img" />
<h1 class="recipe__title">
  <span>${this.#data.title}</span>
</h1>
</figure>

<div class="recipe__details">
<div class="recipe__info">
  <svg class="recipe__info-icon">
    <use href="${icons}#icon-clock"></use>
  </svg>
  <span class="recipe__info-data recipe__info-data--minutes">${
    this.#data.cookingTime
  }</span>
  <span class="recipe__info-text">minutes</span>
</div>
<div class="recipe__info">
  <svg class="recipe__info-icon">
    <use href="${icons}#icon-users"></use>
  </svg>
  <span class="recipe__info-data recipe__info-data--people">${
    this.#data.servings
  }</span>
  <span class="recipe__info-text">servings</span>

  <div class="recipe__info-buttons">
    <button class="btn--tiny btn--increase-servings">
      <svg>
        <use href="${icons}#icon-minus-circle"></use>
      </svg>
    </button>
    <button class="btn--tiny btn--increase-servings">
      <svg>
        <use href="${icons}#icon-plus-circle"></use>
      </svg>
    </button>
  </div>
</div>

<div class="recipe__user-buttons">
  <div class="recipe__user-generated">
    <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
  </div>
  <button class="btn--round">
    <svg class="">
      <use href="${icons}#icon-bookmark-fill"></use>
    </svg>
  </button>
</div>
</div>

<div class="recipe__ingredients">
<h2 class="heading--2">Recipe ingredients</h2>
<ul class="recipe__ingredient-list">
${this.#data.ingredients.reduce(this.#generateMarkupIngredient.bind(this), "")}
  
</ul>
</div>

<div class="recipe__directions">
<h2 class="heading--2">How to cook it</h2>
<p class="recipe__directions-text">
  This recipe was carefully designed and tested by
  <span class="recipe__publisher">${
    this.#data.publisher
  }</span>. Please check out
  directions at their websi</p>
<a
  class="btn--small recipe__btn"
  href=${this.#data.sourceUrl}
  target="_blank"
>
  <span>Directions</span>
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-right"></use>
  </svg>
</a>
</div>
    `;
  }
  #generateMarkupIngredient(acc, ingr) {
    return (
      acc +
      `<li class="recipe__ingredient">
                    <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
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
  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderLoader() {
    const markup = `
      <div class="loader">
        <span></span><span></span><span></span>
      </div>
      `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderMessage(message = this.#successMessage) {
    const markup = `
    <div class="message">
    <div>
    <svg>
    <use href="${icons}#icon-smile"></use>
    </svg>
    </div>
    <p>${message}</p>
    </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderError(message = this.#errorMessage) {
    const markup = `
    <div class="error">
    <div>
    <svg>
    <use href="${icons}#icon-alert-triangle"></use>
    </svg>
    </div>
    <p>${message}</p>
    </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  addHandleRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }
}

export default new RecipeView();
