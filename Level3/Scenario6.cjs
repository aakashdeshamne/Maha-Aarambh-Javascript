// 6. Graceful Shutdown

// Scenario: When you deploy a new version of your application, you need to stop the old server. 
// You want to ensure the server finishes processing any ongoing requests before it shuts down, 
// rather than abruptly cutting them off.
// Task: In your main server.js file, add a listener for the SIGINT signal 
// (which is sent when you press Ctrl+C). When this signal is received, the server should:
// Stop accepting new connections.
// Log a message like "Shutting down gracefully..."
// Wait for all existing connections to close before exiting the process (process.exit()).

const express=require('express');
const app=express();
const process=require('process');
const port1=3000;
app.get('/',(req,res)=>{
    res.send("Hello World");
});
const server=app.listen(port1,()=>{
    console.log(`Server is running on port ${port1}`);
})

process.on('SIGINT',()=>{
    console.log("Shutting down gracefully...");
    server.close(()=>{
        console.log("All connections closed. Exiting now.");
        process.exit(0);
    })
    // Forcefully exit after 10 seconds if connections don't close
    setTimeout(()=>{
        console.error("Forcing shutdown...");
        process.exit(1);
    },10000);
})

// To test this, run the server and then press Ctrl+C in the terminal.
// You should see the shutdown message, and the server should stop accepting new requests
// while allowing any ongoing requests to complete before the process exits.
// You can also simulate long-running requests to see how they are handled during shutdown.

// Example of a long-running request
app.get('/long',(req,res)=>{
    setTimeout(()=>{
        res.send("This was a long request");
    },5000);
});

// Now, if you access /long and then press Ctrl+C, 
// the server will wait for that request to finish before shutting down.



        
