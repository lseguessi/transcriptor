import api from "./api"
import { UnauthorizedError } from "./exceptions/UnauthorizedError";
import { AxiosResponse } from "axios";
import { RequestError } from "./exceptions/RequestError";
import { IAllTranscriptsResponse } from "@/lib/types/response/IAllTranscriptsResponse";
import { IDetailTranscriptsRequest } from "../types/request/IDetailTranscriptsRequest";

export const getAllTranscripts = async ({ process_number }: IDetailTranscriptsRequest):
    Promise<AxiosResponse<IAllTranscriptsResponse[] | null | undefined>> => {

    try {
        const response = await api.get('/transcripts?process_number=' + process_number);
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