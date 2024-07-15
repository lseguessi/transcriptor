export interface IDetailTranscriptsResponse {
    process: IProcess[];
    documents: IDocument[];
    transcripts: ITranscript[];
}

export interface IProcess {
    processNumber: string;
    reportDate: string;
    summary: string;
    questionAnswers: string;
    rowId: string;
    deleted: boolean;
}

export interface IDocument {
    processNumber: string;
    documentURI: string;
    documentName: string;
    documentExtension: string;
    documentOCR: string;
    summary: string;
    documentOCRTime: number;
}

export interface ITranscript {
    processNumber: string;
    transcriptID: string;
    title: string;
    url: string;
    transcript: string;
    summary: string;
    topics: string;
    keywords: string;
    sentimentAnalysis: string;
    url_externo: string;
    urlSigned: string;
    googleDriveID?: string;
}

