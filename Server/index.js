const express = require("express");
const app = express();

const https = require("https"); //for socket.io
const {Server} = require("socket.io");

const cors = require("cors");
app.use(cors);

const server = https.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});

server.listen(3001, () => { console.log("server running"); });


