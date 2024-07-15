import { RequestError } from "@/lib/services/exceptions/RequestError";
import { UnauthorizedError } from "@/lib/services/exceptions/UnauthorizedError";
import { useAppStore } from "../store/appStore";
import { getGenericErrorMsg } from "@/lib/utils";
import { createProcess } from "../services/create-process-request";
import { ICreateProcessRequest } from "../types/request/ICreateProcessRequest";
import { useState } from "react";
import { useRouter } from "next/router";
import { addPermission } from "../services/add-permission-request";

export const useAddPermissionHook = () => {
    const router = useRouter();
    const { setErrorMsg, usersProcessPermissions } = useAppStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const clearState = () => {
        setIsLoading(true)
        setErrorMsg(null)
    }



    const makeRequest = async () => {

        clearState();
        try {
            if (!usersProcessPermissions || usersProcessPermissions.userPermissions?.length == 0) {
                setIsLoading(false)
                setErrorMsg("Preencha os campos corretamente");
                return
            }

            const request = await addPermission(usersProcessPermissions);
            if (request) {
                setErrorMsg(null)
                router.reload()
            } else {
                setErrorMsg(getGenericErrorMsg())
            }
            setIsLoading(false)
        } catch (error: UnauthorizedError | RequestError | any) {
            console.log("erro", error)
            setIsLoading(false)
            setErrorMsg(error.message)
        }
    }

    return {
        isLoading,
        makeRequest
    }
}