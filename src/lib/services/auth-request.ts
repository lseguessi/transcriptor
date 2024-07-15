import { IAuthRequest } from "@/lib/types/request/Auth";
import api from "./api"
import { UnauthorizedError } from "./exceptions/UnauthorizedError";
export const authLogin = async (body: IAuthRequest) => {
    try {
        return await api.post('/auth', body);
    } catch (e: Error | any) {
        console.error(e)
        throw new UnauthorizedError(e?.response?.data?.error, e?.response?.status);
    }
}