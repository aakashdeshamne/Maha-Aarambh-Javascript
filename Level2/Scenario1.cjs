// 1. API Key Middleware
// Scenario: You're building an API that requires clients to provide a secret API key for access.
// Task: Write an Express.js middleware function called apiKeyAuth. 
// This middleware should check for an x-api-key header in the incoming request. 
// If the key is present and matches a predefined secret key, 
// it should allow the request to proceed. If the key is missing or incorrect,
//  it should respond with a 401 Unauthorized status and a JSON error message.

const express=require('express');
const app=express();
app.use(express.json());
const router=express.Router();
app.use('/api/products',router);

const SECRET_API_KEY='mysecretkey123';

const apiKeyAuth=(req,res,next)=>{
    const apikey=req.headers['x-api-key'];
    if(!apikey || apikey!==SECRET_API_KEY){
        return res.status(401).json({error:"Access is not authorized"});
    }
    next();
}

// Apply the middleware to all routes under /api/products
router.use(apiKeyAuth);
//or
router.get('/',apiKeyAuth,async(req,res)=>{
    const products=await productModel.find();
    if(products){
        res.status(200).json(products);
    }
    else{
        res.status(404).json({error:"No products found"});
    }
})