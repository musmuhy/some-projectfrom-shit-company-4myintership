import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // or your navigation method

interface LogoProps {
  collapsed?: boolean; // if you need a collapsed state for sidebar
}

export const Logo = ({ collapsed = false }: LogoProps) => {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        gap: 1, // spacing between icon and text
      }}
    >
      {/* Logo icon - replace with your actual icon component or SVG */}
      <Box
        sx={{
          width: 40,
          height: 40,
          bgcolor: "primary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 1, // slight rounding
          color: "primary.contrastText",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Your SVG path here */}
          <path
            d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 7L12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 12L22 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>

      {/* Logo text - only shown when not collapsed */}
      {!collapsed && (
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "text.primary",
          }}
        >
          DASHBOARD
        </Typography>
      )}
    </Box>
  );
};