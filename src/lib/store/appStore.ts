import { IDetailTranscriptsResponse } from "@/lib/types/response/IDetailTranscriptsResponse";
import { IDialogTranscriptResponse } from "@/lib/types/response/IDialogTranscriptResponse";
import { ITranscriptListResponse } from "@/lib/types/response/ITranscriptsListResponse";
import { create } from "zustand";
import { ICreateProcessRequest } from "../types/request/ICreateProcessRequest";
import { ISyncResponse } from "../types/response/ISyncResponse";
import { IUserPermissionsProcess } from "../types/IUserPermissionsProcess";

type AppStateType = {
  isLoading: boolean;
  errorMsg?: string | null;
  listProccess?: ITranscriptListResponse[] | [];
  currentProccess?: IDetailTranscriptsResponse | null | undefined;
  currentDialogTranscript?: IDialogTranscriptResponse[] | [] | null;
  currentVideo?: IDialogTranscriptResponse[] | [] | null;
  isUploading?: boolean;
  isUploadCompleted?: boolean;
  bodyUpload?: ICreateProcessRequest | null | undefined;
  progressUpload: number;
  syncCurrent?: ISyncResponse[] | null | undefined;
  usersProcessPermissions?: IUserPermissionsProcess | null | undefined;
};

type ContractsMethods = {
  setIsLoading: (isLoading: boolean) => void;
  setErrorMsg: (errorMsg: string | null) => void;
  setListProccess: (list: ITranscriptListResponse[]) => void;
  setCurrentProccess: (
    item: IDetailTranscriptsResponse | null | undefined
  ) => void;
  setCurrentDialogTranscript: (
    item: IDialogTranscriptResponse[] | [] | null
  ) => void;
  setIsUploading: (bool: boolean) => void;
  setIsUploadCompleted: (bool: boolean) => void;
  setBodyUpload: (upload: ICreateProcessRequest | null | undefined) => void;
  setProgressUpload: (progress: number) => void;
  setSyncCurrent: (current: ISyncResponse[] | null | undefined) => void;
  setUSerPermission: (
    permision: IUserPermissionsProcess | null | undefined
  ) => void;
  setCurrentVideo: (item: IDialogTranscriptResponse[] | [] | null) => void;
};

const initialState = {
  isLoading: false,
  errorMsg: null,
  listProccess: [],
  currentProccess: null,
  isUploading: false,
  isUploadCompleted: false,
  currentDialogTranscript: null,
  currentVideo: null,
  bodyUpload: {
    files: [],
    process_number: "",
  },
  progressUpload: 0,
  syncCurrent: null,
  usersProcessPermissions: null,
};

export const useAppStore = create<AppStateType & ContractsMethods>((set) => ({
  ...initialState,
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading: isLoading })),
  setErrorMsg: (errorMsg: string | null) => set(() => ({ errorMsg: errorMsg })),
  setListProccess: (list: ITranscriptListResponse[] | []) =>
    set(() => ({ listProccess: list })),
  setCurrentProccess: (item: IDetailTranscriptsResponse | null | undefined) =>
    set(() => ({ currentProccess: item })),
  setIsUploading: (bool: boolean) => set(() => ({ isUploading: bool })),
  setIsUploadCompleted: (bool: boolean) =>
    set(() => ({ isUploadCompleted: bool })),
  setCurrentDialogTranscript: (item: IDialogTranscriptResponse[] | [] | null) =>
    set(() => ({ currentDialogTranscript: item })),
  setCurrentVideo: (item: IDialogTranscriptResponse[] | [] | null) =>
    set(() => ({ currentVideo: item })),
  setBodyUpload: (item: ICreateProcessRequest | null | undefined) =>
    set(() => ({ bodyUpload: item })),
  setProgressUpload: (prog: number) => set(() => ({ progressUpload: prog })),
  setSyncCurrent: (current: ISyncResponse[] | null | undefined) =>
    set(() => ({ syncCurrent: current })),
  setUSerPermission: (current: IUserPermissionsProcess | null | undefined) =>
    set(() => ({ usersProcessPermissions: current })),
}));
