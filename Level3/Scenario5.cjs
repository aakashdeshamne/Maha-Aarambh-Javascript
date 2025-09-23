// 5. Caching with Redis

// Scenario: Your e-commerce site has a "featured products" page that is read very frequently
//  but updated infrequently, causing unnecessary database load.
// Task: Write a function getFeaturedProducts() that integrates Redis for caching.

// The function should first check if featured-products exists in the Redis cache.

// If it exists, parse and return the data directly from Redis.

// If it doesn't exist (a cache miss), query the database for the products,
// JSON.stringify the result, store it in the Redis cache with a 1-hour expiration (EX),
// and then return the data.

const { log } = require('console');
const productModel=require('./Scenario3.cjs');
const redis=require('redis');
const redisclient=redis.createClient();
redisclient.connect();

redisclient.on('error',(err)=>{
    console.log("Redis Client Error",err);
})
redisclient.on('connect',()=>{
    console.log("Connected to Redis");
})

const getFeaturedProducts=async()=>{
    try{
        const cachedproduct=await redisclient.get('featured-products');
        if(cachedproduct){
            console.log("Cache hit");
            return JSON.parse(cachedproduct);
        }
        else{
            console.log("cache miss");
            const product=await productModel.find({isFeatured:true});//here we are targeting to cached feature product for home page feed and it is just a boolean feild in schema
            await redisclient.setEx('featured-products',3600,JSON.stringify(product));
            return product;
        }
    }
    catch(error){
        console.log("Error in getFeaturedProducts"+error.message);
    }
}
// Test the function using an api
const express=require('express');
const app=express();

app.get('/featured-products',async(req,res)=>{
    const products=await getFeaturedProducts();
    res.json(products);
});