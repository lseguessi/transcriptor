import React from "react"
import { Dialog, Paper, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { WhiteRedButton, RedButton } from "../Buttons"
import { Button } from "@mui/base";
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from "react-i18next";

type ModalRightProps = {
    open: boolean,
    onSave: () => void,
    onClose: () => void,
    children: React.ReactElement,
    title?: string,
    isCreating?: boolean
    isLoading?: boolean
}
export default function ModalRight({ children, open, title, isCreating, isLoading, onClose, onSave }: ModalRightProps) {

    const { t } = useTranslation();
    return (
        <Dialog
            PaperComponent={(props) => {
                return <Paper style={{ maxWidth: 824, width: '65%', margin: 0, borderRadius: 0, maxHeight: '100%', position: "absolute", top: 0, bottom: 0, right: 0 }} {...props} >
                    <div className='flex flex-row justify-between pb-2 mt-4 mb-4 mr-4 ml-4  border-b border-slate-800'>
                        <div className="flex gap-4 flex-row justify-center items-center content-center" >
                            <Button onClick={onClose}>
                                <CloseIcon />
                            </Button>
                            <Typography >{title ? title : ''}</Typography>
                        </div>
                        <div className='flex gap-3'>
                            {isLoading && <CircularProgress color={"secondary"} size={"20px"} />}
                            <WhiteRedButton onClick={onClose} variant="outlined">
                                {t('CANCEL')}
                            </WhiteRedButton>
                            {isCreating &&
                                <RedButton variant="outlined" onClick={() => {
                                    console.log("called", "sss")
                                    onSave()
                                }} disabled={isLoading}>
                                    {t('SAVE')}
                                </RedButton>
                            }
                        </div>
                    </div>
                    <div style={{ overflowY: 'scroll' }}>
                        {children}
                    </div>
                </Paper >
            }}
            onClose={() => onClose()}
            aria-labelledby="simple-dialog-title"
            open={open}
        />
    )
}