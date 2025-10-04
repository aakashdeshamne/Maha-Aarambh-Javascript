// 9. Database Indexing for Performance (Conceptual)

// Scenario: Users are complaining that searching for products by category is extremely slow. 
// Your products collection has millions of documents.
// Task:

// Explain why the query is likely slow.

// Describe what a database index is and how it works in this context.

// Write the Mongoose schema modification needed to add a non-unique index to the category field.

// Discuss a potential trade-off of adding this index (e.g., its effect on write performance).
// Explanation of Slow Query:
// The query is likely slow because the database has to perform a full collection scan to find all products that match the specified category. 
// With millions of documents, this can be very time-consuming as it checks each document one by one.

// Database Index Explanation:
// A database index is a data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space. 
// In this context, creating an index on the category field allows the database to quickly locate all documents with a specific category without scanning the entire collection. 
// The index works like a sorted list of category values, which makes searching much faster.

// Mongoose Schema Modification:

//adding index to the category field in the product schema
const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    name:String,
    price:Number,   
    category:String
})
productSchema.index({category:1});
//index on price field
productSchema.index({price:-1});
const Product=mongoose.model('Product',productSchema);
module.exports=Product;

// Trade-off of Adding Index:
// While adding an index significantly improves read performance for queries filtering by the indexed field, 
// it can negatively impact write performance. This is because every time a document is inserted, updated, or deleted, 
// the index must also be updated to reflect these changes. This additional overhead can lead to slower write operations, 
// especially in collections with a high volume of writes.