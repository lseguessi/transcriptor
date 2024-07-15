import { IAuthRequest } from "@/lib/types/request/Auth";
import api from "./api"
import { UnauthorizedError } from "./exceptions/UnauthorizedError";
import { AxiosResponse } from "axios";
import { RequestError } from "./exceptions/RequestError";
import { ISyncResponse } from "@/lib/types/response/ISyncResponse";

export const syncProcess = async ():
    Promise<AxiosResponse<ISyncResponse[] | null | undefined>> => {

    try {
        const localToken = localStorage.getItem('accessToken')
        const header = {
            headers: {
                'Authorization': `Bearer ${localToken}`
            }
        }
        const response = await api.get('/sync_process', localToken !== null && localToken !== "" ? header : {});
        return response;
    } catch (e: Error | any) {
        switch (e?.response?.status) {
            case 400: throw new RequestError(e?.response?.data?.mensagem, 400);
            case 500: throw new RequestError(e?.response?.data?.mensagem, 500);
            // case 401: throw new UnauthorizedError(e?.response?.data?.mensagem, 401)
            default: throw new RequestError(e?.response?.data?.mensagem, e?.response?.status);
        }
    }
}