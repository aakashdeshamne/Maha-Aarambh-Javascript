// 3. Centralized Error Handling Middleware

// Scenario: Your application's error handling is scattered across many try...catch blocks.
//  You want to centralize it for consistency and easier maintenance.
// Task:

// Create a single, application-wide error handling middleware that is placed 
// at the very end of your middleware stack in Express.

// This middleware should have four arguments: (err, req, res, next).

// It should inspect the err object.
//  If it's a specific type of error you define (e.g., a ValidationError), 
//  it should send a 400 status. If it's an AuthenticationError, a 401. For all other errors, 
//  it should send a generic 500 Internal Server Error.

// Refactor one of your previous routes to remove the try...catch block and simply 
// call next(error) in the catch block of your async function to pass the error to your
//  new centralized handler.

const express=require('express');
const app=express();
app.use(express.json());

class ValidationError extends Error{
    constructor(message){
        super(message);
        this.name="ValidationError";
    }
}
class AuthenticationError extends Error{
    constructor(message){
        super(message);
        this.name="AuthenticationError";
    }
}

const ErrorHandler=(err,req,res,next)=>{
    if(err instanceof(ValidationError)){
        return res.status(400).send({error:err.message});
    }
    if(err instanceof(AuthenticationError)){
        return res.status(401).send({error:err.message});
    }
    else{
        return res.status(500).send({error:'Internal Server Error'});
    }
}

app.get('/data',(req,res,next)=>{
    const auth=req.headers.authorization;
    if(!auth){
        return next(new AuthenticationError('No auth token provided'));
    }
    const data=req.query.data;
    if(!data){
        return next(new ValidationError('Data query parameter is required'));
    }
    res.status(200).send({data:`You sent: ${data}`});
})
app.use(ErrorHandler);
