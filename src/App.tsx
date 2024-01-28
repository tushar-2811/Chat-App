import { useEffect } from "react";
import { Button } from "./components/ui/button";
import { io } from "socket.io-client";


function App() {

  const socket = io("http://localhost:8000");

  useEffect(() => {
    socket.on("connect" , () => {
      console.log("connected" , socket.id);
    });
  },[])

  return (
   <div>
      <h1 className="text-green-500 text-2xl">Chat Application</h1>
      <Button> Click me </Button>
   </div>
  )
}

export default App
