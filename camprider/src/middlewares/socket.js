// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";
let socket = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
      autoConnect: true,
    });
  }
  
  return socket;

};

export const getSocket = () => socket;

