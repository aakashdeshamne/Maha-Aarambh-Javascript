// 1. JWT-Based Authentication

// Scenario: You need to secure your API. When a user logs in with a correct username and password, 
// they should receive a token that they can use to access protected routes.

// Task:

// Create a /login endpoint that takes a username and password. 
// If they are valid, generate a JSON Web Token (JWT) containing the user's ID and role, 
// and send it back.

// Create a jwtAuth middleware that checks for a valid JWT in the Authorization header (Bearer <token>).

// If the token is valid, decode it and attach the user's data (e.g., id and role) to the req object.
//  If not, send a 401 Unauthorized error.

// Create a protected route, e.g., GET /api/profile,
//  that uses this middleware and returns the authenticated user's data.

const express=require('express');
const app=express();
const jwt=require('jsonwebtoken');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt');
const SECRET_KEY=process.env.SECRET_KEY||'your_secret_key';
app.use(bodyParser.json());

const UserModel="./userModel.js";
const User=require(UserModel);

//Login Route

app.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    const user=await User.findOne({username:username});
    if(!user){
        return res.status(401).json({message:'Invalid username or password'});
    }
    const isPasswordvalid=await bcrypt.compare(password,user.password);
    if(!isPasswordvalid){
        return res.status(401).json({message:'Invalid username or password'});
    }
    const token=jwt.sign(
        {id:user.username,role:user.role},
        SECRET_KEY,
        {expiresIn:'1h'}
    );
    res.json({token});
});

//JWT Authentication Middleware

const jwtAuth=(req,res,next)=>{
    const authheader=req.headers['authorization'];
    if(!authheader){
        return res.status(401).json({message:'you are not authorized'});
    }
    const token=authheader.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'you are not authorized'});
    }
    jwt.verify(token,SECRET_KEY,(error,decode)=>{
        if(error){
            return res.status(401).json({message:'you are not authorized'});
        }
        req.user=decode;
        next();
    });
};

//protected Route

app.get('/api/profile',jwtAuth,async(req,res)=>{
    const user=await User.findById(req.user.id);
    if(!user){
        return res.status(404).json({message:'User not found'});
    }
    res.json({id:user.id,username:user.username,role:user.role});
})