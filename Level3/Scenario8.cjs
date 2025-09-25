// 8. Secure Password Hashing

// Scenario: You are implementing user registration and must store user passwords securely.
// Storing them as plain text is a major security vulnerability.
// Task: Using the bcrypt library:

// Write a function hashPassword(plainTextPassword) that takes a password and returns a secure hash.

// Write a function comparePassword(plainTextPassword, hash) 
// that compares a submitted password with a stored hash and returns true or false.

// Show how you would use hashPassword before saving a new user to the database.

const express=require('express');
const bcrypt=require('bcrypt');
const app=express();

const hashPassword=async(plainPassword)=>{
    const saltround=10;
    const hash=await bcrypt.hash(plainPassword,saltround);
    return hash;
}

const comparePassword=async(plainPassword,hash)=>{
    const match=await bcrypt.compare(plainPassword,hash);
    return match;
}
const userModel=require('./models/userModel');
app.use(express.json());
app.post('/register',async(req,res)=>{
    try{
        const {username,password}=req.body;
        const hashedPassword=await hashPassword(password);
        const newUser=new userModel({username:username,password:hashedPassword});
        await newUser.save();
        res.status(201).json({message:"User registered successfully"});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
})

app.post('login',async(req,res)=>{
    try{
        const {username:username,password:password}=req.body;
        const user=await userModel.find({username:username});
        if(user){
            const isMatch=await comparePassword(password,user.password);
            if(isMatch){
                res.status(200).json({message:"Login successful"});
            }
            else{
                res.status(401).json({message:"Invalid credentials"});
            }
        }
        else{
            res.status(404).json({message:"User not found"});
        }
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
})