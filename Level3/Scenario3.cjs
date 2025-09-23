// 3. Basic WebSocket Chat Server

// Scenario: You are building a live chat feature for a support application.
// Task: Using the ws library (or Socket.io), create a simple WebSocket server. The server should:

// Keep track of all connected clients.

// When a client sends a message, the server should broadcast that message to every other connected 
// client.

// When a client disconnects, log a message to the console.

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    console.log("New client connected");

    ws.on("message", (message) => {
        console.log(`Received message: ${message}`);
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => {
        clients.delete(ws);
        console.log("Client disconnected");
    });
});

console.log("WebSocket server is running on ws://localhost:8080");
//now use the given websocket server in the client side to test it.