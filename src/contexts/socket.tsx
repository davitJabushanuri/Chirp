"use client";
import { createContext, useContext, useState } from "react";
import { Socket, io } from "socket.io-client";

import { SOCKET_URL } from "@/config";
type SocketContextType = {
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
};

export const SocketContext = createContext<SocketContextType | null>(null);

type SocketProviderProps = {
  children: React.ReactNode;
};

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = () => {
    if (!socket) {
      const newSocket: Socket = io(SOCKET_URL, {
        autoConnect: false,
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 3000,
      });
      setSocket(newSocket);
      return;
    }
    socket.connect();
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        connectSocket,
        disconnectSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
