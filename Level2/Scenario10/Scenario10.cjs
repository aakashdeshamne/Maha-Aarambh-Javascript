// 10. API Versioning in Routes

// Scenario: You are releasing a new version (v2) of your products API with a different data structure,
// but you must keep the old v1 running for legacy clients.
// Task: Show how you would structure your Express application's routing to handle this. 
// Create two separate router files, routes/products.v1.js and routes/products.v2.js. 
// In your main server.js file, 
// import both routers and mount them on /api/v1/products and /api/v2/products respectively.

//server.js
const express=require('express');
const app=express();
const productsV1Router=require('./routes/products.v1');
const productsV2Router=require('./routes/products.v2');

app.use('/api/v1/products',productsV1Router);
app.use('/api/v2/products',productsV2Router);
