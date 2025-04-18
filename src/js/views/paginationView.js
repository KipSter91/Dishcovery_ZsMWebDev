import View from "./View";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);

    //Page 1 , and there are more pages
    if (currPage === 1 && numPages > 1) {
      return `
        <div class="pagination__placeholder"></div>
        ${this._createNextButton(currPage)}
      `;
    }

    //Last page
    if (currPage === numPages && numPages > 1) {
      return `
        ${this._createPrevButton(currPage)}
        <div class="pagination__placeholder"></div>
      `;
    }

    //Other Page
    if (currPage < numPages) {
      return `
      ${this._createPrevButton(currPage)}
      ${this._createNextButton(currPage)}
      `;
    }
    return "";
  }

  _createPrevButton(page) {
    return `
      <button data-goto="${
        page - 1
      }" class="btn--inline pagination__btn--prev pagination__btn">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${page - 1}</span>
      </button>
    `;
  }

  _createNextButton(page) {
    return `
      <button data-goto="${
        page + 1
      }" class="btn--inline pagination__btn--next pagination__btn">
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
      // console.log(goToPage);
    });
  }
}

export default new PaginationView();
