'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Breadcrumbs, Grid, Link } from '@mui/material';
import { truncate } from '@/lib/utils/index';
import { useTranslation } from "next-i18next";
import { IAllTranscriptsResponse } from '@/lib/types/response/IAllTranscriptsResponse';
import { useState } from 'react';
import ModalRight from '@/components/commons/ModalRight/ModalRight';
import { FormTranscript } from '@/components/commons/FormTranscript';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export type TranscriptPageProps = {
    data: IAllTranscriptsResponse[] | null | undefined
}

export const ListAllTranscriptPage = ({ data }: TranscriptPageProps) => {
    const { t } = useTranslation();
    const searchParams = useSearchParams();
    const router = useRouter();
    const queryProcess = searchParams.get('processN');
    const [viewTranscript, setViewTranscript] = useState<IAllTranscriptsResponse | null>(null);

    return (
        <>
            <div className='flex flex-row justify-between pb-2 mb-6  border-b border-slate-800'>
                <Breadcrumbs aria-label="breadcrumb" className='flex flex-row '>
                    <Link
                        // underline="hover" 
                        color="inherit" href="/">
                        {t('MENU_BREADCUMB')}
                    </Link>
                    <Link
                        // underline="hover"
                        color="inherit"
                        href={`/transcripts`}
                    >
                        {t('TRANSCRIPTS_BREADCUMB')}
                    </Link>
                    <Link
                        // underline="hover"
                        color="inherit"
                        href={`/transcripts/${queryProcess}`}
                    >
                        {queryProcess || ""}
                    </Link>
                    <Typography color="text.primary">
                        {t('ALL_TRANSCRIPTS')}
                    </Typography>
                </Breadcrumbs>
            </div>
            <Box
                display="flex"
                flexDirection={"row"}
                alignItems="center"
                sx={{ minWidth: 275 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {data && data?.map((transcript: IAllTranscriptsResponse, index: number) => {
                        const summary = transcript.summary?.replaceAll("\n", "<br/>");
                        return (
                            <Grid item xs={2} sm={3} md={3} key={index}>
                                <Card variant="outlined" sx={{ minWidth: 150 }}>
                                    <React.Fragment>
                                        <CardContent onClick={() => router.push(`/transcripts/related-transcripts?processN=${transcript.processNumber}&transcriptId=${transcript.transcriptID}`)} style={{ cursor: 'pointer' }}>
                                            <div className=' text-xl whitespace-pre-line'>
                                                {transcript?.title}
                                            </div>
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
                                                {truncate(transcript?.transcript, 50)}
                                            </Typography>
                                            <Typography variant="body2">
                                                <div dangerouslySetInnerHTML={{ __html: truncate(summary, 100) }} />


                                            </Typography>
                                        </CardContent>
                                        <CardActions className='flex flex-row justify-end'>
                                            <div className=''>
                                                <div>
                                                    <Button size="small" color='error' onClick={() => setViewTranscript(transcript)}>{t('VIEW')}</Button>
                                                </div>
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
                open={!!viewTranscript}
                onClose={() => setViewTranscript(null)}
                onSave={() => setViewTranscript(null)}
            >
                <FormTranscript values={viewTranscript} />
            </ModalRight>
        </>
    )
}

