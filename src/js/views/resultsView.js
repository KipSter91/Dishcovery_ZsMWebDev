import View from "./View";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = `No results found for your query. Please try again with a different keyword.`;
  _successMessage = "";

  _generateMarkup() {
    return this._data.reduce(this._generateMarkupPreview.bind(this), "");
  }
  _generateMarkupPreview(acc, pre) {
    const id = window.location.hash.slice(1);

    return (
      acc +
      `<li class="preview ${pre.bookmarked ? "preview--bookmarked" : ""}">
        <a class="preview__link ${
          pre.id === id ? "preview__link--active" : ""
        }" href="#${pre.id}">
          <figure class="preview__fig">
            <img src=${pre.image} alt="Image of ${pre.title}"/>
            ${
              pre.bookmarked
                ? `<div class="preview__bookmark-indicator">
                <svg>
                  <use href="${icons}#icon-bookmark"></use>
                </svg>
              </div>`
                : ""
            }
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${pre.title}</h4>
            <p class="preview__publisher">${pre.publisher}</p>
          </div>
        </a>
      </li>`
    );
  }
}

export default new ResultsView();
