
export interface LbData {
    name: string;
    languages: Language[];
}
export interface Language {
    code: string;
    name: string;
}

export interface AllDataResponse {
    Lb: LbData[];
    styles: StyleData[];
}

export interface StyleLanguage {
    code: string;
    name: string;
    texts: TextItem[];
}

export interface StyleData {
    code: string;
    name: string;
    languages: StyleLanguage[];
}

export interface TextItem {
    label: string;
    value: string;
}



