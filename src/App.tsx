import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/layout/drawer";
import Header from "./components/layout/header";
import RightDrawer from "./components/layout/settingDrawer";
import AppRoutes from "./routes";

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [presetColor, setPresetColor] = useState("#5D87FF");

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: { main: presetColor },
      },
    }), [mode, presetColor]
  );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Box sx={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
          <RightDrawer
            mode={mode}
            setMode={setMode}
            presetColor={presetColor}
            setPresetColor={setPresetColor}
          />
          <Header />
          <Sidebar presetColor={presetColor} />
          <Box component="main" sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", mt: "64px", height: "calc(100vh - 64px)" }}>
            <Box sx={{ flex: 1, overflow: "auto", p: 3, bgcolor: "background.default" }}>
              <AppRoutes />
            </Box>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;