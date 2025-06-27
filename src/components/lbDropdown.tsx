import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { MouseEvent, useState } from "react";

interface LbDropdownProps {
  availableLBs: string[];
  selectedLB: string | null;
  onLBSelect: (lbName: string) => void;
}

const LbDropdown = ({
  availableLBs,
  selectedLB,
  onLBSelect,
}: LbDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLBSelect = (lbName: string) => {
    onLBSelect(lbName);
    handleClose();
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Button
        variant="outlined"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          color: "text.primary",
          borderColor: "divider",
          "&:hover": {
            backgroundColor: "action.hover",
            borderColor: "text.primary",
          },
          minWidth: 120,
          fontWeight: "normal",
          textTransform: "none",
        }}
        disabled={availableLBs.length === 0}
      >
        {selectedLB || "Select LB"}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{ style: { maxHeight: "50vh", overflow: "auto" } }}
      >
        {availableLBs.map((lb) => (
          <MenuItem
            key={lb}
            onClick={() => handleLBSelect(lb)}
            selected={Boolean(selectedLB) && lb === selectedLB}
            sx={{
              fontWeight: selectedLB && lb === selectedLB ? "600" : "normal",
              backgroundColor:
                selectedLB && lb === selectedLB
                  ? "action.selected"
                  : "transparent",
            }}
          >
            <Typography variant="body1">{lb}</Typography>
            {selectedLB && lb === selectedLB && (
              <CheckIcon color="primary" sx={{ ml: 1, fontSize: 18 }} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LbDropdown;
