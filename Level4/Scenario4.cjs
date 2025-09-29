// 4. Unit Testing an API Endpoint

// Scenario: You need to ensure a critical API endpoint is reliable and works as expected.
// Task: Using a testing framework like Jest and a library like supertest:

// Write a test suite for your POST /products endpoint from Level 1.

// Write a test case that sends a valid product payload and asserts that the server 
// responds with a 201 Created status code and that the response body contains the created product.

// Write another test case that sends an invalid payload (e.g., missing the price) 
// and asserts that the server responds with a 400 Bad Request status code.

const express=require('express');
const app=express();
app.use(express.json());

let products=[];

app.post('/products',(req,res)=>{
    const {id,name,price}=req.body;
    if(!id || !name || price===undefined){
        return res.status(400).send({error:'Missing required fields'});
    }
    const newProduct={id,name,price};
    products.push(newProduct);
    res.status(201).send(newProduct);
})

module.exports=app;
//test suite in same file for simplicity

if(require.main===module){
    const request=require('superset');
    const server=app.listen(3000,()=>console.log('Server running on port 3000'));
    const runtest=async()=>{
        // Test case for valid payload
        await request(app)
        .post('/products')
        .send({id:1,name:'Product1',price:100})
        .expect(201)
        .then((response)=>{
            console.log('Test 1 Passed: Valid payload');
            console.log(response.body);
        })
        .catch(err=>{
            console.error('Test 1 Failed:',err.message);
        });
    }
    // Test case for invalid payload
    runtest().then(()=>server.close());
    request(app).post('/products').send({id:2,name:'product'}).expect(400)
    .then((res)=>{
        console.log('Test 2 Passed: Invalid payload');
        console.log(res.body);
    }).catch(err=>{
        console.error('Test 2 Failed:',err.message);
    })
}

