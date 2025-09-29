// 4. Unit Testing an API Endpoint

// Scenario: You need to ensure a critical API endpoint is reliable and works as expected.
// Task: Using a testing framework like Jest and a library like supertest:

// Write a test suite for your POST /products endpoint from Level 1.

// Write a test case that sends a valid product payload and asserts that the server 
// responds with a 201 Created status code and that the response body contains the created product.

// Write another test case that sends an invalid payload (e.g., missing the price) 
// and asserts that the server responds with a 400 Bad Request status code.

const express=require('express');
const app=express();
app.use(express.json());

let products=[];

app.post('/products',(req,res)=>{
    const {id,name,price}=req.body;
    if(!id || !name || price===undefined){
        return res.status(400).send({error:'Missing required fields'});
    }
    const newProduct={id,name,price};
    products.push(newProduct);
    res.status(201).send(newProduct);
})
module.exports=app;

