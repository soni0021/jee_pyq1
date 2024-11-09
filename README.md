
# JEE Escape

JEE Escape is a comprehensive web platform designed to help students prepare for the JEE Advanced examination. It offers a vast collection of Past Year Questions (PYQ) and integrates the GEMNIPRO AI Assistant to provide personalized study assistance and guidance.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)

- [Dependencies](#dependencies)
  - [Frontend Dependencies](#frontend-dependencies)
  - [Backend Dependencies](#backend-dependencies)
- [Dev Dependencies](#dev-dependencies)
## Features

- **Past Year Questions (PYQ):** Extensive repository of JEE Advanced past year questions for thorough practice.
- **GEMNIPRO AI Assistant:** An AI-powered assistant that provides personalized study plans, hints, and answers to queries.
- **Responsive Design:** Ensures a seamless experience across devices.
- **User Authentication:** Secure sign-up and login functionalities.
- **Performance Tracking:** Track your progress and performance over time.
- **Search and Filter:** Easily search and filter questions based on topics and difficulty levels.


## Demo

[Live Demo](https://youtu.be/eZbX1oW6Otw)


## Getting Started

### Prerequisites

- **Node.js:** Ensure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **Git:** Install Git from [here](https://git-scm.com/).

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/soni0021/jeepyq1.git
## Dependencies

### Frontend Dependencies

- **React:** JavaScript library for building user interfaces.
- **Vite:** Fast frontend build tool.
- **@vitejs/plugin-react:** React plugin for Vite using Babel for Fast Refresh.
- **@vitejs/plugin-react-swc:** React plugin for Vite using SWC for faster builds.
- **React Router DOM:** Declarative routing for React applications.
- **Axios:** Promise-based HTTP client for the browser and Node.js.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Framer Motion:** Library for animations and gestures.
- **React Bootstrap:** Bootstrap components built with React.
- **React Query:** Data-fetching library for React.
- **Formik:** Form management in React.
- **Yup:** JavaScript schema builder for value parsing and validation.

### Backend Dependencies

- **Express:** Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB:** NoSQL database for data storage.
- **Mongoose:** MongoDB object modeling for Node.js.
- **jsonwebtoken:** Implementation of JSON Web Tokens.
- **dotenv:** Loads environment variables from a .env file.
- **cors:** Middleware for enabling CORS.
- **OpenAI API:** For integrating GEMNIPRO AI Assistant.
- **bcrypt:** Library to help hash passwords.
- **nodemon:** Utility that monitors for any changes in your source and automatically restarts your server.
#### Dev Dependencies

- **ESLint:** Pluggable linting utility for JavaScript and JSX.
- **@eslint/js:** ESLint configuration for JavaScript.
- **eslint-plugin-react:** React specific linting rules for ESLint.
- **eslint-plugin-react-hooks:** Linting rules for React Hooks.
- **Prettier:** Opinionated code formatter.
- **Husky:** Git hooks made easy.
- **Lint-Staged:** Run linters on Git staged files.
- **@vitejs/plugin-react-swc:** React plugin for Vite using SWC for faster builds.

## Available Scripts

### Frontend Scripts

In the `frontend` directory, run:

#### Install dependencies
npm install

#### Start development server
npm run dev

#### Build for production
npm run build

#### Preview production build
npm run preview

#### Run unit tests
npm test

#### Run linting
npm run lint
### Backend Scripts
#### Format code
npm run format
In the backend directory, you can run:

#### npm start
Starts the backend server.<br> The server runs at http://localhost:5000.

#### npm run dev
Runs the server in development mode with Nodemon for automatic restarts on file changes.

