// 2. Background Job Processing with a Queue

// Scenario: When a new user registers, you need to send them a welcome email. 
// Sending this email directly in the registration request can slow down the response time. 
// You need to offload this task to a background worker.

// Task:

// For this exercise, simulate a message queue (you don't need a full RabbitMQ/Kafka setup).
// Create a simple in-memory jobQueue array.

// Create a POST /register endpoint. Instead of "sending" the email directly, 
// it should add a job object { task: 'sendWelcomeEmail', email: newUser.email } to the jobQueue.
// It should then immediately send a response to the user.

// Create a separate processQueue() function that runs on an interval (e.g., every 10 seconds).
// This function should check the jobQueue for new jobs, "process" them 
// (e.g., log a message like Sending welcome email to...), and remove them from the queue.

const express = require('express');
const app=express();
app.use(express.json());

let jobQueue=[];

app.post('/register',(req,res)=>{
    const newUser=req.body;
    if(!newUser){
        return res.status(400).send('User data is required');
    }
    jobQueue.push({task:'sendWelcomeEmain',email:newUser.email});
    res.status(200).send('User registered successfully');
})

//creting function to process the queue every 10 seconds

const processQueue=()=>{
    setInterval(()=>{
        if(jobQueue.length>0){
            const job=jobQueue.shift();
            console.log(`Sending welcome email to ${job.email}`);
        } 
    },10000)
}
processQueue();