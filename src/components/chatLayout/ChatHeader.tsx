import { AppBar, Toolbar, Typography } from "@mui/material";

export default function ChatHeader( ) {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1}}>
          Chat App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}