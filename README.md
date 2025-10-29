# Student System

A simple Angular application for managing students — view, edit, and delete student records — with a mock backend API powered by json-server.

## Installation

Clone the repository and install dependencies:

```
git clone https://github.com/PetarVancev/student-system
cd student-system
npm install
```

## Running the Application

To start both the Angular frontend and the mock API server, run:

```
npm run dev
```

This command:

- Starts the Angular app on http://localhost:4200
- Starts the JSON server on http://localhost:3000

## Available Scripts

| Command        | Description                                               |
| -------------- | --------------------------------------------------------- |
| npm run dev    | Runs both Angular (ng serve) and JSON server concurrently |
| npm start      | Runs Angular app only (ng serve)                          |
| npm run server | Runs the JSON server only                                 |
| npm run build  | Builds the app for production (outputs to dist/)          |
| npm test       | Runs unit tests                                           |

## Mock API

The app uses json-server to simulate a REST API.

- Database file: db.json
- Base URL: http://localhost:3000/students

## Build for Production

To create an optimized production build:

```
npm run build
```

## Notes

- The project uses concurrently to run the backend and frontend together for easy development.
- Make sure no other process is using ports 3000 or 4200.
