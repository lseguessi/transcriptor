import { getAllProcess } from "@/lib/services/all-process-request";
import { RequestError } from "@/lib/services/exceptions/RequestError";
import { UnauthorizedError } from "@/lib/services/exceptions/UnauthorizedError";
import { ITranscriptListResponse } from "@/lib/types/response/ITranscriptsListResponse";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { IAllProcessRequest } from "../types/request/IAllProcessRequest";

type ResponseHook = {
    transcripts: ITranscriptListResponse[] | null | undefined
} | null;

export const useProccesstHook = () => {
    const router = useSearchParams()

    const [msgError, setMsgError] = useState<string | null>(null);
    const [response, setResponse] = useState<ResponseHook>(null);


    const makeRequest = async () => {
        setMsgError(null)
        try {
            const processNum = router.get("processNumber") ? { process_number: router.get("processNumber") } : {};
            const request = await getAllProcess(processNum as IAllProcessRequest);
            if (request) {
                setResponse({
                    transcripts: request.data
                })
            }
        } catch (error: UnauthorizedError | RequestError | any) {
            setMsgError(error.message)
        }
    }

    return {
        msgError,
        response,
        makeRequest
    }
}