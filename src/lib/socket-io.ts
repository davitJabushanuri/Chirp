import { io } from "socket.io-client";

import { SOCKET_URL } from "@/config";

const URL = SOCKET_URL;

export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

socket.on("connect_error", (error) => {
  console.log(`Connection Error: ${error.message}`);
});
