class NavigationView {
  #hamburgerBtn = document.querySelector(".hamburger");
  #nav = document.querySelector(".nav");
  #navOverlay = document.querySelector(".nav-overlay");
  #bookmarksBtn = document.querySelector(".nav__btn--bookmarks");
  #header = document.querySelector(".header");

  constructor() {
    this._addHandlerMobileMenu();
    this._addHandlerCloseOnClick();
    this._addHandlerBookmarksOnMobile();
  }

  /**
   * Toggle the mobile menu when hamburger is clicked
   * @private
   */
  _addHandlerMobileMenu() {
    this.#hamburgerBtn.addEventListener("click", () => {
      this.#nav.classList.toggle("nav-open");
      this.#navOverlay.classList.toggle("active");
      this.#hamburgerBtn.classList.toggle("active");
      document.body.classList.toggle("nav-open"); // Prevent scrolling when menu is open
    });

    // Close menu when overlay is clicked
    this.#navOverlay.addEventListener("click", () => {
      this.#nav.classList.remove("nav-open");
      this.#navOverlay.classList.remove("active");
      this.#hamburgerBtn.classList.remove("active");
      document.body.classList.remove("nav-open");

      // Also hide any visible bookmarks dropdown
      document
        .querySelector(".bookmarks")
        .classList.remove("bookmarks-visible");
    });
  }

  /**
   * Close mobile menu when a navigation item is clicked
   * @private
   */
  _addHandlerCloseOnClick() {
    this.#nav.addEventListener("click", (e) => {
      const navBtn = e.target.closest(".nav__btn");
      if (!navBtn || navBtn.classList.contains("nav__btn--bookmarks")) return;

      if (window.innerWidth <= 600) {
        // $bp-small = 600px
        this.#nav.classList.remove("nav-open");
        this.#navOverlay.classList.remove("active");
        this.#hamburgerBtn.classList.remove("active");
        document.body.classList.remove("nav-open");
      }
    });
  }

  /**
   * Handle bookmarks dropdown behavior on mobile
   * Make bookmarks menu work with touch on mobile
   * @private
   */
  _addHandlerBookmarksOnMobile() {
    const bookmarksDropdown = document.querySelector(".bookmarks");

    this.#bookmarksBtn.addEventListener("click", function (e) {
      // For mobile, toggle visibility on click rather than hover
      if (window.innerWidth <= 600) {
        // $bp-small = 600px
        e.preventDefault();
        e.stopPropagation();

        bookmarksDropdown.classList.toggle("bookmarks-visible");
      }
    });

    // Close bookmarks dropdown when clicking elsewhere in the nav
    this.#nav.addEventListener("click", function (e) {
      if (
        window.innerWidth <= 600 &&
        !e.target.closest(".nav__btn--bookmarks") &&
        !e.target.closest(".bookmarks") &&
        bookmarksDropdown.classList.contains("bookmarks-visible")
      ) {
        bookmarksDropdown.classList.remove("bookmarks-visible");
      }
    });
  }
}

export default new NavigationView();
