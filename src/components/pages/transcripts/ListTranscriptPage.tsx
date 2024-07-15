'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Breadcrumbs, Grid, Link } from '@mui/material';
import { truncate } from '@/lib/utils/index';
import { useTranslation } from "next-i18next";
import AddIcon from '@mui/icons-material/Add';
import { ITranscriptListResponse } from '@/lib/types/response/ITranscriptsListResponse';
import { RedButton } from '@/components/commons/Buttons';
import ModalRight from '@/components/commons/ModalRight/ModalRight';
import { FormCreate } from '@/components/commons/FormCreate';
import { ICreateProcessRequest } from '@/lib/types/request/ICreateProcessRequest';
import { useCreateProcess } from '@/lib/hooks/useCreateProcessHook';
import { useRouter } from 'next/navigation';

export type TranscriptPageProps = {
    data: ITranscriptListResponse[] | undefined | null
}

export const ListTranscriptPage = ({ data }: TranscriptPageProps) => {
    const router = useRouter()
    const { t } = useTranslation();
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const {
        isLoading,
        makeRequest
    } = useCreateProcess();

    const handleSelectProcess = (process: string) => {
        localStorage.setItem('process', process);
        console.log("process", process)
        router.push(`/transcripts/${process}`)
    }

    console.log("isloading", isLoading)
    return (
        <>
            <div className='flex flex-row justify-between pb-2 mb-6  border-b border-slate-800'>
                <Breadcrumbs aria-label="breadcrumb" className='flex flex-row '>
                    <Link
                        // underline="hover" 
                        color="inherit" href="/home">
                        {t('MENU_BREADCUMB')}
                    </Link>
                    <Typography color="text.primary">{t('TRANSCRIPTS_BREADCUMB')}</Typography>
                </Breadcrumbs>
                <div className='flex gap-3'>
                    <RedButton variant="outlined" onClick={() => setShowModalCreate(true)} startIcon={<AddIcon />}>
                        {t('NEW')}
                    </RedButton>
                </div>
            </div>
            <Box
                display="flex"
                flexDirection={"row"}
                alignItems="center"
                sx={{ minWidth: 275 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }}>
                    {data?.map((item: ITranscriptListResponse, index: number) => {
                        return (
                            <Grid item xs={12} sm={12} md={3} lg={3} key={index}>
                                <Card variant="outlined" sx={{ minWidth: 205 }}>
                                    <React.Fragment>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {item.processNumber}
                                            </Typography>
                                            <Typography color="text.secondary" sx={{
                                                fontSize: {
                                                    lg: 12,
                                                    md: 11,
                                                    sm: 10,
                                                    xs: 10
                                                },
                                                wordWrap: 'break-word',
                                                width: '11rem',
                                            }}>
                                                {truncate(item.summary, 80)}
                                            </Typography>
                                            <Typography variant="body2">
                                                {item.questionAnswers}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <div onClick={() => handleSelectProcess(item.processNumber)}>
                                                <Button size="small" >{t('ACCESS')}</Button>
                                            </div>
                                        </CardActions>
                                    </React.Fragment>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>

            </Box>
            <ModalRight
                open={showModalCreate}
                onClose={() => setShowModalCreate(false)}
                onSave={() => makeRequest()}
                isCreating
                isLoading={isLoading}
            >
                <FormCreate isLoading={isLoading} />
            </ModalRight>
        </>
    )
}

