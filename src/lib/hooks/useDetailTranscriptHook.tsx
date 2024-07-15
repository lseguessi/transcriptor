import { getDetailTranscripts, getUrlVideo } from "@/lib/services/detail-process-request";
import { RequestError } from "@/lib/services/exceptions/RequestError";
import { UnauthorizedError } from "@/lib/services/exceptions/UnauthorizedError";
import { useRouter } from "next/router";
import { useAppStore } from "../store/appStore";
import { getGenericErrorMsg } from "@/lib/utils";
import { getDialogTranscript } from "@/lib/services/dialog-transcript-request";
import { useSearchParams } from "next/navigation";
import { ITranscript } from "../types/response/IDetailTranscriptsResponse";

export const useDetailTranscriptHook = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const { setIsLoading, setCurrentDialogTranscript, setCurrentProccess, setErrorMsg } = useAppStore();

    const clearState = () => {
        setCurrentDialogTranscript(null)
        setIsLoading(true)
        setErrorMsg(null)
    }

    const makeRequest = async () => {
        clearState();
        try {
            const slugProc = searchParams.get('processN')
            const slugTran = searchParams.get('transcriptId');
            const requestDetail = await getDetailTranscripts({ process_number: slugProc || "" });
            const requestDialog = await getDialogTranscript({ transcript_id: slugTran || "" });
            // TODO - Revisar URL de retorno para verificar se vou receber o ID do arquivo.
            console.log("RESPOSTA DO DETALHE DO PROCESSO", requestDetail)

            if (requestDetail.data && requestDialog.data) {
                if (requestDetail.data) {
                    setCurrentProccess(requestDetail.data);
                } else {
                    setCurrentProccess(null);
                }
                setCurrentDialogTranscript(requestDialog.data || null)

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