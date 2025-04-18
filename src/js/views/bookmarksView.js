import View from "./View";
import icons from "url:../../img/icons.svg";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = `No bookmarks yet. Find a recipe you love and bookmark it!`;
  _successMessage = "";

  // Add handler for the "Delete All" button click
  addHandlerDeleteAll(handler) {
    // Using event delegation with document to ensure it works even after re-rendering
    document.querySelector(".nav").addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--delete-all");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return this._data.length
      ? this._data.reduce(this._generateMarkupPreview.bind(this), "") +
          `<div class="bookmarks__delete-all">
          <button class="btn btn--small btn--delete-all">Delete All Bookmarks</button>
        </div>`
      : `<div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>
            You haven't saved any favorites yet! Find something tasty
            and bookmark it for later.
          </p>
        </div>`;
  }

  _generateMarkupPreview(acc, pre) {
    const id = window.location.hash.slice(1);

    return (
      acc +
      `<li class="preview">
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
        </a>
      </li>`
    );
  }
}

export default new BookmarksView();
