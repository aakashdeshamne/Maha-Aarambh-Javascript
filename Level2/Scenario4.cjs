// 4. In-Memory API Rate Limiter

// Scenario: To prevent abuse, you need to limit how many times a single user (identified by IP address)
// can hit a specific API endpoint.
// Task: Create a simple in-memory rate-limiting middleware. 
// The function should limit each IP address to 100 requests per hour. 
// Use a JavaScript Map or a simple object to store IP addresses, request counts, and timestamps. 
// If a user exceeds the limit, respond with a 429 Too Many Requests status.

//using map
const rateLimiterMap=new Map();

const Rate_Limit=100;
const time_window=60*60*1000;

const ratelimitermiddlewere=(req,res,next)=>{
    const ip=req.header['x-forwarded-for']||req.connection.remoteAddress;
    const currentTime=Date.now();
    if(rateLimiterMap.has(ip)){
        const data=rateLimiterMap.get(ip);
        const {count,starttime}=data;
        if(currentTime-starttime<time_window){
            if(count+1>Rate_Limit){
                res.status(429).send("Too many requests. Please try again later.");
            }
            else{
                rateLimiterMap.set(ip,{count:count+1,starttime});
                next();
            }
        }
        else{
            rateLimiterMap.set(ip,{count:1,starttime:currentTime});
            next();
        }
    }
    else{
        rateLimiterMap.set(ip,{count:1,starttime:currentTime});
        next();
    }
}
//using object
const rateLimiterObj={};
const ratelimitermiddlewereObj=(req,res,next)=>{
    const ip=req.header['x-forwarded-for']||req.connection.remoteAddress;
    const currentTime=Date.now();
    if(rateLimiterObj[ip]){
        const {count,starttime}=rateLimiterObj[ip];
        if(currentTime-starttime<time_window){
            if(count+1>Rate_Limit){
                res.status(429).send("Too many requests. Please try again later.");
            }
            else{
                rateLimiterObj[ip].count=count+1;
                next();
            }
        }
        else{
            rateLimiterObj[ip]={count:1,starttime:currentTime};
            next();
        }
    }
    else{
        rateLimiterObj[ip]={count:1,starttime:currentTime};
        next();
    }
}

//sample usages in api
const express=require('express');
const app=express();
app.use(ratelimitermiddlewere);
//or
app.get('/',ratelimitermiddlewereObj,(req,res)=>{
    res.send("Hello, world!");
})