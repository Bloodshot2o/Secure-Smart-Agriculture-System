// socket.js
import { io } from "socket.io-client";


const socket = io("http://localhost:5000", {
  autoConnect: false,
  auth: {
    token: localStorage.getItem("token"),
  },
});

export default socket;
