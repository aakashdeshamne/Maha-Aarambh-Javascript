// 1. API Versioning Strategy

// Scenario: 
// You need to make a breaking change to your GET /api/products/:id endpoint. 
// The price field is changing from a simple number (e.g., 99.99) to a structured object
// ({ "amount": 99.99, "currency": "USD" }). You cannot break the existing mobile app 
// that relies on the old format.

// Task:

// Implement API versioning in your Express application.

// Requests to GET /api/v1/products/:id should continue to return the old product format.

// Requests to GET /api/v2/products/:id should return the new format with the price object.

// Structure your application's routes directory to cleanly separate the logic for v1 and v2.

const express=require('express');
const app=express();
app.use(express.json());
const Product=require('./models/Product'); 

const V1Router=express.Router();
const V2Router=express.Router();

app.use('/api/v1/products',V1Router);
app.use('/api/v2/products',V2Router);

V1Router.get('/:id',async(req,res)=>{
    const product=await Product.findById(req.params._id);
    if(!product){
        return res.status(404).json({message:"Product not found"});
    }
    res.status(200).json({
        id:product._id,
        name:product.name,
        price:product.price // old format
    });
})

V2Router.get('/:id',async(req,res)=>{
    const product=await Product.findById(req.params._id);
    if(!product){
        return res.status(404).json({message:"Product not found"});
    }
    res.status(200).json({
        id:product._id,
        name:product.name,
        price:{
            amount:product.price,
            currency:"USD"
        } // new format
    });
})

//if there are different currencies we have to use new schema for product
