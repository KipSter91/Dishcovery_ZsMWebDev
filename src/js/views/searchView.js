class searchView {
  #parentElement = document.querySelector(".search");
  #searchField = document.querySelector(".search__field");

  #clearInput() {
    this.#searchField.value = "";
  }

  getQuery() {
    const query = this.#searchField.value;
    this.#clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
