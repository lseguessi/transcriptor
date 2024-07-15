import { Box, CircularProgress, Paper, IconButton } from "@mui/material";
import { useState } from "react";
import {
  AttachFile,
  Audiotrack,
  Description,
  PictureAsPdf,
  Theaters,
  Add,
} from "@material-ui/icons";
import { useAppStore } from "@/lib/store/appStore";
import { TextFieldWrapper } from "../TextFieldWrapper/TextFieldWrapper";
import SnackbarFeedback from "../SnackBar";
import { useTranslation } from "react-i18next";
import { DropzoneAreaBase } from "material-ui-dropzone";

type FormTranscriptionProps = {
  isLoading?: boolean;
};

const mimeTypes = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "audio/mpeg",
  "video/mp4",
  "audio/wav",
  "video/x-matroska",
  "video/x-ms-asf",
];

export const FormCreate = ({ isLoading }: FormTranscriptionProps) => {
  const { bodyUpload, setBodyUpload, errorMsg, progressUpload } = useAppStore();
  const { t } = useTranslation();
  const [gDriveUrls, setGDriveUrls] = useState<string[]>(
    bodyUpload?.gdrive_url || [""]
  );

  const handleChangeText = (proccess: string) => {
    setBodyUpload({
      files: bodyUpload?.files || [],
      process_number: proccess,
      gdrive_url: gDriveUrls.filter((url) => url.trim() !== ""),
    });
  };

  const handleChangeTextGDrive = (index: number, value: string) => {
    const newUrls = [...gDriveUrls];
    newUrls[index] = value;
    setGDriveUrls(newUrls);
    setBodyUpload({
      files: bodyUpload?.files || [],
      process_number: bodyUpload?.process_number || "",
      gdrive_url: newUrls.filter((url) => url.trim() !== ""),
    });
  };

  const handleAddUrlInput = () => {
    setGDriveUrls([...gDriveUrls, ""]);
  };

  const handleSave = (files: any) => {
    if (isLoading) return;
    setBodyUpload({
      files: files,
      process_number: bodyUpload?.process_number || "",
      gdrive_url: gDriveUrls.filter((url) => url.trim() !== ""),
    });
  };

  const onDelete = (file: any) => {
    if (isLoading) return;
    const temp = bodyUpload?.files;
    const newList = temp?.filter((v) => v != file);
    setBodyUpload({
      files: newList || [],
      process_number: bodyUpload?.process_number || "",
      gdrive_url: gDriveUrls.filter((url) => url.trim() !== ""),
    });
  };

  const handlePreviewIcon = (fileObject: any, classes: any) => {
    const { type } = fileObject.file;
    const iconProps = {
      className: classes.image,
    };

    if (type.startsWith("video/"))
      return <Theaters {...iconProps} fontSize="small" />;
    if (type.startsWith("audio/"))
      return <Audiotrack {...iconProps} fontSize="small" />;

    switch (type) {
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <Description {...iconProps} fontSize="small" />;
      case "application/pdf":
        return <PictureAsPdf {...iconProps} fontSize="small" />;
      default:
        return <AttachFile {...iconProps} fontSize="small" />;
    }
  };

  return (
    <Paper>
      <Box
        my={2}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        gap={4}
        py={4}
        px={8}
        sx={{}}
      >
        <div className="container mx-auto ">
          <div className="mb-1 flex flex-col gap-4 ">
            <TextFieldWrapper
              id="outlined-password-input"
              label={t("PROCESS.PROCESS_NUMBER")}
              type="text"
              value={bodyUpload?.process_number}
              onChange={(v: any) => handleChangeText(v.target.value)}
              disabled={isLoading}
            />
            {/* <DropzoneAreaBase
              fileObjects={bodyUpload?.files as any[]}
              onAdd={handleSave}
              dropzoneText={t("PROCESS.ADD_FILES_UPLOAD")}
              acceptedFiles={mimeTypes}
              // showPreviews={true}
              maxFileSize={1024000000}
              onDelete={onDelete}
              filesLimit={30}
              getPreviewIcon={handlePreviewIcon}
              showFileNamesInPreview
            /> */}
            {gDriveUrls.map((url, index) => (
              <TextFieldWrapper
                key={index}
                id={`gdrive-url-${index}`}
                label={`URL do Google Drive ${index + 1}`}
                type="text"
                value={url}
                onChange={(v: any) =>
                  handleChangeTextGDrive(index, v.target.value)
                }
                disabled={isLoading}
              />
            ))}
            <IconButton
              onClick={handleAddUrlInput}
              color="primary"
              aria-label="add URL"
            >
              <Add />
            </IconButton>
            <TextFieldWrapper
              id="outlined-password-input"
              label={t("PROCESS.PROCESS_REF")}
              type="text"
              value={new Date()}
              disabled={true}
            />
          </div>

          {isLoading && (
            <div
              className="flex flex-col justify-content content-center items-center"
              style={{ marginTop: 50, marginBottom: 50, height: 50 }}
            >
              {t("PROCESS.SENDING")}
              <br />
              <br />
              <CircularProgress color="info" />
            </div>
          )}
        </div>
      </Box>
      <SnackbarFeedback
        message={errorMsg || null}
        show={!!errorMsg}
        isError={true}
        vertical="bottom"
        variant="filled"
      />
    </Paper>
  );
};
