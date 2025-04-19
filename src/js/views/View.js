import { getIconsPath } from "../helpers";

export default class View {
  _data;

  // Hardcoded SVG path that will work in both dev and production
  _getSvgPath() {
    // This works in both dev and production because Parcel correctly handles the path
    return "icons.svg";
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Create a virtual DOM to compare with current DOM
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    // Compare and update changed elements
    newElements.forEach((newEl, i) => {
      // Check if current element exists at this index
      if (i >= curElements.length) return;

      const curEl = curElements[i];

      // Skip if elements don't match in terms of nodeName/type
      if (newEl.nodeName !== curEl.nodeName) return;

      // Update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue?.trim() !== "" &&
        newEl.firstChild?.nodeType === Node.TEXT_NODE
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) => {
          // Only update attributes that actually changed
          if (curEl.getAttribute(attr.name) !== attr.value) {
            curEl.setAttribute(attr.name, attr.value);
          }
        });
      }
    });
  }

  renderLoader() {
    const markup = `
      <div class="loader">
        <span></span><span></span><span></span>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderMessage(message = this._successMessage) {
    const markup = `
    <div class="message">
    <div>
    <svg>
    <use href="${this._getSvgPath()}#icon-smile"></use>
    </svg>
    </div>
    <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
    <div>
    <svg>
    <use href="${this._getSvgPath()}#icon-alert-triangle"></use>
    </svg>
    </div>
    <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
