// 7. GraphQL Query Endpoint

// Scenario: Your frontend team wants more flexibility in fetching data. Instead of multiple 
// REST endpoints for products, they want a single GraphQL endpoint to request exactly the data they
//  need.
// Task: Using express-graphql or a similar library:

// Define a simple GraphQL Product type that mirrors your Mongoose model.

// Create a schema with a root Query type.

// Implement a resolver for a products query that fetches all products from your database.

// Implement a resolver for a product(id: ID!) query that fetches a single product by its ID.

// Set up a single POST /graphql endpoint to handle all GraphQL queries.

const express=require('express');
const { graphqlHTTP }=require('express-graphql');
const { buildSchema }=require('graphql');
const mongoose=require('mongoose');
const Product=require('../models/Product');
const app=express();

//creating schema

const schema=buildSchema(`
    type Product{
        id: ID!
        name: String!
        price: Float!
        description: String
        inStock: Boolean!
        }
    type Query{
            products: [Product!]!
            product(id: ID!): Product
        }
`);

//resolvers
const root={
    products: async()=>{
        return await Product.find();
    },
    product: async({id})=>{
        return await Product.findById(id);
    }
}

//middleware
app.use('/graphql',graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));


