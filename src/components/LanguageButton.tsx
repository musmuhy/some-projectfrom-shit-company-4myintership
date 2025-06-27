import Button from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material/styles";
import { Language } from "../types/dataTypes";

interface LanguageButtonProps {
  language: Language;
  isActive: boolean;
  onClick: () => void;
  sx?: SxProps<Theme>;
}

export const LanguageButton = ({
  language,
  isActive,
  onClick,
  sx,
}: LanguageButtonProps) => (
  <Button
    variant={isActive ? "contained" : "outlined"}
    color="primary"
    onClick={onClick}
    sx={{
      minWidth: 60,
      marginRight: 2,
      marginBottom: 2,
      backgroundColor: isActive ? "#1976d2" : "inherit",
      "&:hover": {
        backgroundColor: isActive ? "#1565c0" : "#f5f5f5",
      },
      ...sx,
    }}
  >
    {language.code.startsWith("All") ? language.code : language.code}
  </Button>
);
