# 🍳 DISHcovery

> Every dish tells a story.

![DISHcovery Logo](src/img/dishcovery_logo.webp)

## 📖 Overview

DISHcovery is a modern, JavaScript-based recipe search web application that enables users to browse through thousands of recipes, view detailed preparation information, and bookmark their favorite recipes. The application features a responsive design, making it usable on both mobile and desktop devices.

## ✨ Features

- **Intuitive Search**: Fast and efficient recipe search by keywords
- **Detailed Recipe Information**:
  - List of ingredients
  - Preparation time
  - Number of servings
  - Detailed cooking instructions (link to external source)
- **Modern User Interface**:
  - Clean, minimal design
  - Responsive layout (mobile, tablet, desktop)
  - Animations and interactive elements
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
  - Error handling with descriptive messages

## 🛠️ Technologies

- **JavaScript (ES6+)** - Main programming language of the application
- **MVC Architecture** - Well-structured, maintainable code
- **Parcel** - Modern module bundler
- **SASS/SCSS** - Advanced styling
- **Forkify API** - Recipe data retrieval
- **LocalStorage API** - For persistent bookmark data

## 🚀 Installation and Running

### Prerequisites

- [Node.js](https://nodejs.org/) (v12.0.0 or newer)
- [npm](https://www.npmjs.com/) (v6.0.0 or newer)

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
index.html
package.json
src/
    img/               # Images and icons
    js/
        config.js      # Configuration constants
        controller.js  # Main controller
        helpers.js     # Helper functions
        model.js       # Data model
        views/         # View handlers
    sass/              # Styles
```

## 🔄 API Information

The application uses the Forkify API to retrieve recipe data:

- **API base URL**: `https://forkify-api.jonas.io/api/v2/recipes/`
- **Results per page**: 10 recipes

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

Created with ❤️ as part of The Complete JavaScript Course 2025
