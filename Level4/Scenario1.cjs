// 1. Role-Based Access Control (RBAC)

// Scenario: Your application from Level 3 now needs to differentiate between regular users and administrators. 
// Admins should be able to access routes that regular users cannot.
// Task:

// Extend your JWT payload from Level 3 to include a role (e.g., 'user' or 'admin').

// Create a new middleware requireRole(role). 
// This middleware should be configurable to check for a specific role.

// It should use the req.user object created by your jwtAuth middleware. 
// If req.user.role matches the required role, it should call next(). Otherwise, 
// it should return a 403 Forbidden error.

// Create a new admin-only route, e.g., GET /api/admin/dashboard, 
// and protect it using jwtAuth and requireRole('admin').

const express=reqiore('express');
const jwt=require('jsonwebtoken');
const app=express();
app.use(express.json());
const JWT_SECRETE='your_jwt_secrete_key';

//Middlewere to authinticate JWT token

const jwtAuth=(req,res,next)=>{
    const authHeader=req.header['Authorization'];
    if(!authHeader)return res.status(401).jaon({message:'Access Denied'});
    const token=authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'Access Denied'});
    }
    try{
        const verifyToken=jwt.verify(token,JWT_SECRETE);
        req.user=verifyToken;
        next();
    }
    catch(err){
        res.status(400).json({message:'Invalid Token'});
    }
}
//We can also varify role in the jwtAuth middlewere itself

const jwtAuthWithRole=(req,res,role,next)=>{

}

//Middlewere to check user role

const requireRole=(role)=>{
    return (req,res,next)=>{
        if(req.user.role!=role){
            return res.status(403).json({message:'You dont have permission to access this resource'});
        }
        else{
            next();
        }
    }
}

//Admin Routes

app.get('/api/admin/dashboard',jwtAuth,requireRole('admin'),(req,res)=>{
    res.json({message:'Welcome to Admin Dashboard'});
})

//we are using two separate middlewere for jwtauth and role based access  
