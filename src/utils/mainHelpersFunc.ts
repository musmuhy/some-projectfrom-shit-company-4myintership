import { AllDataResponse, Language, StyleData } from '../types/dataTypes';

export const getAvailableLBs = (data: AllDataResponse): string[] => {
    return data.Lb.map(lb => lb.name);
};

export const getLanguagesForLB = (data: AllDataResponse, lbName: string): Language[] => {
    const lb = data.Lb.find(lb => lb.name === lbName);
    return lb?.languages || [];
};

export const filterStylesByLB = (data: AllDataResponse, lbName: string): StyleData[] => {
    const lbLanguages = getLanguagesForLB(data, lbName);
    const languageCodes = lbLanguages.map(lang => lang.code);

    return data.styles
        .map(style => ({
            ...style,
            languages: style.languages.filter(lang => languageCodes.includes(lang.code))
        }))
        .filter(style => style.languages.length > 0);
};


export const getDefaultLanguageForApp = (data: AllDataResponse): string => {

    const lb1 = data.Lb.find(lb => lb.name === 'lb1');
    const deLanguage = lb1?.languages.find(lang => lang.code === 'DE');
    if (deLanguage) return 'DE';


    if (lb1?.languages.length) return lb1.languages[0].code;


    return 'DE';
};

export const getDefaultLanguageForLB = (data: AllDataResponse, lbName: string): string => {
    const languages = getLanguagesForLB(data, lbName);
    return languages[0]?.code || 'DE';
};


export const getAllLabelsForLanguage = (styles: StyleData[], languageCode: string): string[] => {
    const labels = new Set<string>();
    styles.forEach(style => {
        const language = style.languages.find(lang => lang.code === languageCode);
        language?.texts.forEach(text => {
            labels.add(text.label);
        });
    });
    return Array.from(labels);
};

export const getValueForLabelStyleLanguage = (
    styles: StyleData[],
    label: string,
    styleCode: string,
    languageCode: string
): string => {
    const style = styles.find(s => s.code === styleCode);
    if (!style) return '';

    const language = style.languages.find(lang => lang.code === languageCode);
    if (!language) return '';

    const text = language.texts.find(t => t.label === label);
    return text ? text.value : '';
};

export const getLanguageTables = (
    styles: StyleData[],
    languages: Language[],
    selectedLB?: string | null
) => {
    return languages.map(language => {

        const labels = getAllLabelsForLanguage(styles, language.code);


        const validStyleCodes = styles
            .filter(style => style.languages.some(lang => lang.code === language.code))
            .map(style => style.code);

        return {
            language,
            labels,
            styleCodes: validStyleCodes,
            lbContext: selectedLB
        };
    });
};
export const getActiveLanguages = (
    allLanguages: Language[],
    activeLanguage: string | null
): Language[] => {
    return activeLanguage
        ? allLanguages.filter(lang => lang.code === activeLanguage)
        : allLanguages;
};

export const getRelevantStyles = (
    styles: StyleData[],
    languageCodes: string[]
): StyleData[] => {
    return styles.map(style => ({
        ...style,
        languages: style.languages.filter(lang => languageCodes.includes(lang.code))
    })).filter(style => style.languages.length > 0);
};


