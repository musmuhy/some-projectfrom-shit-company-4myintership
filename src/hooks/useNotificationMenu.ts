import { useState } from "react";

export const useNotificationMenu = () => {
    const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
    const [unreadCount, setUnreadCount] = useState(4);

    const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleMarkAllAsRead = () => {
        setUnreadCount(0);
        handleMenuClose();
    };

    const handleMenuClose = () => {
        setNotificationAnchorEl(null);
    };

    return {
        notificationAnchorEl,
        unreadCount,
        handleNotificationMenuOpen,
        handleMarkAllAsRead,
        handleMenuClose
    };
};