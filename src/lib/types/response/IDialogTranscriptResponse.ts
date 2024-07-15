export interface ITranscriptDate {
    value: string;
}

export interface IDialogTranscriptResponse {
    transcriptID: string;
    sequence: number;
    start: number;
    end: number;
    speaker: string;
    text: string;
    transcriptDate: ITranscriptDate;
    urlSigned: string;
    googleDriveID?: string;
}