import api from "./api";
import { UnauthorizedError } from "./exceptions/UnauthorizedError";
import { AxiosProgressEvent, AxiosResponse } from "axios";
import { RequestError } from "./exceptions/RequestError";
import { IDetailTranscriptsResponse } from "@/lib/types/response/IDetailTranscriptsResponse";
import { ICreateProcessRequest } from "../types/request/ICreateProcessRequest";
import { IUploadChunkRequest } from "../types/request/IUploadChunkRequest";
import { IUploadFinalizeChunkResponse } from "../types/response/IUploadFinalizeChunkResponse";

type ChunkGroup = {
  process_number: string;
  gdrive_url: string[];
  chunk_group: any[];
};
export const createProcess = async (
  { process_number, files, gdrive_url }: ICreateProcessRequest,
  callback: (progress: number) => void
): Promise<AxiosResponse<
  IUploadFinalizeChunkResponse | null | undefined
> | null> => {
  try {
    let chucksAllResponse: ChunkGroup = {
      process_number: process_number || "",
      gdrive_url: gdrive_url || [],
      chunk_group: [],
    };
    if (!files) throw new RequestError("Arquivos não encontrados", 400);

    const chunchGroup = await Promise.all(
      files.map(async (file) => {
        let chucksResponse = [];
        const selectedFile: File = file.file;
        const fileSize = selectedFile.size;
        const chunkSize = 1024 * 1024; // Set chunk size to 1MB
        const totalChunks = Math.ceil(fileSize / chunkSize);

        // Loop through and upload chunks
        for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
          const chuckNum = chunkNumber + 1;
          const formData = new FormData();
          const start = chunkNumber * chunkSize;
          const end = Math.min(start + chunkSize, fileSize);
          const chunk = selectedFile.slice(start, end);
          formData.append(`file`, chunk, selectedFile.name);
          formData.append(`process_number`, `${process_number}`);
          formData.append("gdrive_url", `${gdrive_url}`);
          formData.append("chunk_number", `${chuckNum}`);
          formData.append(`filename`, selectedFile.name);
          formData.append(`mimetype`, selectedFile.type);
          if (!gdrive_url) {
            try {
              console.log("formData, chunk", formData, chunk);
              const upChuck = await uploadChunckFiles(formData);
              if (!upChuck)
                throw new RequestError(
                  "Erro ao realizar upload do arquivo",
                  400
                );
              chucksResponse.push(upChuck?.chunkName);
            } catch (e: Error | any) {
              throw e;
            }
          }
        }

        if (chucksResponse.length == totalChunks) {
          const chunk_group = {
            filename: selectedFile.name,
            mimetype: selectedFile.type,
            chunks: chucksResponse,
          };
          return chunk_group;
        }
      })
    );
    const chucks = chunchGroup;

    if (chucks?.length === files?.length) {
      chucksAllResponse.chunk_group = chucks;
      const response = await uploadFinalChunck(chucksAllResponse);
      return response;
    } else {
      throw new RequestError("Erro ao finalizr o upload do arquivo", 400);
    }
  } catch (e: Error | any) {
    if (e.message === "Network Error") {
      throw new RequestError(
        "Houve um problema com sua requisição. Talvez o tamanho do(s) arquivo(s) sejam muito grandes",
        413
      );
    }
    switch (e?.response?.status) {
      case 400:
        throw new RequestError(e?.response?.data?.mensagem, 400);
      case 500:
        throw new RequestError(e?.response?.data?.mensagem, 500);
      case 401:
        throw new UnauthorizedError(e?.response?.data?.mensagem, 401);
      case 413:
        throw new RequestError("Arquivos muito grande para processar.", 413);

      default:
        throw new RequestError(
          e?.response?.data?.mensagem,
          e?.response?.status
        );
    }
  }
};

export const uploadChunckFiles = async (chunkc: FormData) => {
  const response = await api.post("/upload_chunk", chunkc, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return response.data;
};

export const uploadFinalChunck = async (body: ChunkGroup) => {
  const response = await api.post("/finalize_upload", body);
  console.log("calling", response.data);
  return response.data;
};
