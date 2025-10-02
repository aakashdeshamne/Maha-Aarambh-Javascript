// 8. Writing a Basic Dockerfile

// Scenario: You need to containerize your Node.js application to ensure it runs consistently across
//  different environments (development, staging, production).
// Task: Write a Dockerfile for your Express application. The Dockerfile should:

// Start from an official Node.js base image (e.g., node:18-alpine).

// Set a working directory inside the container.

// Copy package.json and package-lock.json and run npm install.

// Copy the rest of your application code into the container.

// Expose the port your application runs on.

// Define the command to start the application when the container launches.