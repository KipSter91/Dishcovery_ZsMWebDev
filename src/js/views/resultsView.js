import View from "./View";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = `No results found for your query. Please try again with a different keyword.`;
  _successMessage = "";

  _generateMarkup() {
    return this._data.reduce(this._generateMarkupPreview.bind(this), "");
  }

  _generateMarkupPreview(acc, pre) {
    const id = window.location.hash.slice(1);
    // Get SVG path from parent class helper method
    const iconPath = this._getSvgPath();

    return (
      acc +
      `<li class="preview ${pre.bookmarked ? "preview--bookmarked" : ""}">
        <a class="preview__link ${
          pre.id === id ? "preview__link--active" : ""
        }" href="#${pre.id}">
          <figure class="preview__fig">
            <img src=${pre.image} alt="Image of ${pre.title}"/>
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${pre.title}</h4>
            <p class="preview__publisher">${pre.publisher}</p>
          </div>
          <button class="preview__bookmark-btn">
            <svg>
              <use href="${iconPath}#icon-bookmark${
        pre.bookmarked ? "-fill" : ""
      }"></use>
            </svg>
          </button>
        </a>
      </li>`
    );
  }

  // Add handler for bookmark buttons in search results
  addHandlerBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".preview__bookmark-btn");
      if (!btn) return;
      e.preventDefault(); // Prevent navigation when clicking the bookmark button

      // Get the recipe id from the parent preview element
      const previewEl = btn.closest(".preview");
      const id = previewEl
        .querySelector(".preview__link")
        .getAttribute("href")
        .slice(1);

      handler(id);
    });
  }
}

export default new ResultsView();
