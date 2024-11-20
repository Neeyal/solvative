
# Search Places Application

This is a simple web-based application to search for places using the GeoDB Cities API. The app allows users to search for cities by name and displays the results in a table. It also supports pagination and keyboard shortcuts to improve usability.

## Features:
- Search cities by name.
- Show results with pagination (next/previous).
- Use **CTRL/CMD + /** to focus the search input box.
- Display city details (e.g., name, country, flag).
- Customizable search result limit (between 1 and 10).

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
3. [Run the Application](#run-the-application)
4. [API Configuration](#api-configuration)
5. [License](#license)

## Prerequisites

Before you begin, ensure that you have the following installed:

- A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
- Text editor (e.g., VSCode, Sublime Text).
- A web server (optional, if you want to deploy on localhost).

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/search-places-app.git
   cd search-places-app
   ```

2. **Install dependencies** (If using Node.js or a build tool like Webpack or Parcel, you can configure it here):

   For this application, you only need a browser, so no installation of dependencies is required.

3. **Create a `config.js` file**:
   
   Create a `config.js` file in the root directory of the project to store your API configuration.

   Example `config.js`:
   
   ```javascript
   const CONFIG = {
     API_URL: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',  // API endpoint URL
     API_KEY: 'your-rapidapi-key',  // Replace with your API key
     API_HOST: 'wft-geo-db.p.rapidapi.com',  // API host URL
   }
   ```

   Replace `'your-rapidapi-key'` with your actual API key from [RapidAPI](https://rapidapi.com/).

4. **Include API Key in `config.js`:**

   The application uses the **GeoDB Cities API** to fetch city data. You need to sign up for a RapidAPI account and obtain an API key to use this API.

   Visit the [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities) page on RapidAPI to get your key.

## Run the Application

1. Open the `index.html` file directly in your browser (or serve it through any web server of your choice).

   ```bash
   open index.html  # On macOS
   start index.html  # On Windows
   ```

2. **Usage:**

   - Enter a place name in the search box to start searching for cities.
   - Press **Enter** to see the results in the table.
   - Use the **CTRL/CMD + /** keyboard shortcut to focus the search box.
   - The results will be paginated with "Next" and "Previous" buttons.

   For instance, typing `d` will display all cities starting with the letter `d` and allow you to navigate through results.

## API Configuration

This application fetches data from the GeoDB Cities API, which requires an API key. You will need to sign up for a RapidAPI account and obtain your API key.

- **API URL:** `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`
- **API Key:** [Sign up on RapidAPI](https://rapidapi.com/)
- **API Host:** `wft-geo-db.p.rapidapi.com`
