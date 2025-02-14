# Staff Directory

## Overview

The Staff Directory is a web application that allows users to search for and view detailed profiles of staff members. It utilizes the Random User Generator API to fetch user data and presents it in a user-friendly and visually appealing interface. The application is built using HTML, CSS, and JavaScript, with Bootstrap for responsive styling.

## Key Features

*   **User Search**: Implements a live search feature to filter users by their first or last name.
*   **Detailed Profiles**: Displays user profiles with detailed information, including a dynamically fetched bio.
*   **Dark Mode**: Supports a smooth dark/light mode with refined color palettes, enhancing the user experience in different lighting conditions.
*   **Favourites**: Allows users to mark staff members as favorites, with a dedicated page to view all favorites.
*   **Responsive Design**: Ensures the application is accessible and visually appealing on various devices.
*   **Infinite Scrolling**: Implements infinite scrolling to load more users as the user scrolls down the page.
*   **Accessibility**: Includes ARIA labels for improved accessibility.
*   **Back to Top Button**: Provides a button to quickly navigate back to the top of the page.

## Project Structure
```
staff-directory
├── index.html          # Main entry point for the application
├── profile.html        # Displays detailed user profiles
├── css
│   └── styles.css      # Custom styles for the application
├── js
│   ├── main.js         # Fetches and caches user data, handles search functionality
│   ├── userCard.js     # Generates Bootstrap card components for users
│   └── profile.js      # Loads user profiles based on userID from the URL
└── README.md           # Documentation for the project
```

## Setup Instructions
1. Clone the repository to your local machine.
2. Open `index.html` in a web browser to view the application.
3. Ensure you have an internet connection to fetch user data from the API.

## Usage
- Use the search bar at the top of the main page to filter users by their first or last name.
- Click on the "View Profile" button on any user card to navigate to their detailed profile page.

## Contributing
Feel free to submit issues or pull requests to improve the application.
