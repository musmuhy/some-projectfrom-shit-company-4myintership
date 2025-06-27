import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Language } from "../types/dataTypes";
import { LanguageButton } from "./LanguageButton";

interface LanguageSelectorProps {
  languages: Language[];
  activeLanguage: string | null;
  onLanguageToggle: (code: string | null) => void;
}

export const LanguageSelector = ({
  languages,
  activeLanguage,
  onLanguageToggle,
}: LanguageSelectorProps) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h5" gutterBottom>
      
    </Typography>
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <LanguageButton
        key="all"
        language={{
          code: `All (${languages.length})`,
          name: `All ${languages.length} Languages`,
        }}
        isActive={activeLanguage === null}
        onClick={() => onLanguageToggle(null)}
        sx={{ mr: 2, mb: 2 }}
      />
      {languages.map((language) => (
        <LanguageButton
          key={language.code}
          language={language}
          isActive={activeLanguage === language.code}
          onClick={() => onLanguageToggle(language.code)}
          sx={{ mr: 2, mb: 2 }}
        />
      ))}
    </Box>
  </Box>
);
