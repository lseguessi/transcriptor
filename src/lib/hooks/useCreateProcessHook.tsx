import { RequestError } from "@/lib/services/exceptions/RequestError";
import { UnauthorizedError } from "@/lib/services/exceptions/UnauthorizedError";
import { useAppStore } from "../store/appStore";
import { getGenericErrorMsg } from "@/lib/utils";
import { createProcess } from "../services/create-process-request";
import { ICreateProcessRequest } from "../types/request/ICreateProcessRequest";
import { useState } from "react";
import { useRouter } from "next/router";

export const useCreateProcess = () => {
    const router = useRouter();
    const { setErrorMsg, setIsUploading, setIsUploadCompleted, bodyUpload, setBodyUpload, setProgressUpload } = useAppStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const clearState = () => {
        setProgressUpload(0)
        setIsLoading(true)
        setErrorMsg(null)
    }

    const callbackProgressUp = (progress: number) => {
        // setProgressUpload(progress)
    }

    const makeRequest = async () => {
        console.log("sending", bodyUpload)

        clearState();
        try {
            // if (!bodyUpload?.files?.length || !bodyUpload.process_number || bodyUpload.process_number == "") {
            if (!bodyUpload?.process_number || bodyUpload?.process_number == "" || bodyUpload.gdrive_url == []!) {
                setIsLoading(false)
                setErrorMsg("Preencha os campos corretamente");
                return
            }

            const request: any = await createProcess(bodyUpload, callbackProgressUp);
            if (request?.processID) {
                setIsUploading(true)
                setIsUploadCompleted(false)
                setBodyUpload(null)
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