import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';





const app = express();
const port = 8000;
const server = createServer(app);

app.use(cors());

const io = new Server(server , {
    cors : {
        origin : "*",
        methods : ["GET" , "POST"],
        credentials : true
    }
});

app.get("/" , (req , res) => {
    console.log("hello world");
})

io.on("connection" , (socket) => {
    console.log("user connected");
    console.log("Id" , socket.id);
})



server.listen(port , () => {
    console.log(`The server is up on port ${port}`);
})