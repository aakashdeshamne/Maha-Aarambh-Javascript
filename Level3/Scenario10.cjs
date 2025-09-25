// 10. Content Security Policy (CSP) Headers

// Scenario: To mitigate Cross-Site Scripting (XSS) attacks on a web application you're serving with 
// Express, you need to set a Content Security Policy.
// Task: Using a library like helmet or by manually setting headers in a middleware, 
// implement a CSP. The policy should:

// Only allow scripts to be loaded from your own domain ('self').

// Only allow images from your own domain and from https://images.example.com.

// Disallow all inline scripts.
// Disallow all eval() usage.

const express=require('express');
const helmet=require('helmet');
const app=express();
app.use(helmet());

const cspoptions={
    directives:{
        defaultSrc:["'self'"],
        scriptSrc:["'self'"],
        imgSrc:["'self'",'https://images.example.com'],
        styleSrc:["'self'"],
        objectSrc:['none'],
        upgradeInsecureRequests:[],
    }   
}
app.use(helmet.contentSecurityPolicy(cspoptions));
app.get('/',(req,res)=>{
    res.send('CSP headers set with Helmet');
});
app.listen(3000,()=>{
    console.log('Server running on port 3000');
});

