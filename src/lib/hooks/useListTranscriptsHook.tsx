import { RequestError } from "@/lib/services/exceptions/RequestError";
import { UnauthorizedError } from "@/lib/services/exceptions/UnauthorizedError";
import { useState } from "react";
import { getAllTranscripts } from "../services/all-transcripts-request";
import { IAllTranscriptsResponse } from "../types/response/IAllTranscriptsResponse";
import { getGenericErrorMsg } from "../utils";
import { useSearchParams } from "next/navigation";

type ResponseHook = {
    transcripts: IAllTranscriptsResponse[] | null | undefined
} | null;

export const useListTanscriptsHook = () => {
    const searchParams = useSearchParams()

    const [msgError, setMsgError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [response, setResponse] = useState<ResponseHook>(null);
    const clearState = () => {
        setResponse(null)
        setIsLoading(true)
        setMsgError(null)
    }


    const makeRequest = async () => {

        clearState()
        try {
            const slugProc = searchParams.get('processN')
            const request = await getAllTranscripts({ process_number: slugProc || "" });
            if (request) {
                setResponse({
                    transcripts: request.data
                })
            } else {
                setMsgError(getGenericErrorMsg())
            }
            setIsLoading(false)
        } catch (error: UnauthorizedError | RequestError | any) {
            setMsgError(error.message);
            setIsLoading(false);
        }
    }

    return {
        msgError,
        response,
        isLoading,
        makeRequest
    }
}