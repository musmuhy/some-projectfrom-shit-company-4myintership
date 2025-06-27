import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import { User } from "../../types/chatTypes";

const statusOptions = [
  { label: "Available", color: "success" },
  { label: "Do not disturb", color: "error" },
  { label: "Offline", color: "secondary" },
];

interface ChatSidebarProps {
  users: User[];
  onSelectUser: (user: User) => void;
  currentUserId: string;
}

export default function ChatSidebar({
  users,
  onSelectUser,
  currentUserId,
}: ChatSidebarProps) {
  const theme = useTheme();
  const [status, setStatus] = useState(statusOptions[0]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleStatusChange = (newStatus: (typeof statusOptions)[0]) => {
    setStatus(newStatus);
    handleClose();
  };

  const currentUser = users.find((u) => u.id === currentUserId);
  const otherUsers = users.filter((u) => u.id !== currentUserId);

  // Auto-select the first available other user (ensures chat loads properly)
  useEffect(() => {
    if (otherUsers.length === 1) {
      onSelectUser(otherUsers[0]);
    }
  }, [otherUsers, onSelectUser]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      {/* Current User Panel */}
      <Box
        sx={{
          p: 1.8,
          borderBottom: `2px solid ${theme.palette.divider}`,
          bgcolor: "background.paper",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            color={status.color as any}
          >
            <Avatar alt={currentUser?.name || "Me"} />
          </Badge>
          <Box sx={{ ml: 2, flexGrow: 1 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {currentUser?.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="caption" color="text.secondary">
                {status.label}
              </Typography>
              <IconButton
                size="small"
                onClick={handleClick}
                sx={{ p: 0, ml: 0.5 }}
              >
                <ArrowDropDownIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          {statusOptions.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleStatusChange(option)}
              sx={{ minWidth: 60 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "80%",
                    bgcolor: `${option.color}.main`,
                    mr: 0.5,
                  }}
                />
                {option.label}
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Search Field */}
      <Box sx={{ p: 2, pb: 1.5 }}>
        <TextField
          fullWidth
          placeholder="Search users.."
          size="small"
          InputProps={{
            sx: {
              borderRadius: 4,
              bgcolor: "background.default",
              "&:before": { borderBottom: "none" },
            },
          }}
        />
      </Box>

      {/* List of Other Users */}
      <List
        sx={{
          flex: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.divider,
            borderRadius: "3px",
          },
        }}
      >
        {otherUsers.map((user) => (
          <div key={user.id}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ px: 2, py: 1.5 }}
                onClick={() => onSelectUser(user)}
              >
                <ListItemAvatar sx={{ minWidth: "48px" }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    color={user.online ? "success" : "default"}
                  >
                    <Avatar alt={user.name} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle2"
                      noWrap
                      sx={{
                        fontWeight: 600,
                        color: user.online ? "primary.main" : "text.primary",
                      }}
                    >
                      {user.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="caption"
                      noWrap
                      sx={{
                        display: "block",
                        color: "text.secondary",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.role}
                    </Typography>
                  }
                  sx={{ my: 0 }}
                />
              </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" sx={{ ml: "72px" }} />
          </div>
        ))}
      </List>
    </Box>
  );
}