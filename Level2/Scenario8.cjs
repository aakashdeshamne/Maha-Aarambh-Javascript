// 8. Secure Configuration Management

// Scenario: Your application needs a database URL, an API secret, and a port number. 
// These values should come from environment variables for security, 
// but you need safe defaults for local development.
// Task: Create a config.js module that exports a configuration object. 
// This module should read process.env.DATABASE_URL, process.env.API_SECRET, and process.env.PORT. 
// If any of these are not defined, it should provide a sensible default value 
// (e.g., a local MongoDB URL, a random string for the secret, and port 3000). 
// The module should also log a warning to the console if a default value is being used for the API_SECRET.

// config.js
const crypto = require('crypto');
const config={
    databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/myapp',
    apiSecret: process.env.API_SECRET || crypto.randomBytes(16).toString('hex'),
    port: process.env.PORT || 3000
}

if (!process.env.API_SECRET) {
    console.warn('Warning: Using default API_SECRET. This is not secure for production environments.');
}
if(!process.env.DATABASE_URL){
    console.warn('Warning: Using default DATABASE_URL. Ensure this is correct for your environment.');
}
module.exports=config;

//sample Usages
// app.js
const config=require('./config');
const express=require('express');
const app=express();
app.listen(config.port,()=>{
    console.log(`Server running on port ${config.port}`);
});

// db.js
const mongoose=require('mongoose');

mongoose.connect(config.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));