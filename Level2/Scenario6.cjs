// 6. Custom Error Handling

// Scenario: In your application, you want to differentiate between "Not Found" errors 
// and other server errors to provide more specific responses.
// Task: Create a custom JavaScript error class called NotFoundError that extends the built-in Error class.
// Then, in an Express route for GET /products/:id, write logic to query for a product. 
// If the product isn't found, throw new NotFoundError('Product not found'). Finally, 
// create an Express error-handling middleware that specifically catches NotFoundError and sends a 404 response, 
// while letting other errors result in a 500 response.

class NotFoundError extends Error{
    constructor(message){
        super(message);
        this.name="NotFoundError";
    }
}
const express=require('express');
const app=express();
const router=express.Router();
const ProductModel=require('../models/ProductModel'); 

app.use(express.json());
app.use((req,res,err,next)=>{
    if(err instanceof NotFoundError){
        return res.status(404).json({message:err.message});
    }
    else{
        return res.status(500).json({message:"Internal Server Error"});
    }
})
app.get('/product/:id',(req,res,next)=>{
    const id=req.params.id;
    try{
    const product=ProductModel.findOne(id);
    if(!product){
        return next(new NotFoundError('Product not found'));
    }
    res.status(200).json(product);
    }catch(error){
        next(error);
    }
})

