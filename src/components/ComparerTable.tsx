import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useMemo, useState } from "react";
import { LanguageSelector } from "../components/LanguageSelector";
import { LanguageTable } from "../components/LanguageTable";
import LbDropdown from "../components/lbDropdown";
import { useFetchAllData } from "../hooks/useFetchAllData";
import {
  filterStylesByLB,
  getAvailableLBs,
  getDefaultLanguageForLB,
  getLanguagesForLB,
  getLanguageTables,
} from "../utils/mainHelpersFunc";

export const ComparerTable = () => {
  const { data, loading, error } = useFetchAllData();
  const [isInitialState, setIsInitialState] = useState(true);
  const [selectedLB, setSelectedLB] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const [fullscreenLang, setFullscreenLang] = useState<string | null>(null);

  const availableLBs = data ? getAvailableLBs(data) : [];
  const defaultLB = availableLBs[0] || null;

  const currentLB = isInitialState ? defaultLB : selectedLB;
  const languagesForLB = currentLB ? getLanguagesForLB(data!, currentLB) : [];
  const filteredStyles = currentLB ? filterStylesByLB(data!, currentLB) : [];

  useEffect(() => {
    if (data && isInitialState && defaultLB) {
      const defaultLanguage = getDefaultLanguageForLB(data, defaultLB);
      setActiveLanguage(defaultLanguage);
    }
  }, [data, isInitialState, defaultLB]);

  const handleLBSelect = (lbName: string) => {
    setSelectedLB(lbName);
    setIsInitialState(false);
    const defaultLanguage = getDefaultLanguageForLB(data!, lbName);
    setActiveLanguage(defaultLanguage);
  };

  const handleLanguageToggle = (languageCode: string | null) => {
    setActiveLanguage(languageCode);
  };

  const languageTables = useMemo(() => {
    if (!filteredStyles.length || !languagesForLB.length) return [];

    const languagesToShow = activeLanguage
      ? [languagesForLB.find((lang) => lang.code === activeLanguage)!]
      : languagesForLB;

    return getLanguageTables(filteredStyles, languagesToShow);
  }, [filteredStyles, languagesForLB, activeLanguage]);

  const currentIndex = languagesForLB.findIndex(
    (lang) => lang.code === fullscreenLang
  );

  const handleSwitchLanguage = (direction: "prev" | "next") => {
    const delta = direction === "prev" ? -1 : 1;
    const nextIndex =
      (currentIndex + delta + languagesForLB.length) % languagesForLB.length;
    setFullscreenLang(languagesForLB[nextIndex].code);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!data) return <Alert severity="info">No data found</Alert>;

  return (
    <Box sx={{ p: 3 }}>
      <LbDropdown
        availableLBs={availableLBs}
        selectedLB={isInitialState ? null : selectedLB}
        onLBSelect={handleLBSelect}
      />

      {!isInitialState && (
        <LanguageSelector
          languages={languagesForLB}
          activeLanguage={activeLanguage}
          onLanguageToggle={handleLanguageToggle}
        />
      )}

      {fullscreenLang
        ? languageTables
            .filter((table) => table.language.code === fullscreenLang)
            .map((table) => (
              <LanguageTable
                key={table.language.code}
                {...table}
                styles={filteredStyles}
                isFullscreen
                onExitFullscreen={() => setFullscreenLang(null)}
                onSwitchLanguage={handleSwitchLanguage}
              />
            ))
        : languageTables.map((table) => (
            <LanguageTable
              key={table.language.code}
              {...table}
              styles={filteredStyles}
              onEnterFullscreen={(code) => setFullscreenLang(code)}
            />
          ))}
    </Box>
  );
};
export default ComparerTable;
