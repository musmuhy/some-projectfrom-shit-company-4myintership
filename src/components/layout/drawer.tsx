import { ChatSharp, Menu, TableView } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;
const minimizedWidth = 72;

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setIsMinimized(!isMinimized);
  };

  const menuItems = [
    { text: "Comparer", icon: <TableView />, path: "/comparer" },
    { text: "ChatApp", icon: <ChatSharp />, path: "/chatapp" },
    { text: "KanbanBoard", icon: <TableView />, path: "/kanbanboard" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isMinimized ? minimizedWidth : drawerWidth,
        flexShrink: 0,
        zIndex: 1200, // Lower than header (1300)
        [`& .MuiDrawer-paper`]: {
          width: isMinimized ? minimizedWidth : drawerWidth,
          boxSizing: "border-box",
          top: "65px", // Height of header + divider
          zIndex: 1200, // Lower than header
          // ... rest of styles
        },
      }}
    >
      {/* Menu Toggle Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 1,
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <Tooltip title={isMinimized ? "Expand" : "Collapse"}>
          <IconButton onClick={toggleDrawer} size="small">
            <Menu fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Menu Items */}
      <List sx={{ p: 0 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Tooltip title={isMinimized ? item.text : ""} placement="right">
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname.includes(item.path)}
                sx={{
                  px: 3,
                  py: 1.5,
                  my: 0.5,
                  mx: 1,
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.08)",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "rgba(25, 118, 210, 0.16)",
                    "&:hover": {
                      backgroundColor: "rgba(25, 118, 210, 0.24)",
                    },
                  },
                  justifyContent: isMinimized ? "center" : "flex-start",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: isMinimized ? "auto" : "40px",
                    color: location.pathname.includes(item.path)
                      ? "primary.main"
                      : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isMinimized && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: location.pathname.includes(item.path)
                        ? "600"
                        : "400",
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
