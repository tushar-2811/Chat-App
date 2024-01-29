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
    console.log(`user connected, id : ${socket.id}`);  

    socket.on("send-message" , (data) => {
        console.log(data);
        socket.to(data.roomId).emit("recieve-message",`recieved message from ${socket.id} -> ${data.message}`);
    })


    socket.on("disconnect" , () => {
        console.log(`user disconnected : ${socket.id}`)
    })
   
})



server.listen(port , () => {
    console.log(`The server is up on port ${port}`);
})