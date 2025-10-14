// 5. Designing a Microservices Communication Flow (Conceptual)

// Scenario: Your monolithic e-commerce application is being broken down into microservices. 
// You now have a User Service, a Product Service, and an Order Service.
// Task:
// Design and describe the sequence of events and API calls for when a user creates a new order. 
// Your design must be asynchronous to ensure the system is resilient.

// Which service does the user's initial "create order" request hit?

// How does the Order Service validate the product details (e.g., price, stock)? 
// Should it make a direct (synchronous) call to the Product Service? What are the risks of this 
// approach?

// Propose an asynchronous communication pattern using a message queue (like RabbitMQ or AWS SQS). 
// Describe how the Order Service, Product Service, and User Service would interact via events 
// (e.g., OrderCreated, StockReserved, PaymentProcessed) to fulfill the order without being tightly
// coupled.
const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());

const orderSchema=new mongoose.Schema({
    orderId:String,
    userId:String,
    products:[{
        productId:String,
        quantity:Number,
        price:Number
    }],
    status:String
});


const userSchema=new mongoose.Schema({
    userId:String,
    name:String,
    email:String
});

const productSchema=new mongoose.Schema({
    productId:String,
    name:String,
    price:Number,
    stock:Number
});

const User=mongoose.model("User",userSchema);
const Product=mongoose.model("Product",productSchema);
const Order=mongoose.model("Order",orderSchema);

// Simulated Message Queue
const messageQueue=[];

const createOrder=async(req,res)=>{
    const{userId,products}=req.body;
    try{
        const order=new Order({
            orderId:new mongoose.Types.ObjectId().toString(),
            userId,
            products,
            status:"pending"
        });
        await order.save();
        messageQueue.push({event:"OrderCreated",data:order});
        res.status(201).json({message:"Order created, processing...",orderId:order.orderId});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

const processProductService=async()=>{
    const message=messageQueue.find(msg=>msg.event==="OrderCreated");
    if(!message)return;
    const order=message.data;
    let allInStock=true;
    for(const item of order.products){
        const product=await Product.findOne({productId:item.productId});
        if(!product||product.stock<item.quantity){
            allInStock=false;
            break;
        }
    }
    if(allInStock){
        for(const item of order.products){
            await Product.updateOne({productId:item.productId},{$inc:{stock:-item.quantity}});
        }
    }
    messageQueue.push({event:"StockReserved",data:{orderId:order.orderId,success:allInStock}});
    messageQueue.splice(messageQueue.indexOf(message),1);
}

const processPaymentService=async()=>{
    const message=messageQueue.find(msg=>msg.event==="StockReserved");
    if(!message)return;
    const{orderId,success}=message.data;
    if(!success){
        return;
    }
    messageQueue.push({event:"PaymentProcessed",data:{orderId,paymentSuccess:true}});
    messageQueue.splice(messageQueue.indexOf(message),1);
}
const finalizeOrder=async()=>{
    const message=messageQueue.find(msg=>msg.event==="PaymentProcessed");
    if(!message)return;
    const{orderId,paymentSuccess}=message.data;
    if(paymentSuccess){
        await Order.updateOne({orderId},{$set:{status:"completed"}});
    }
    else{
        await Order.updateOne({orderId},{$set:{status:"payment_failed"}});
    }
    messageQueue.splice(messageQueue.indexOf(message),1);
}

app.post("/create-order",async(req,res)=>{
    await createOrder(req,res);
    await processProductService();
    await processPaymentService();
    await finalizeOrder();
});



