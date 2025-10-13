// 4. Database Query Optimization with Aggregation

// Scenario: You need to generate a report showing the total sales revenue per product category.
//  Doing this by fetching all orders and processing them in your application is too slow 
//  and memory-intensive.
// Task:
// Write a single MongoDB Aggregation Pipeline query to solve this. The query should:

// $match only completed orders within a specific date range.

// $unwind the products array within each order.

// $lookup to join with the products collection to get the category for each product.

// $group the results by product category.

// $sum the total revenue for each category.

// Return a list of objects, each containing _id (the category) and totalRevenue.

const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());

const orderSchema=new mongoose.Schema({
    orderId:String,
    date:Date,
    status:String,
    products:[{
        productId:String,
        quantity:Number,
        price:Number
    }]
});
const productSchema=new mongoose.Schema({
    productId:String,
    name:String,
    category:String
});

const Order=mongoose.model("Order",orderSchema);
const Product=mongoose.model("Product",productSchema);

const getSalesByCategory=async(startDate,endDate)=>{
    const result=await Order.aggregate([
        {
            $match:{
                status:"completed",
                date:{$gte:new Date(startDate),$lte:new Date(endDate)}
            }
        },
        {
            $unwind:"$products"
        },
        {
            $lookup:{
                from:"products",
                localField:"products.productId",
                foreignField:"productId",
                as:"productDetails"
            }
        },
        {$unwind:"$productDetails"},
        {
            $group:{    
                _id:"$productDetails.category",
                totalRevenue:{$sum:{$multiply:["$products.quantity","$products.price"]}}
            }
        }
    ]);
    return result;
}  
app.get("/sales-by-category",async(req,res)=>{
    const{startDate,endDate}=req.query;
    try{
        const sales=await getSalesByCategory(startDate,endDate);
        res.json(sales);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});