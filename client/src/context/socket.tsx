import React, { createContext, PropsWithChildren, useEffect } from "react";
import socketio, { Socket } from "socket.io-client";

const socket = socketio(process.env.REACT_APP_SOCKET_URL);

export const SocketContext = createContext<Socket>({} as Socket);

export function SocketProvider({ children }: PropsWithChildren) {
  useEffect(() => () => {
    socket.disconnect();
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
