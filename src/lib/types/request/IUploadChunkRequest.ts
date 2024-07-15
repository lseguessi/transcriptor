export interface IUploadChunkRequest {
    file: File
    process_number: string | null;
    chuck_number: number;
    filename: string;
    mimeType: string;
}
export interface FileObject {
    data?: string;
    file: File
}