# ClimatePulse
[![Production Deploy](https://img.shields.io/badge/deploy-production-green.svg)](https://climatepulse.vercel.app/)
![coverage](https://img.shields.io/badge/coverage-100%25-green)

- [Introduction](#-introduction)
- [Getting Started](#-getting-started)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [API Documentation](#-api-documentation)
- [Development Workflow](#-development-workflow)
- [Contributing](#-contributing)

## 🌤 Introduction
Welcome to ClimatePulse, an app for posting and visualizing weather metrics, created as a coding challenge for Factorial!

This application is designed to provide users with up-to-the-minute weather metric updates, including timestamp, name, and value, all displayed in a user-friendly timeline.

Dive into our dashboard to explore weather patterns and analyze averages by minute, hour, and day.

### Checking Out the Project
If you just want to use the application, you can check it out here: [https://climatepulse.vercel.app/](https://climatepulse.vercel.app/)

## 🚀 Getting Started
Since the main purpose of this app is to showcase my expertise through a code challenge, this section focuses on running the application so you can see it in action.

For a guide on how to set things up for development, check out the [Develpoment Workflow](#-development-workflow) section.

***A Note on Windows***

Even though this project was created with \*nix operating system users in mind (e.g., Linux, MacOS), all the tools it uses should be Windows compatible.

#### Clone the Repo
All strategies to run the project locally presuppose you clone the project repo with:

```bash
git clone https://github.com/rodrigo-picanco/climatepulse.git
```

#### Enter the project

```bash
cd climatepulse
```

#### Build it yourself

##### Prerequisites

If you want to build it yourself, you'll need the following dependencies installed on your machine:

- [Node.js](https://nodejs.org/en) (v20.12.0 or later)
- [Ruby](https://www.ruby-lang.org/en/) (v3.3.0 or later)
- [PostgreSQL](https://www.postgresql.org/) (v14.11 or later)

Please follow each project's documentation on how to install them individually on your system architecture and operating system.

##### Run on Your Machine with `just` Task Runner

If you have the [`just`](https://just.systems/) task runner installed on your machine, you can use it to install, build and run the application locally with the following commands:

| Component | Command        |
|-----------|----------------|
| Server    | `just run-server` |
| Client    | `just run-client` |

##### Run it step by step on your machine

###### Client

To run the front-end part of the application, execute the following steps in a terminal:

1. Enter the client directory:

```bash
cd client
```

2. Install the dependencies:

```bash
npm install
```

3. Build the application:

```bash
npm run build
```

4. Start the application:

```bash
npx serve ./dist
```

###### Server

To run the back-end part of the application, assuming you have PostgreSQL up and running on your machine, execute the following steps in a terminal:

1. Enter the server directory:

```bash
cd server
```

2. Install the dependencies:

```bash
bundle install
```

3. Prepare the database:

```bash
./bin/rails db:prepare
```

4. Start the application:

```bash
./bin/rails server
```

## 🛠 Tech Stack

Dive into the tech choices I made for this project and why:

### Front-end

The front-end is built mainly with the following tools:

- TypeScript as the source language
- React for rendering
- Vite for bundling
- Vitest for unit tests
- Tailwind for basic styling

### Back-end

The back-end API is built with Ruby on Rails, relying mainly on Rails defaults:

- Ruby as a language
- Rails as the web framework
- Minitest for tests
- PostgreSQL as the database

## 📈 Features

- **Data Visualization:** Metrics displayed in an intuitive timeline.
- **Simplified Logging:** Metrics are intuitive to add, just type in a name and a value.
- **Aggregate Averages:** View averages per minute, hour, and day to spot trends.

## 📦 API Documentation

Explore our RESTful API for fetching and posting weather metrics:

- **GET `/metrics`**: Retrieve all metrics.
- **GET `/metrics/measurements?period=minute|hour|day`**: Retrieve averages grouped by period.
- **POST `metrics/measurements/`**: Post a measurement and metric (if not found).

## 🤝 Contributing

Your contributions are what make the community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Development Workflow

Instructions on how to run and develop features for each part of the stack are available in each project's READMEs:

- [Client](https://github.com/rodrigo-picanco/climatepulse/tree/main/client#client-application-for-climatepulse)
- [Server](https://github.com/rodrigo-picanco/climatepulse/tree/main/server#server-application-for-climatepulse)

