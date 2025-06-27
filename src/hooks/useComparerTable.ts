import { useState } from "react";
import { StyleData } from "../types/dataTypes.ts";
import {
    getAvailableLanguages,
    getDefaultLanguage,
    getLanguageTables,
} from "../utils/mainHelpersFunc.ts";

export const useComparerTable = (styles: StyleData[]) => {
    const [activeLanguage, setActiveLanguage] = useState<string | null>("DE");

    const availableLanguages = getAvailableLanguages(styles);
    const defaultLanguage = getDefaultLanguage(availableLanguages);
    const languageTables = getLanguageTables(styles, availableLanguages);

    const handleLanguageToggle = (code: string) => {
        setActiveLanguage(activeLanguage === code ? null : code);
    };

    return {
        activeLanguage,
        availableLanguages,
        languageTables,
        handleLanguageToggle,
        defaultLanguage
    };
};
