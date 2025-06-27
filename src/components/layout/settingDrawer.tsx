import { keyframes } from "@emotion/react";
import {
  Box,
  Drawer,
  IconButton,
  Slider,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import ContrastIcon from "@mui/icons-material/Contrast";
import Crop75Icon from "@mui/icons-material/Crop75";
import CropPortraitIcon from "@mui/icons-material/CropPortrait";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsIcon from "@mui/icons-material/Settings";

type Props = {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
};

export default function RightDrawer({ mode, setMode }: Props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [contrastMode, setContrastMode] = useState(false);
  const [themeWidth, setThemeWidth] = useState("boxed");
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedFont, setSelectedFont] = useState(0);
  const [fontSize, setFontSize] = useState(15);

  const isDark = mode === "dark";

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `;

  const fonts = ["Public Sans", "Inter", "DM Sans", "Nunito Sans"];
  const presetColors = [
    "#a991f7",
    "#607d8b",
    "#2f3c7e",
    "#3b8067",
    "#ba7539",
    "#1f2e2c",
    "#5e60ce",
  ];

  return (
    <>
      <SettingsIcon
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          top: "20%",
          right: 25,
          transform: "translateY(-50%)",
          backgroundColor: "#1976d2",
          color: "white",
          borderRadius: "50%",
          boxShadow: 3,
          p: 1,
          fontSize: 40,
          zIndex: 1500,
          animation: `${spin} 3.2s linear infinite`,
          cursor: "pointer",
          display: open ? "none" : "block",
        }}
      />

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          zIndex: 1500,
          "& .MuiDrawer-paper": {
            zIndex: 1500,
            marginTop: 0,
            height: "100%",
            width: 300,
            overflowY: "auto",
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderLeft: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <Box
          sx={{
            width: 300,
            height: "100%",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Header */}
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" fontWeight="bold">
              Theme Settings
            </Typography>
            <Box>
              <IconButton
                size="small"
                onClick={() => {
                  setMode("light");
                  setThemeWidth("boxed");
                  setSelectedColor(0);
                  setSelectedFont(0);
                  setFontSize(15);
                  setContrastMode(false);
                }}
              >
                <RestartAltIcon sx={{ color: theme.palette.text.secondary }} />
              </IconButton>
              <IconButton size="small" onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Dark Mode Toggle */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <DarkModeIcon />
              <Typography fontWeight={500}>Dark mode</Typography>
            </Box>
            <Switch
              checked={isDark}
              onChange={() => setMode(isDark ? "light" : "dark")}
            />
          </Box>

          {/* Theme Width & Contrast */}
          <Box display="flex" gap={1}>
            <Box
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Typography fontWeight={500} mb={1}>
                Theme width
              </Typography>
              <Box display="flex" gap={1}>
                <IconButton
                  onClick={() => setThemeWidth("boxed")}
                  sx={{
                    border:
                      themeWidth === "boxed"
                        ? `2px solid ${theme.palette.primary.main}`
                        : `1px solid ${theme.palette.divider}`,
                    backgroundColor:
                      themeWidth === "boxed"
                        ? theme.palette.action.hover
                        : "transparent",
                    borderRadius: 1,
                  }}
                >
                  <Crop75Icon />
                </IconButton>
                <IconButton
                  onClick={() => setThemeWidth("full")}
                  sx={{
                    border:
                      themeWidth === "full"
                        ? `2px solid ${theme.palette.primary.main}`
                        : `1px solid ${theme.palette.divider}`,
                    backgroundColor:
                      themeWidth === "full"
                        ? theme.palette.action.hover
                        : "transparent",
                    borderRadius: 1,
                  }}
                >
                  <CropPortraitIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Contrast */}
            <Box
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <ContrastIcon />
                <Switch
                  checked={contrastMode}
                  onChange={() => setContrastMode(!contrastMode)}
                />
              </Box>
              <Typography fontWeight={500}>Contrast</Typography>
            </Box>
          </Box>

          {/* Preset Colors */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Typography fontWeight={500} mb={1}>
              Preset Color
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {presetColors.map((color, idx) => (
                <Box
                  key={idx}
                  onClick={() => setSelectedColor(idx)}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: color,
                    border: selectedColor === idx ? "3px solid white" : "none",
                    outline:
                      selectedColor === idx
                        ? `2px solid ${theme.palette.primary.main}`
                        : `1px solid ${theme.palette.divider}`,
                    cursor: "pointer",
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Font Settings */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Typography
              fontWeight={700}
              sx={{
                fontSize: 12,
                textTransform: "uppercase",
                mb: 2,
                px: 1,
                py: 0.5,
                backgroundColor: "#000",
                color: "#fff",
                width: "fit-content",
                borderRadius: 1,
              }}
            >
              Font
            </Typography>

            <Typography fontWeight={500} mb={1}>
              Family
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {fonts.map((font, index) => (
                <Box
                  key={font}
                  onClick={() => setSelectedFont(index)}
                  sx={{
                    width: "calc(50% - 8px)",
                    p: 2,
                    borderRadius: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor:
                      selectedFont === index
                        ? theme.palette.action.selected
                        : theme.palette.background.default,
                    border:
                      selectedFont === index
                        ? `2px solid ${theme.palette.warning.main}`
                        : `1px solid ${theme.palette.divider}`,
                    fontFamily: font,
                  }}
                >
                  <Typography
                    fontWeight={700}
                    fontSize={18}
                    color={
                      selectedFont === index
                        ? theme.palette.warning.main
                        : theme.palette.text.secondary
                    }
                  >
                    Aa
                  </Typography>
                  <Typography fontWeight={500} fontSize={13}>
                    {font}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box mt={3}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={0.5}
                  sx={{ cursor: "pointer" }}
                  onClick={() => setFontSize(14)}
                >
                  <RestartAltIcon sx={{ fontSize: 16 }} />
                  <Typography fontWeight={600}>Size</Typography>
                </Box>
              </Box>

              <Slider
                value={fontSize}
                onChange={(_, value) => setFontSize(value as number)}
                min={12}
                max={22}
                step={1}
                valueLabelDisplay="auto"
                aria-label="Font Size"
                sx={{
                  mt: 1,
                  "& .MuiSlider-thumb": {
                    width: 16,
                    height: 16,
                  },
                  "& .MuiSlider-track": {
                    background: "linear-gradient(to right, #f6c342, #d98b00)",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}