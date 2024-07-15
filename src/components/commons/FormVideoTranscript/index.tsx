import { Box, Paper, TextField, Typography, styled } from "@mui/material";
import { ChangeEvent, useEffect, useRef } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { grey, blue } from "@mui/material/colors";
import { useTranslation } from "react-i18next";
import { IDialogTranscriptResponse } from "@/lib/types/response/IDialogTranscriptResponse";
import VideoPlayer from "../VideoPlayer";

type FormTranscriptionProps = {
  values: any;
  onChangeEvent: ChangeEvent<HTMLInputElement>;
};

const Textarea = styled(TextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);
type FormVideoTranscriptProps = {
  values?: IDialogTranscriptResponse;
  processNumber?: string;
  fileId?: string;
};
export const FormVideoTranscript = ({
  values,
  processNumber,
  fileId,
}: FormVideoTranscriptProps) => {
  const { t } = useTranslation();
//   const videoRef = useRef(null);

  const convertToSeconds = (time: string) => {
    let parts = time.split(".");

    let minutes = parseInt(parts[0], 10);
    let seconds = parseInt(parts[1], 10);

    return minutes * 60 + seconds;
  };

//   useEffect(() => {
//     const videoElement: any = videoRef.current;
//     if (!!videoElement) {
//       videoElement.currentTime =
//         convertToSeconds(values?.start ? values?.start?.toString() : "0.00") ||
//         0;
//       // videoElement.play();
//     }
//   }, [values]);
  
  return (
    <Paper>
      <Box
        my={2}
        display="flex"
        alignItems="center"
        gap={4}
        py={4}
        px={8}
        sx={{}}
      >
        <div className="container mx-auto ">
          <div className="mb-1 flex flex-col gap-4 ">
            <TextField
              id="outlined-password-input"
              label={t("PROCESS.TRANSACTION_ID")}
              type="text"
              name={"processNumber"}
              value={processNumber}
              disabled={true}
            />
            <TextField
              id="outlined-password-input"
              label={t("PROCESS.SEQUENCE")}
              type="text"
              name={"processNumber"}
              value={values?.sequence}
              disabled={true}
            />
            <TextField
              id="outlined-password-input"
              label={t("PROCESS.START")}
              type="text"
              name={"processNumber"}
              value={values?.start}
              disabled={true}
            />
            <TextField
              id="outlined-password-input"
              label={t("PROCESS.END")}
              type="text"
              name={"processNumber"}
            />
            <TextField
              id="outlined-password-input"
              label={t("PROCESS.SPEAKER")}
              type="text"
              name={"processNumber"}
              value={values?.speaker}
              disabled={true}
            />
            <div>
              <Typography className="mb-2">{t("PROCESS.TEXT")}</Typography>
              <Textarea
                maxRows={10}
                minRows={5}
                id="outlined-password-input"
                placeholder="Transcript"
                name={"processNumber"}
                value={values?.text}
                disabled={true}
              />
            </div>
            <TextField
              id="outlined-password-input"
              label={t("PROCESS.TRANSCRIPT_DATE")}
              type="text"
              name={"processNumber"}
              value={values?.transcriptDate?.value}
              disabled={true}
            />
            <TextField
              id="outlined-password-input"
              label={t("PROCESS.PROCESS_REF")}
              type="text"
              name={"processNumber"}
              value={processNumber}
              disabled={true}
            />
            <TextField
              id="outlined-password-input"
              label={t("PROCESS.URL_VIDEO")}
              type="text"
              name={"processNumber"}
              value={values?.urlSigned}
              disabled={true}
            />
            <div>
              <VideoPlayer
                videoId={fileId}
                timeStart={convertToSeconds(
                  values?.start ? values?.start?.toString() : "0.00"
                )}
              />
              {/* <video ref={videoRef} src={values?.urlSigned} controls={true} preload="metadata" style={{ maxWidth: "100%" }}></video> */}
            </div>
          </div>
        </div>
      </Box>
    </Paper>
  );
};
