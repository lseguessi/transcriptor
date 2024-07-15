import api from "./api"
import { UnauthorizedError } from "./exceptions/UnauthorizedError";
import { AxiosResponse } from "axios";
import { RequestError } from "./exceptions/RequestError";
import { ITranscriptListResponse } from "@/lib/types/response/ITranscriptsListResponse";
import { IAllProcessRequest } from "../types/request/IAllProcessRequest";

export const getAllProcess = async ({ process_number }: IAllProcessRequest = {}):
    Promise<AxiosResponse<ITranscriptListResponse[] | null | undefined>> => {
    try {
        const response = process_number ? await api.get('/filtered_processes?process_number=' + process_number) : await api.get('/process_data');
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