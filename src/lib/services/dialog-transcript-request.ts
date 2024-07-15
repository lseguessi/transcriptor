import api from "./api"
import { UnauthorizedError } from "./exceptions/UnauthorizedError";
import { AxiosResponse } from "axios";
import { RequestError } from "./exceptions/RequestError";
import { IDialogTranscriptRequest } from "@/lib/types/request/IDialogTranscriptRequest";
import { IDialogTranscriptResponse } from "@/lib/types/response/IDialogTranscriptResponse";
export const getDialogTranscript = async ({ transcript_id }: IDialogTranscriptRequest):
    Promise<AxiosResponse<IDialogTranscriptResponse[] | [] | null | undefined>> => {
    try {
        const response = await api.get('/dialog_transcriptions?transcript_id=' + transcript_id);
        return response;
    } catch (e: Error | any) {
        switch (e?.response?.status) {
            case 400: throw new RequestError(e?.response?.data?.mensagem, 400);
            case 500: throw new RequestError(e?.response?.data?.mensagem, 500);
            case 401: throw new UnauthorizedError(e?.response?.data?.mensagem, 401)
            default: throw new RequestError(e?.response?.data?.mensagem, e?.response?.status);
        }
    }
}