// 1. API Endpoint Design (Conceptual)

// You are building an e-commerce platform. Design the RESTful API endpoints (just the methods and URLs, 
// e.g., GET /products/:id) for the following product-related actions:

// Fetch all products.
//database url=mongodb://localhost:27017/ecommerce
// Fetch a single product by its unique ID.

// Create a new product.

// Update an existing product.

// Delete a product.
const express=require('express');
const app=express();
app.use(express.json());
const router=express.Router();
app.use('/api/products',router);
const mongo_url='mongodb://localhost:27017/ecommerce';


//creating database connection
const mongoose=require('mongoose');
const connectdb=async(mongo_url)=>{
    try{
        await mongoose.connect(mongo_url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("Connected to MongoDB");
    }
    catch(error){
        console.log("Failed to connect to MongoDB"+error.message);
    }
}
connectdb(mongo_url);

//creting schema for product
const productSchema=new mongoose.Schema({
    id:{
        type:String,
        requires:true,
        unique:true
    },
    name:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true
    }
})
const productModel=mongoose.model('Product',productSchema);

// Answer:
// GET /products
router.get('/',async(req,res)=>{
    const products=await productModel.find();
    if(products){
        res.status(200).json(products);
    }
    else{
        res.status(404).json({message:"No products found"});
    }
})
// GET /products/:id
router.get('/:id',async(req,res)=>{
    const product=await productModel.findOne({id:req.params.id});
    if(product){
        res.status(200).json(product);
    }
    else{
        res.status(404).json({message:"Product not found"});
    }
    
})
// POST /products
router.post('/add',async(req,res)=>{
    const {id,name,price}=req.body;
    const newProduct=new productModel({id,name,price});
    try{
        await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
})
// PUT /products/:id
router.post('/:id',async(req,res)=>{
    const {name,price}=req.body;
    try{
        const updateProd=await productModel.findOneAndUpdate({id:req.params.id},{name,price},{new:true});
        if(updateProd){
            res.status(200).json(updateProd);
        }
        else{
            res.status(404).json({message:"Product not found"});
        }
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
})
// DELETE /products/:id
router.delete('/delete/:id',async(req,res)=>{
    try{
        const deleteProd=await productModel.findOneAndDelete({id:req.params.id});
        if(deleteProd){
            res.status(200).json({message:"Product deleted successfully"});
        }
        else{
            res.status(404).json({message:"Product not found"});
        }
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
})