class NavigationView {
  _hamburgerBtn = document.querySelector(".hamburger");
  _nav = document.querySelector(".nav");
  _navOverlay = document.querySelector(".nav-overlay");
  _bookmarksBtn = document.querySelector(".nav__btn--bookmarks");

  _addHandlerMobileMenu() {
    this._hamburgerBtn.addEventListener("click", () => {
      this._nav.classList.toggle("nav-open");
      this._navOverlay.classList.toggle("active");
      this._hamburgerBtn.classList.toggle("active");
      document.body.classList.toggle("nav-open");
    });

    // Close menu when overlay is clicked
    this._navOverlay.addEventListener("click", () => {
      this._nav.classList.remove("nav-open");
      this._navOverlay.classList.remove("active");
      this._hamburgerBtn.classList.remove("active");
      document.body.classList.remove("nav-open");

      // Also hide any visible bookmarks dropdown
      document
        .querySelector(".bookmarks")
        .classList.remove("bookmarks-visible");
    });
  }

  _addHandlerCloseOnClick() {
    this._nav.addEventListener("click", (e) => {
      const navBtn = e.target.closest(".nav__btn");
      if (!navBtn) return;

      if (window.innerWidth <= 600) {
        this._nav.classList.remove("nav-open");
        this._navOverlay.classList.remove("active");
        this._hamburgerBtn.classList.remove("active");
        document.body.classList.remove("nav-open");
      }
    });
  }

  _addHandlerBookmarksOnMobile() {
    const bookmarksDropdown = document.querySelector(".bookmarks");

    this._bookmarksBtn.addEventListener("click", function (e) {
      // For mobile, toggle visibility on click rather than hover
      if (window.innerWidth <= 600) {
        e.preventDefault();
        e.stopPropagation();

        bookmarksDropdown.classList.toggle("bookmarks-visible");
      }
    });

    // Close bookmarks dropdown when clicking elsewhere in the nav
    this._nav.addEventListener("click", function (e) {
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

  init() {
    this._addHandlerMobileMenu();
    this._addHandlerCloseOnClick();
    this._addHandlerBookmarksOnMobile();
  }
}

export default new NavigationView();
