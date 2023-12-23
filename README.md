# TheMoviePlace

## Overview

TheMoviePlace is an advanced web application designed with a mobile-first approach and responsive design. The project leverages several sophisticated features to provide users with a seamless and feature-rich experience for exploring and interacting with movie data.

![Hero](https://github.com/jsurrea/TheMoviePlace/assets/68788933/5e03c473-6714-43c4-8f2b-3c7b006abec1)

## Features

### 1. Infinite Scroll

TheMoviePlace implements an Infinite Scroll mechanism, allowing users to seamlessly load additional content as they scroll down the page. A singleton Intersection Observer efficiently handles the scroll behavior, providing a fluid browsing experience. (Take a look at the scroll bar!)

https://github.com/jsurrea/TheMoviePlace/assets/68788933/56d75725-d653-4cf4-9fbf-dad886754b1b

### 2. Lazy Loading with Intersection Observer

Lazy loading is employed using the Intersection Observer API to load images only when they enter the user's viewport. This optimization enhances performance by reducing initial page load times. In the following clip, notice the moment at which each image is loaded:

https://github.com/jsurrea/TheMoviePlace/assets/68788933/99c6ff49-fd08-4912-be07-6a2888a2eaac

### 3. Local Storage for Favorites

User preferences, specifically favorite movies, are stored locally using the browser's localStorage. This feature ensures that users can maintain their list of favorite movies even when revisiting the application or refreshing the page.

https://github.com/jsurrea/TheMoviePlace/assets/68788933/6b7b0969-9a86-4976-b058-2a0847c34d1e

### 4. Axios for API Interaction

TheMoviePlace utilizes the Axios library to make HTTP requests to TheMovieDB API. Axios simplifies asynchronous request handling, providing a clean and efficient way to communicate with the external API. This integration allows TheMoviePlace to have the latest information available for the user automatically.

### 5. Hash Routing with Query Parameters

Hash routing is implemented for seamless navigation within the single-page application (SPA). Hash fragments in the URL are used to switch between different views, such as trending movies, search results, movie details, and category-specific movie lists. Query parameters facilitate specific actions, such as movie searches. Take a look to the address bar in the following demonstration:

https://github.com/jsurrea/TheMoviePlace/assets/68788933/9f2dabb0-dfc9-4397-a72e-027e4651d22b

### 6. Internationalization

The application supports internationalization by providing a language switcher. Users can choose from different language options, and the content dynamically updates to match the selected language. Language preferences are stored locally for a personalized experience.

https://github.com/jsurrea/TheMoviePlace/assets/68788933/f0bd3c0a-eba2-4ff3-9302-abcc75c3d3a1

### 7. Loading Skeletons

Loading skeletons are incorporated to enhance the user experience during data retrieval. These placeholders mimic the structure of the content being loaded, providing users with visual feedback on progress and responsiveness.

https://github.com/jsurrea/TheMoviePlace/assets/68788933/650821b3-2753-4b2d-98c8-bdf565b79362

### 8. Defaults for Missing Values

The application gracefully handles missing values, such as unavailable movie posters. Default covers and text are displayed, ensuring a polished and informative user interface.

### 9. Mobile-First, Responsive Design

TheMoviePlace follows a mobile-first design philosophy, ensuring accessibility and visual appeal across various devices. The responsive design guarantees a consistent and user-friendly experience on desktops, tablets, and smartphones.

### 10. High Performance

This web application was evaluated using Lighthouse, ensuring that it delivers a seamless performance experience to its users.

![Lighthouse](https://github.com/jsurrea/TheMoviePlace/assets/68788933/6413c73c-119e-41f5-916f-ec935b1524fb)

## Getting Started

To run TheMoviePlace locally, follow these steps:

1. Clone the repository
2. Open the project directory: `cd TheMoviePlace`
3. Launch a local development server (e.g., using VS Code's Live Server extension).
4. Access the application in your web browser at `http://localhost:<port>`

## Dependencies

- Axios: [https://github.com/axios/axios](https://github.com/axios/axios)

## Acknowledgments

- TheMovieDB API: [https://www.themoviedb.org/documentation/api](https://www.themoviedb.org/documentation/api)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. Feel free to use it as a starting point for implementing these features yourself!
