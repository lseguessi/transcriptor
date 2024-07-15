import { getDetailTranscripts } from "@/lib/services/detail-process-request";
import { RequestError } from "@/lib/services/exceptions/RequestError";
import { UnauthorizedError } from "@/lib/services/exceptions/UnauthorizedError";
import { useRouter } from "next/router";
import { useAppStore } from "../store/appStore";
import { getGenericErrorMsg } from "@/lib/utils";
import { getUserProcess } from "../services/all-users-process-request";
import { IUserPermissionsProcess } from "../types/IUserPermissionsProcess";

export const useDetailProccessHook = () => {
    const router = useRouter()
    const { setIsLoading, setCurrentProccess, setErrorMsg, setUSerPermission } = useAppStore();

    const clearState = () => {
        setCurrentProccess(null)
        setIsLoading(true)
        setErrorMsg(null)
    }

    const makeRequest = async () => {
        clearState();
        try {
            const slug = router.query.id as string;
            const request = await getDetailTranscripts({ process_number: slug || "" });
            const requestUserPerm = await getUserProcess({ process_number: slug || "" });

            if (request && requestUserPerm) {
                setCurrentProccess(request.data)
                setUSerPermission({
                    processNumber: slug,
                    userPermissions: requestUserPerm.data || null
                } as IUserPermissionsProcess)

            } else {
                setErrorMsg(getGenericErrorMsg())
            }
            setIsLoading(false)
        } catch (error: UnauthorizedError | RequestError | any) {
            setIsLoading(false)
            setErrorMsg(error.message)
        }
    }

    return {
        makeRequest
    }
}