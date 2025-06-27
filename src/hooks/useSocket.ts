import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:8080";

export function useSocket(userId: string) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("register", userId);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const sendMessage = (toUserId: string, message: string, fromUserId: string) => {
    socketRef.current?.emit("send_message", { toUserId, message, fromUserId });
  };

  const onMessage = (callback: (data: { from: string; to: string; message: string }) => void) => {
    socketRef.current?.off("receive_message");
    socketRef.current?.on("receive_message", callback);
  };

  return { sendMessage, onMessage };
}