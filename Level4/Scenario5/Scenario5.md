5. Advanced Environment Configuration & Validation

Scenario: Your application needs to run in multiple environments (development, production) with different configurations. A missing or invalid environment variable should prevent the app from starting to avoid runtime errors.
Task:

Create a centralized configuration module (e.g., /config.js).

Use the dotenv library to load environment variables from a .env file.

Use a validation library like Joi or zod to define a schema for your required variables (NODE_ENV, PORT, MONGO_URL, JWT_SECRET). The schema should enforce types (e.g., PORT is a number) and valid values (e.g., NODE_ENV must be one of ['development', 'production']).

In your config module, validate process.env against this schema immediately. If validation fails, log a descriptive error message and terminate the process (process.exit(1)).

Export a frozen, validated config object from this module for the rest of your application to use, preventing any accidental modifications.

Ensure all .env files are included in your .gitignore.