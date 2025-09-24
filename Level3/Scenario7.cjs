// 7. API Response Standardization

// Scenario: To make your API predictable for frontend developers, 
// you want all successful responses and all error responses to follow a consistent JSON structure.
// Task: Create two utility functions: sendSuccess(res, data, statusCode = 200) 
// and sendError(res, message, statusCode = 500).

// sendSuccess should format the response as { "status": "success", "data": { ... } }.

// sendError should format the response as { "status": "error", "error": { "message": "..." } }.

// Refactor a simple CRUD API (like the one from Level 1) to use these functions for all its responses.

const express=require('express');
const app=express();

   
const sendSuccess=(res,data,statusCode=200)=>{
    res.status(statusCode).json({
        status:"success",
        data:data
    });
}
const sendError=(res,message,statusCode=500)=>{
    res.status(statusCode).json({
        status:"error",
        error:{message:message}
    });
}
const productModel=require('./models/productModel');

app.get('/',async(req,res)=>{
    try{
        const products=await productModel.find();
        if(products){
            sendSuccess(res,products,200);
        }
        else{
            sendError(res,"No products found",404);
        }
    }
    catch(err){
        sendError(res,err.message,500);
    }
})

