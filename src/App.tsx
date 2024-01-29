import { useState, useEffect, useMemo } from "react";
import { Button } from "./components/ui/button";
import { io } from "socket.io-client";



function App() {

  const [message, setMessage] = useState("");
  const [socketId, setSocketId] = useState<string | undefined>("");
  const [roomId , setRoomId] = useState("");

  // 
  const socket = useMemo(() => {
    return io("http://localhost:8000");
  }, [])





  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id)
      console.log("user connected with id :", socket.id);
    });

    socket.on("recieve-message", (data) => {
      console.log(data);
    })

    return () => {
      socket.disconnect();
    }
  }, [])


  const onSubmit = (e: any) => {
    e.preventDefault();
    socket.emit('send-message', {message , roomId})
  }

  const handleJoin = () => {

  }

  return (
    <div className="h-full">

      <nav className="flex justify-between mx-10 items-center p-4" >
        <h2 className="text-2xl font-serif" > chatX</h2>

        <Button
          onClick={handleJoin}
          className="bg-black" >
          Join
        </Button>
      </nav>



      <main>
        <div className="" >
          <form onSubmit={onSubmit} action="" className="" >
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-4xl font-mono flex justify-center" > Let's Chat </h1>
              <input
                value={message}
                className="border-2 w-2/3 m-2 border-black px-4 py-2 rounded-lg"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter Message"
                type="text" />

              <input
                value={roomId}
                className="border-2 w-2/3 m-2 border-black px-4 py-2 rounded-lg"
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter Room Id"
                type="text" />
              <button
                type="submit"
                className="border-2 w-1/3 m-4 border-black px-4 py-2 rounded-xl hover:bg-black hover:text-white" >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </main>

      <div className="w-full mx-4 flex justify-center items-center bg-black text-white">
        My Room Id :
        {
          socketId
        }

      </div>


    </div>
  )
}

export default App
