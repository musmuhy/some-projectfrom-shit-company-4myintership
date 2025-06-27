import ChatIcon from "@mui/icons-material/Chat";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "../../assets/icons/Lidl-Logo.png";

import { useLanguageMenu } from "../../hooks/useLanguageMenu";
import { useNotificationMenu } from "../../hooks/useNotificationMenu";

export default function Header() {
  const {
    notificationAnchorEl,
    unreadCount,
    handleNotificationMenuOpen,
    handleMarkAllAsRead,
    handleMenuClose: handleNotificationMenuClose,
  } = useNotificationMenu();

  const {
    languageAnchorEl,

    handleMenuClose: handleLanguageMenuClose,
  } = useLanguageMenu();

  const handleMenuClose = () => {
    handleNotificationMenuClose();
    handleLanguageMenuClose();
  };

  const notificationMenuItems = [
    { icon: <ChatIcon fontSize="small" />, text: "Notification from Chat" },
    {
      icon: <DashboardIcon fontSize="small" />,
      text: "Notification from Boards",
    },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={(theme) => ({
        width: "100%",
        backdropFilter: "blur(10px)",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(0, 0, 0, 0.5)"
            : "rgba(255, 255, 255, 0.7)",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 2px 8px rgba(255, 255, 255, 0.1)"
            : "0 2px 8px rgba(0, 0, 0, 0.1)",
        borderBottom:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.05)",
        zIndex: 100,
      })}
    >
      <Toolbar sx={{ px: 3, minHeight: "64px !important" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            mr: 2,
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "text.primary",
            textDecoration: "none",
          }}
        >
          <img src={logo} alt="Logo" style={{ height: 32, marginRight: 16 }} />
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Menu
            anchorEl={languageAnchorEl}
            open={Boolean(languageAnchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                mt: 1.5,
                minWidth: 150,
              },
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <img />
              </ListItemIcon>
              <ListItemText>{}</ListItemText>
            </MenuItem>
          </Menu>

          <IconButton
            size="large"
            aria-label="show notifications"
            onClick={handleNotificationMenuOpen}
            sx={{ color: "text.primary" }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsActiveOutlinedIcon />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                mt: 1.5,
                minWidth: 300,
              },
            }}
          >
            <MenuItem
              onClick={handleMarkAllAsRead}
              sx={{ justifyContent: "space-between" }}
            >
              <Typography variant="body2" color="text.secondary">
                Mark all as read
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {unreadCount} new
              </Typography>
            </MenuItem>
            <Divider />

            {notificationMenuItems.map((item, index) => (
              <MenuItem key={index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
