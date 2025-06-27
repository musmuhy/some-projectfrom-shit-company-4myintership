import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Task } from "../../types/kanbanTypes";
import React, { useState } from "react";

interface TaskCardProps {
  task: Task;
  onEdit: (newTitle: string) => void;
  onDelete: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleEditClick = () => {
    setIsEditing(true);
    handleClose();
  };

  const handleSave = () => {
    onEdit(newTitle);
    setIsEditing(false);
  };

  return (
    <Card sx={{ mb: 2, position: "relative" }}>
      <CardContent>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              size="small"
              sx={{ mb: 1 }}
            />
            <Button onClick={handleSave} size="small" variant="contained">
              Save
            </Button>
          </>
        ) : (
          <>
            <Typography variant="subtitle1">{task.title}</Typography>
            
            {task.image && (
              <img src={task.image} alt="" style={{ width: "100%", marginTop: 8 }} />
            )}
            <IconButton onClick={handleOpen} sx={{ position: "absolute", top: 8, right: 8 }}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleEditClick}>Edit</MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  onDelete();
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </>
        )}
      </CardContent>
    </Card>
  );
};