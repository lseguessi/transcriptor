import { Box, Paper, TextField, Typography, styled } from "@mui/material"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { grey, blue } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

type FormTranscriptionProps = {
    values: any | null,
}

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
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);
export const FormTranscript = ({ values }: FormTranscriptionProps) => {
    const { t } = useTranslation()
    return (
        <Paper>
            <Box my={2}
                display="flex"
                alignItems="center"
                gap={4}
                py={4}
                px={8}

                sx={{}}>
                <div className="container mx-auto ">
                    <div className="mb-1 flex flex-col gap-4 ">
                        <TextField
                            id="outlined-password-input"
                            label={t('PROCESS.PROCESS_NUMBER')}
                            type="text"
                            value={values?.processNumber}
                            disabled={true}
                        />
                        <TextField
                            id="outlined-password-input"
                            label={t('PROCESS.TRANSACTION_ID')}
                            type="text"
                            value={values?.transcriptID}
                            disabled={true}
                        />
                        <TextField
                            id="outlined-password-input"
                            label={t('PROCESS.TITLE')}
                            type="text"
                            value={values?.title}
                            disabled={true} />
                        <TextField
                            id="outlined-password-input"
                            label="URL"
                            type="text"
                            value={values?.url}
                            disabled={true} />
                        <div>
                            <Typography className="mb-2">
                                {t('PROCESS.TRANSCRIPT')}
                            </Typography>
                            <Textarea
                                maxRows={10}
                                minRows={5}
                                id="outlined-password-input"
                                placeholder="Transcript"
                                value={values?.transcript}
                                disabled={true}
                            />
                        </div>
                        <div>
                            <Typography className="mb-2">
                                {t('PROCESS.SUMARY')}
                            </Typography>
                            <Textarea
                                maxRows={10}
                                minRows={5}
                                id="outlined-password-input"
                                placeholder="Summary"
                                value={values?.summary}
                                disabled={true} />
                        </div>
                        <div>
                            <Typography className="mb-2">
                                {t('PROCESS.TOPICS')}
                            </Typography>
                            <Textarea
                                maxRows={10}
                                minRows={5}
                                id="outlined-password-input"
                                placeholder="Summary"
                                value={values?.topics}
                                disabled={true} />
                        </div>
                        <div>
                            <Typography className="mb-2">
                                {t('PROCESS.KEYWORDS')}
                            </Typography>
                            <Textarea
                                maxRows={10}
                                minRows={5}
                                id="outlined-password-input"
                                placeholder="Summary"
                                value={values?.keywords}
                                disabled={true} />
                        </div>
                        <div>
                            <Typography className="mb-2">
                                {t('PROCESS.SENTIMENT_ANALY')}
                            </Typography>
                            <Textarea
                                maxRows={10}
                                minRows={5}
                                id="outlined-password-input"
                                placeholder="Summary"
                                value={values?.sentimentAnalysis}
                                disabled={true} />
                        </div>
                        <TextField
                            id="outlined-password-input"
                            label={t('PROCESS.PROCESS_REF')}
                            type="text"
                            value={values?.processNumber}
                            disabled={true} />
                    </div>

                </div>
            </Box>
        </Paper>
    )

}