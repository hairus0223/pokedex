# Pokedox

Pokedox is an Angular application built with Ionic, Tailwind CSS, and Capacitor that allows Pokémon trainers to browse, view details, and favourite Pokémon. The application provides an infinite scrolling experience and allows filtering Pokémon by type (e.g., Water, Grass, Fire, Ghost, Flying).

## Features

- Pokémon trainers can browse Pokémon in an infinite scrolling method to view all Pokémon without interruption.
- Pokémon trainers can view detailed information about each Pokémon.
- Pokémon trainers can view images of each Pokémon.
- Pokémon trainers can favourite certain Pokémon and view the list of favoured Pokémon.
- Pokémon trainers can filter Pokémon based on their types (e.g., Water, Grass, Fire, Ghost, Flying).

## Setup Instructions

To set up the Pokedox project on your local machine, follow these steps:

1. **Clone the repository:**

```bash
git clone git@github.com:hairus0223/pokedex.git
```

2. **Navigate to the project folder:**

```bash
cd pokedex
```

3. **Install dependencies: Ensure you have Angular CLI installed and then run::**

```bash
yarn install
# or
npm install
```

4. **Run the application: Start the Angular development server:**

```bash
ng serve
```

This will start the application on http://localhost:4200. Open the URL in your browser.

## Third-Party Libraries

The following third-party libraries and tools are used in this project:

- **Angular**: The core framework used to build the application.
  Version: 19 or higher
- **Ionic**: A popular framework for building cross-platform mobile applications.
- **tailwindcss**: A utility-first CSS framework for styling. Used for layout styling, form controls, and UI components.
- **Capacitor**: A cross-platform native runtime for building web applications into mobile apps.
- **RxJS**: A library for reactive programming used for handling asynchronous data streams.
- **TypeScript**: The language used for development, ensuring type safety and better maintainability.

## API Endpoints

1. **Get Pokémon List:**
   Fetches a list of Pokémon with pagination support (using offset and limit).

- **URL:** https://pokeapi.co/api/v2/pokemon?offset={offset}&limit={limit}
- **Method:** GET
- **Parameters:**
- - offset: The number of Pokémon to skip before starting to fetch (default: 0).
- - limit: The maximum number of Pokémon to return per request (default: 20).
- **Response:** A list of Pokémon with basic information (name, URL to images, etc.).

2. **Get Pokémon Details:**
   Fetches detailed information about a specific Pokémon, including its stats, abilities, and other attributes.

- **URL:** https://pokeapi.co/api/v2/pokemon/{name}
- **Method:** GET
- **Parameters:**
- - name: The name of the Pokémon to fetch details for (e.g., "bulbasaur").
- **Response:** Detailed data about the Pokémon, such as abilities, stats, and images.

3. **Get Pokémon Types:**
   Fetches a list of all available Pokémon types (e.g., Water, Grass, Fire, Ghost, Flying).

- **URL:** https://pokeapi.co/api/v2/type
- **Method:** GET
- **Response:** A list of all Pokémon types that can be used to filter Pokémon in the app.
