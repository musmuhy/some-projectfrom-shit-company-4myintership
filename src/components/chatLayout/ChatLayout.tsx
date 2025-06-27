import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProfilePanel from "./ProfilePanel";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import ChatSidebar from "./ChatSidebar";
import { User, Message } from "../../types/chatTypes";
import { mockUsers } from "../../utils/chatMockData";
import { v4 as uuidv4 } from "uuid";
import { useSocket } from "../../hooks/useSocket";

export default function ChatLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user") || "1";

  const [users] = useState<User[]>(mockUsers);
  const currentUser = useMemo(() => users.find((u) => u.id === userId) || users[0], [userId, users]);
  const otherUsers = useMemo(() => users.filter((u) => u.id !== currentUser.id), [users, currentUser.id]);

  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const { sendMessage, onMessage } = useSocket(currentUser.id);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
      setProfileOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (otherUsers.length === 1) {
      setSelectedUser(otherUsers[0]);
    }
  }, [otherUsers]);

  useEffect(() => {
    onMessage(({ from, to, message }) => {
      const newMessage: Message = {
        id: uuidv4(),
        senderId: from,
        receiverId: to,
        content: message,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => {
        if (prev.find((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      });

      if (!selectedUser || selectedUser.id !== from) {
        const senderUser = users.find((u) => u.id === from);
        if (senderUser) {
          setSelectedUser(senderUser);
        }
      }
    });
  }, [onMessage, currentUser.id, selectedUser, users]);

  const handleSend = (text: string) => {
    if (!selectedUser || !selectedUser.id) return;

    const newMessage: Message = {
      id: uuidv4(),
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      content: text,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    sendMessage(selectedUser.id, text, currentUser.id);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", bgcolor: "background.default", p: 2 }}>
      <ChatHeader/>
      <Box sx={{ height: theme.spacing(2), bgcolor: "background.default" }} />
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden", bgcolor: "background.paper", boxShadow: 3, borderRadius: 2 }}>
        {sidebarOpen && (
          <>
            <Box sx={{ width: 300, overflow: "auto", borderRight: "1px solid", borderColor: "divider" }}>
              <ChatSidebar users={users} onSelectUser={setSelectedUser} currentUserId={currentUser.id} />
            </Box>
            <Box sx={{ width: theme.spacing(2), bgcolor: "background.default" }} />
          </>
        )}

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", borderColor: "divider" }}>
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            <ChatMessages
              messages={messages}
              currentUserId={currentUser.id}
              selectedUserId={selectedUser?.id}
              onMenuClick={() => setSidebarOpen(!sidebarOpen)}
              onInfoClick={() => setProfileOpen(!profileOpen)}
            />
          </Box>
          <ChatInput onSend={handleSend} />
        </Box>

        {profileOpen && selectedUser && (
          <>
            <Box sx={{ width: theme.spacing(2), bgcolor: "background.default" }} />
            <Box sx={{ width: 350, overflow: "auto", borderLeft: "1px solid", borderColor: "divider" }}>
              <ProfilePanel user={selectedUser} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}