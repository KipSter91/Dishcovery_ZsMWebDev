# 🍳 DISHcovery

> Every dish tells a story. Discover your next culinary adventure.

<div align="center">
  <img src="src/img/dishcovery_logo.webp" alt="DISHcovery Logo" width="250">
  
  [![Last Updated](https://img.shields.io/badge/Last%20Updated-April%202025-blue)]()
  [![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)]()
  [![MVC](https://img.shields.io/badge/Architecture-MVC-brightgreen)]()
</div>

## 📖 Overview

Dishcovery is a modern, JavaScript-based recipe search web application that enables users to browse through thousands of recipes, view detailed preparation information, and bookmark their favorite recipes. The application features a responsive design, making it usable on both mobile and desktop devices.

## ✨ Features

- **Intuitive Search**: Fast and efficient recipe search by keywords
- **Detailed Recipe Information**:
  - List of ingredients with quantities
  - Preparation time and cooking temperature
  - Number of servings with dynamic adjustment
  - Detailed cooking instructions (link to external source)
- **Modern User Interface**:
  - Clean, minimal design with intuitive navigation
  - Responsive layout (mobile, tablet, desktop)
  - Smooth animations and interactive elements
  - Interactive welcome screen with food emoji
- **Recipe Interaction**:
  - Click on recipe images to make them sharper (removes blur effect)
  - Adjust serving sizes dynamically with real-time ingredient quantity updates
- **Bookmarking System**:
  - Save favorite recipes with one click
  - Visual indication of bookmarked recipes in search results
  - Persistent bookmarks storage using localStorage
  - Option to clear all bookmarks at once
- **Search Experience**:
  - Paginated results for easy browsing
  - Visual highlighting of selected recipe in results list
  - Comprehensive error handling with descriptive messages

## 🛠️ Technologies

- **JavaScript (ES6+)** - Main programming language of the application
- **MVC Architecture** - Well-structured, maintainable code organization
- **Parcel** - Modern module bundler for optimal performance
- **SASS/SCSS** - Advanced styling with variables and mixins
- **Forkify API** - Recipe data retrieval and processing
- **LocalStorage API** - For persistent bookmark data between sessions

## 🚀 Installation and Running

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.0.0 or newer)
- [npm](https://www.npmjs.com/) (v7.0.0 or newer)

### Installation Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd DISHcovery/App
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open in your browser:
   ```
   http://localhost:1234
   ```

### Creating a Production Build

```bash
npm run build
```

## 📝 User Guide

1. **Welcome Screen**: When launching the application, you'll be greeted with a welcome message and a food emoji.

2. **Recipe Search**:

   - Enter your search term in the search box (e.g., "pizza", "pasta", "chicken")
   - Press Enter or click the search button
   - Results appear in the left panel
   - Currently selected recipe is highlighted in the results

3. **View Recipe**:

   - Click on a search result to view details
   - The recipe appears in the right panel
   - Click on the image for better visibility (removes the blur effect)

4. **Adjust Servings**:

   - Use the + and - buttons to increase or decrease the number of servings
   - Ingredient quantities automatically update based on the new serving size

5. **Bookmarking**:

   - Click the bookmark button on a recipe to save it to your bookmarks
   - Access your saved recipes through the bookmarks panel in the navigation
   - Bookmarked recipes are visually indicated in search results
   - Your bookmarks are saved between sessions using localStorage
   - Clear all bookmarks at once with the "Clear All" option

6. **Pagination**:
   - If there are many results, use the pagination buttons to view more recipes

## 🧩 Project Structure

```
index.html               # Main HTML structure
package.json             # Project dependencies and scripts
src/
  ├── img/               # Images and icons
  │   ├── dishcovery_logo.webp
  │   ├── favicon.webp
  │   └── icons.svg
  ├── js/
  │   ├── config.js      # Configuration constants
  │   ├── controller.js  # Main controller (MVC)
  │   ├── helpers.js     # Utility functions
  │   ├── model.js       # Data model (MVC)
  │   └── views/         # View components (MVC)
  │       ├── bookmarksView.js
  │       ├── navigationView.js
  │       ├── paginationView.js
  │       ├── recipeView.js
  │       ├── resultsView.js
  │       ├── searchView.js
  │       └── View.js    # Parent view class
  └── sass/              # Styles
      ├── _base.scss
      ├── _components.scss
      ├── _header.scss
      ├── _mixins.scss
      ├── _preview.scss
      ├── _recipe.scss
      ├── _searchResults.scss
      ├── _variables.scss
      └── main.scss
```

## 🔄 API Information

The application uses the Forkify API to retrieve recipe data:

- **API base URL**: `https://forkify-api.jonas.io/api/v2/recipes/`
- **Results per page**: 10 recipes
- **API Key**: Required for some operations (automatically configured)

## 💻 Browser Compatibility

DISHcovery is compatible with all modern browsers:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## 🔮 Future Improvements

- Add user authentication to allow personal recipe creation
- Implement social sharing functionality
- Add nutrition information for recipes
- Integrate dark mode support
- Create a mobile app version

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/amazing-feature`
3. Save your changes: `git commit -m 'Add amazing feature'`
4. Push your branch: `git push origin feature/amazing-feature`
5. Submit a Pull Request

## ⚠️ Attribution

This project was built as part of [The Complete JavaScript Course](https://www.udemy.com/course/the-complete-javascript-course/) by Jonas Schmedtmann. While the code implementation was done by following the course, I have ensured that I understand all the concepts and techniques used.

As per Jonas's guidelines:

> You are allowed to use this project in your portfolio as long as you built it yourself by following the course and understand what you did.
> It is not permitted to create your own course/videos/articles based on this course's content.

---

<div align="center">
  <p>Created with ❤️ | Last Updated: April 2025</p>
</div>
