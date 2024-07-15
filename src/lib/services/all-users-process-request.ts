import api from "./api"
import { UnauthorizedError } from "./exceptions/UnauthorizedError";
import { AxiosResponse } from "axios";
import { RequestError } from "./exceptions/RequestError";
import { IDetailTranscriptsRequest } from "@/lib/types/request/IDetailTranscriptsRequest";
export const getUserProcess = async ({ process_number }: IDetailTranscriptsRequest):
    Promise<AxiosResponse<IUserResponse[] | null | undefined>> => {
    try {
        const response = await api.get('/process_users?process_number=' + process_number);
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