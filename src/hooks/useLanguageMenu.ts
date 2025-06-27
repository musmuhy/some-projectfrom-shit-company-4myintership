import { useState } from "react";

type Language = 'de' | 'en';

export const useLanguageMenu = (initialLanguage: Language = 'de') => {
    const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
    const [currentLanguage, setCurrentLanguage] = useState<Language>(initialLanguage);

    const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setLanguageAnchorEl(event.currentTarget);
    };

    const handleLanguageChange = (lang: Language) => {
        setCurrentLanguage(lang);
        handleMenuClose();

    };

    const handleMenuClose = () => {
        setLanguageAnchorEl(null);
    };

    return {
        languageAnchorEl,
        currentLanguage,
        handleLanguageMenuOpen,
        handleLanguageChange,
        handleMenuClose
    };
};