// 6. Streaming Large Datasets

// Scenario: You need to provide a feature to download a large report of all orders as a CSV file. 
// Loading the entire dataset into memory before sending it could crash the server.
// Task: Create an endpoint GET /export/orders.csv. This endpoint should:

// Set the appropriate response headers 
// (Content-Type: text/csv, Content-Disposition: attachment; filename="orders.csv").

// Instead of fetching all orders at once, use your database cursor (.cursor() in Mongoose) 
// to fetch data in chunks.

// For each chunk (document) from the database, format it as a CSV row and pipe it directly to 
// the response stream (res.write()).

// End the response stream (res.end()) when all data has been processed.

const express=require('express');
const mongoose=require('mongoose');
const app=express();

// Connect to MongoDB
const mongoURI='mongodb://localhost:27017/yourdatabase';
const connection=(mongoURI)=>{
    try{
        mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    }
    catch(err){
        console.error('MongoDB connection error:', err);
    }  
}
connection(mongoURI);

// Define Order schema and model
const orderSchema=new mongoose.Schema({
    orderID:Number,
    customerName:String,
    amount:Number,
    date:Date
});
const Order=mongoose.model('Order', orderSchema);

// Endpoint to export orders as CSV

app.get('/export/orders.csv',async(req,res)=>{
    res.setHeader('Content-Type','tect/csv');
    res.setHeader('Content-Disposition','attachment; filename="orders.csv"');
    res.write('orderID,customerName,amount,date\n'); // CSV header

    const cursor=Order.find().cursor();
    cursor.on('data',(doc)=>{
        const csvRow=`${doc.orderID},${doc.customerName},${doc.amount},${doc.date.toISOString()}\n`;
        res.write(csvRow);
    });
    cursor.on('end',()=>{
        res.end();
    })
    cursor.on('error',(err)=>{
        console.error('Cursor error:', err);
        res.status(500).send('Internal Server Error');
    });
});
