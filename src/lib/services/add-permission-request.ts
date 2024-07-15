import api from "./api"
import { AxiosResponse } from "axios";

import { UnauthorizedError } from "./exceptions/UnauthorizedError";
import { RequestError } from "./exceptions/RequestError";
import { IAddPermissionResponse } from "../types/response/IAddPermissionResponse";
import { IUserPermissionsProcess } from "../types/IUserPermissionsProcess";
export const addPermission = async ({ processNumber, userPermissions }: IUserPermissionsProcess):
    Promise<AxiosResponse<IAddPermissionResponse | null | undefined>> => {
    try {
        const response = await api.post('/process_users?process_number=' + processNumber, userPermissions)
        return response.data;
    } catch (e: Error | any) {
        if (e.message === "Network Error") {
            throw new RequestError("Houve um problema com sua requisição. Talvez o tamanho do(s) arquivo(s) sejam muito grandes", 413)
        }
        switch (e?.response?.status) {
            case 400: throw new RequestError(e?.response?.data?.mensagem, 400);
            case 500: throw new RequestError(e?.response?.data?.mensagem, 500);
            case 401: throw new UnauthorizedError(e?.response?.data?.mensagem, 401)
            case 413: throw new RequestError("Arquivos muito grande para processar.", 413)

            default: throw new RequestError(e?.response?.data?.mensagem, e?.response?.status);
        }
    }
}