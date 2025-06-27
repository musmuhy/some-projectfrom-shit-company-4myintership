import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { User } from "../../types/chatTypes";

interface ProfilePanelProps {
  user: User;
}

export default function ProfilePanel({ user }: ProfilePanelProps) {
  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Avatar sx={{ width: 80, height: 80, mb: 2 }} />
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {user.role}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Information
      </Typography>
      <Typography variant="body2" paragraph>
        Address: {"Nightmare on Elm Street"}
      </Typography>
      <Typography variant="body2" paragraph>
        Email: {user.email}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Attachment
      </Typography>
      <List>
        {["ProjectPlan.pdf", "DesignSpec.png"].map((file, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={file}
              secondary={new Date().toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}