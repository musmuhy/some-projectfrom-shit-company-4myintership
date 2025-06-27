import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { Message, User } from "../../types/chatTypes";
import { mockUsers } from "../../utils/chatMockData";

interface ChatMessagesProps {
  onMenuClick: () => void;
  onInfoClick: () => void;
  messages: Message[];
  currentUserId: string;
  selectedUserId?: string;
}

export default function ChatMessages({
  onMenuClick,
  onInfoClick,
  messages,
  currentUserId,
  selectedUserId,
}: ChatMessagesProps) {
  const getSender = (id: string): User | undefined => mockUsers.find((u) => u.id === id);

  const filteredMessages = messages.filter(
    (msg) =>
      (msg.senderId === currentUserId && msg.receiverId === selectedUserId) ||
      (msg.senderId === selectedUserId && msg.receiverId === currentUserId)
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredMessages]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <IconButton onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="subtitle1" sx={{ flexGrow: 1, ml: 2 }}>
          Current Conversation
        </Typography>
        <IconButton onClick={onInfoClick}>
          <InfoIcon />
        </IconButton>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        {filteredMessages.map((message) => {
          const sender = getSender(message.senderId);
          const isCurrentUser = message.senderId === currentUserId;

          return (
            <Box
              key={message.id}
              sx={{
                display: "flex",
                mb: 2,
                flexDirection: isCurrentUser ? "row-reverse" : "row",
              }}
            >
              <Avatar src={sender?.avatar} alt={sender?.name} sx={{ mx: 1 }} />
              <Box
                sx={{
                  maxWidth: "70%",
                  bgcolor: isCurrentUser ? "primary.main" : "grey.100",
                  color: isCurrentUser ? "primary.contrastText" : "text.primary",
                  p: 1.5,
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Typography variant="body1">{message.content}</Typography>
                <Typography
                  variant="caption"
                  display="block"
                  textAlign="right"
                  sx={{ opacity: 0.7 }}
                >
                  {message.timestamp}
                </Typography>
              </Box>
            </Box>
          );
        })}
        {/* 🔽 Scroll target */}
        <div ref={scrollRef} />
      </Box>
    </Box>
  );
}