import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

type Props = {
  title: string;
  onChange: (newTitle: string) => void;
};

const EditableHeader = ({ title, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (value !== title) {
      onChange(value);
    }
  };

  return (
    <Box display="flex" alignItems="center" width="100%">
      {isEditing ? (
        <TextField
          variant="standard"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              (e.target as HTMLInputElement).blur(); // Trigger blur to save
            }
          }}
          autoFocus
        />
      ) : (
        <>
          <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton onClick={handleMenuOpen} size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleEditClick}>Edit</MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
};

export default EditableHeader;