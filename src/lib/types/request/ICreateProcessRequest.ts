export interface ICreateProcessRequest {
    files: FileObject[] | File[] | any[] | null
    process_number?: string | null;
    gdrive_url?: string[] | null;
}
export interface FileObject {
    data?: string;
    file: File
}