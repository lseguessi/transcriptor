import { RequestError } from "@/lib/services/exceptions/RequestError";
import { UnauthorizedError } from "@/lib/services/exceptions/UnauthorizedError";
import { useState } from "react";
import { getAllTranscripts } from "../services/all-transcripts-request";
import { useRouter } from "next/router";
import { IAllTranscriptsResponse } from "../types/response/IAllTranscriptsResponse";
import { getGenericErrorMsg } from "../utils";
import { useAppStore } from "../store/appStore";
import { syncProcess } from "../services/sync-request";

type ResponseHook = {
    transcripts: IAllTranscriptsResponse[] | null | undefined
} | null;

export const useSync = () => {
    const router = useRouter()
    const {
        isUploading,
        isUploadCompleted,
        setIsUploading,
        setIsUploadCompleted,
        setErrorMsg,
        setSyncCurrent
    } = useAppStore();

    const makeRequest = async () => {
        setTimeout(async () => {
            try {
                const request = await syncProcess();
                if (request.data?.length) {
                    setSyncCurrent(request.data)
                    console.log("testando", "s")
                    setIsUploading(true);
                    setIsUploadCompleted(false)
                    setTimeout(() => {
                        makeRequest();
                    }, 30000)
                } else {
                    setSyncCurrent([])

                    setIsUploading(false);
                    setIsUploadCompleted(true)
                }
            } catch (error: UnauthorizedError | RequestError | any) {
                setErrorMsg(error.message);
            }
        }, 5000);
    };

    return {
        makeRequest
    }
}