# Client Application for ClimatePulse

## 🌐 Overview
This is the client-side application for ClimatePulse, designed to interface with the ClimatePulse API for posting and visualizing weather metrics. Built with modern web technologies, this app provides a seamless user experience for exploring weather data.

## 🚀 Quick Start

1. **Clone the main repository** (if not already done):
    ```bash
    git clone https://github.com/rodrigo-picanco/climatepulse.git
    ```
2. **Navigate to the client directory**:
    ```bash
    cd client
    ```
3. **Install dependencies**:
    ```bash
    npm install
    ```
4. **Run the application in development mode**:
    ```bash
    npm run dev
    ```
    Visit [http://localhost:5173](http://localhost:5173) the to view it in the browser.

5. **Build the application for production**:
    ```bash
    npm run build
    ```
    Builds the app for production to the `dist` folder.

## 🧰 Available Scripts

In the client project, you can run:

- `npm run dev`: Starts the development server.
- `npm run build`: Compiles and bundles the application for production.
- `npm run lint`: Runs ESLint to catch syntax and problems.
- `npm run test`: Executes unit tests with Vitest.
- `npm run test:debug`: Runs tests in debug mode with Vitest.

## 📚 Technologies

- **React** for building the user interface.
- **Vite** as the build tool for fast development and bundling.
- **TypeScript** for static type checking.
- **Tailwind CSS** for utility-first styling.
- **Vitest** for unit testing.
- **ESLint** for code linting.

## 📦 Dependencies

Key dependencies include:

- `@headlessui/react` for accessible UI components.
- `@tremor/react` for beautiful charts and UI elements.
- `react-query` for fetching, caching.
- `@tanstack/react-router` for routing.

## 🏛 Application Architecture

The ClimatePulse client application is structured to promote modularity, scalability, and ease of development. 

The architecture is designed around a central `App.tsx` component, which orchestrates the overall application layout and routing. 

Below is an overview of the key components and their interactions:

### Entry Point
- **`main.tsx`**: Serves as the entry point to the application, importing the main stylesheet `index.css` for global styles and `App.tsx` for the main application logic.

### Core Components
- **`App.tsx`**: The heart of the application, responsible for rendering the main UI components like `Navbar`, `Logo`, and the pages `Create` and `Dashboard`.
- **`pages/`**: Contains the page components, which import from modules.

### Modules
The application is divided into modules, each encapsulating a specific functionality:

#### Metrics
- **`create-measurement/`**: The main component is `create-measurement.tsx`, which utilizes `create-measurement-service.ts`.
- **`metrics-chart/`**: The main component `metrics-chart.tsx` utilizes `use-metrics-averages.ts` to fetch measurement data.

#### Shared Module
- **`client/`**: Provides a shared HTTP client (`client.ts`) for interacting with the back-end API.
- **`env/`**: Contains environment-specific configurations (`env.ts`).
- **`ui/`**: A collection of reusable UI components like `form.tsx`, `header.tsx`, `navbar.tsx`, etc., which are used across the application.

### Styling
- **`index.css`**: The global stylesheet for the application, imported directly by the entry point script.
