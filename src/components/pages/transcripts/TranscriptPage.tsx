import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import VideoIcon from '@mui/icons-material/Slideshow';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import UsersIcon from '@mui/icons-material/People';

import SaveIcon from '@mui/icons-material/Save';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Badge, Breadcrumbs, CardHeader, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState } from 'react';
import ModalRight from '@/components/commons/ModalRight/ModalRight';
import { FormTranscript } from '@/components/commons/FormTranscript';
import { IDetailTranscriptsResponse, ITranscript } from '@/lib/types/response/IDetailTranscriptsResponse';
import { useRouter } from 'next/router';
import { truncate } from '@/lib/utils';
import { RedButton, WhiteRedButton } from '@/components/commons/Buttons';
import { AddUserPermission } from '@/components/commons/AddUserPermission';
import { useAddPermissionHook } from '@/lib/hooks/useAddPermissionHook';
import { deleteProcess } from '@/lib/services/delete-process-request';

export type TranscriptPageProps = {
    listTranscripts: any,
    dataProcces: IDetailTranscriptsResponse | null
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#e1e1e1',
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



export const TranscriptPage = ({ listTranscripts, dataProcces }: TranscriptPageProps) => {
    const { t } = useTranslation();
    const [deletingLioading, setDeletingLoading] = useState(false);
    const { isLoading, makeRequest } = useAddPermissionHook()
    const [viewTranscript, setViewTranscript] = useState<ITranscript | null>(null);
    const [showUserPermission, setShowUsePermission] = useState<boolean>(false);

    const router = useRouter()
    const { query } = router;
    const [editTranscript, setEditTranscript] = useState<any>(null);
    const [isEditing, setIsEdting] = useState<{}>(false);
    const handleDelete = async () => {
        try {
            setDeletingLoading(true);
            const res = await deleteProcess({ process_number: query.id as string || '' });
            if (res) {
                setDeletingLoading(false);
                router.replace("/transcripts")
            } else {

            }
            setDeletingLoading(false);

        } catch (e: any) {
            console.error("error", e)
        }
    };
    const handlerEdit = () => {
        if (isEditing) {
            // SAVE
            setIsEdting(false)
        } else {
            setIsEdting(true)
        }
    }
    console.log("dataProcces", dataProcces?.process);
    return (
        <>
            <div className='flex flex-row justify-between pb-2 mb-6  border-b border-slate-800'>
                <Breadcrumbs aria-label="breadcrumb" className='flex flex-row '>
                    <Link
                        // underline="hover" 
                        color="inherit" href="/home">
                        {t('MENU_BREADCUMB')}
                    </Link>
                    <Link
                        // underline="hover"
                        color="inherit"
                        href="/transcripts"
                    >
                        {t('TRANSCRIPTS_BREADCUMB')}
                    </Link>
                    <Typography color="text.primary">{query.id}</Typography>
                </Breadcrumbs>
                <div className='flex gap-3'>
                    {/* <WhiteRedButton variant="outlined" onClick={() => setShowUsePermission(true)} startIcon={<UsersIcon />}>
                        {t('PERMISSIONS')}
                    </WhiteRedButton> */}
                    <WhiteRedButton variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon />} disabled={isLoading}>
                        {t('DELETE')}{isLoading && <div>
                            <CircularProgress size={20} color='error' style={{ marginLeft: 10 }} />
                        </div>
                        }
                    </WhiteRedButton>
                </div>
            </div>
            <Box
                display="flex"
                flexDirection={"row"}
                alignItems="center"
                sx={{ minWidth: 200 }}>
                <Grid container spacing={2} columns={8}>
                    <Grid xs={8} sm={8} md={4} lg={4}>
                        {dataProcces?.process?.map((process) => {
                            const awnser = process.questionAnswers?.replaceAll("\n", "<br/>");
                            const summary = process.summary?.replaceAll("\n", "<br/>");

                            return (
                                <Card variant="outlined" sx={{}} >
                                    <React.Fragment>
                                        <CardContent sx={{ minWidth: 700 }} >
                                            <Typography variant="h5" component="div">
                                                {/* {item.title} */}
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
                                                {/* {truncate(item.description, 80)} */}
                                            </Typography>

                                            <div className='flex-col whitespace-normal'>
                                                <div className='text-gray-400 text-sm'>
                                                    {t('PROCESS.DATE')}:
                                                </div>
                                                <div className='text-black'>
                                                    {process.reportDate}
                                                </div>
                                                <div className='whitespace-normal mt-2 mb-2 w-full' />
                                                <div className='text-zinc-600 text-sm'>
                                                    {t('PROCESS.PROCESS_NUMBER')}
                                                </div>
                                                <div className='text-black'>
                                                    {process.processNumber}
                                                </div>
                                                <div className='whitespace-normal mt-2 mb-2 w-full' />

                                                <div className='text-black'>
                                                    <div dangerouslySetInnerHTML={{ __html: awnser }} />
                                                </div>
                                                <div className='text-zinc-600 text-sm'>
                                                    {t('PROCESS.SUMARY')}
                                                </div>
                                                <div className='text-black'>
                                                    <div dangerouslySetInnerHTML={{ __html: summary }} />
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" >{t('ACCESS')}</Button>
                                        </CardActions>
                                    </React.Fragment>
                                </Card>
                            )
                        })}

                    </Grid>
                    <Grid xs={8} sm={8} md={4} lg={4}>
                        <Card variant="outlined" sx={{}}>
                            <CardHeader
                                title={
                                    dataProcces?.transcripts?.length ? <h6>
                                        <span className='mr-10' style={{ marginRight: 18 }}>{t('PROCESS.RELATED_TRANSCRIPT')}
                                        </span>
                                        <Badge color="secondary" overlap="circular" badgeContent={dataProcces?.transcripts?.length}></Badge>
                                    </h6>
                                        : <div />
                                }
                            />
                            <React.Fragment>
                                <CardContent style={{ flexDirection: 'row', overflowX: 'auto' }}>
                                    <div className='flex flex-row' style={{ width: '100%' }}>
                                        {dataProcces?.transcripts?.map((transcript, index) => {
                                            const summary = transcript.summary?.replaceAll("\n", "<br/>");
                                            return (
                                                <div style={{ width: 'auto' }}>
                                                    <Card key={index} className={"flex flex-col justify-end"} variant="outlined" sx={{ minWidth: 300, maxWidth: 140, marginRight: 2.5, marginLeft: 2.5 }}>
                                                        <React.Fragment>
                                                            <CardContent onClick={() => router.push(`./related-transcripts?processN=${transcript.processNumber}&transcriptId=${transcript.transcriptID}`)} style={{ cursor: 'pointer' }}>
                                                                <div className=' text-xl	whitespace-pre-line'>
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
                                                                        <Button size="small" color='error' onClick={() => setViewTranscript(transcript)}>{t('PROCESS.VIEW')}</Button>
                                                                    </div>
                                                                </div>
                                                            </CardActions>
                                                        </React.Fragment>
                                                    </Card>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </React.Fragment>
                            <CardActions className='flex flex-row justify-end'>
                                <div className=''>
                                    <Link href={`/transcripts/all-transcripts?processN=${router?.query?.id}`}>
                                        <Button size="small" color='error' >{t('PROCESS.EXPAND')}</Button>
                                    </Link>
                                </div>
                            </CardActions>
                        </Card>
                        <div className='mt-7' style={{ marginTop: '2rem' }}>
                            <Card variant="outlined" sx={{ minWidth: 205 }}>
                                <CardHeader
                                    title={
                                        dataProcces?.documents?.length ? <h6>
                                            <span className='mr-10' style={{ marginRight: 18 }}>{t('PROCESS.RELATED_DOCUMENTS')}</span>
                                            <Badge color="secondary" overlap="circular" badgeContent={dataProcces?.documents?.length}></Badge>
                                        </h6>
                                            : <div />
                                    }
                                />
                                <React.Fragment>
                                    <CardContent style={{ flexDirection: 'row', overflowX: 'auto' }}>
                                        <div className='flex flex-column' style={{ width: '100%' }}>
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 200 }} aria-label="customized table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell></StyledTableCell>
                                                            <StyledTableCell>{t('PROCESS.TRANSACTION_ID')}</StyledTableCell>
                                                            <StyledTableCell></StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {dataProcces?.documents?.map((document, index) => {
                                                            return (
                                                                <StyledTableRow >
                                                                    <StyledTableCell>{document?.documentExtension == "pdf" ? <PictureAsPdfIcon /> : <VideoIcon />}</StyledTableCell>
                                                                    <StyledTableCell>{document.documentName}</StyledTableCell>
                                                                    <StyledTableCell><ArrowRightIcon /></StyledTableCell>
                                                                </StyledTableRow>
                                                            )
                                                        })}

                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                        <CardActions className='flex flex-row justify-end'>
                                            <div className=''>
                                                <div>
                                                    <Link href={"#"}>
                                                        <Button size="small" color='error'><AddIcon /> {t('PROCESS.ADD')}</Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardActions>
                                    </CardContent>
                                </React.Fragment>
                            </Card>
                        </div>
                    </Grid>

                </Grid>
            </Box >

            <ModalRight
                open={!!viewTranscript}
                onClose={() => setViewTranscript(null)}
                onSave={() => setViewTranscript(null)}
            >
                <FormTranscript values={viewTranscript} />
            </ModalRight>

            <ModalRight
                open={!!showUserPermission}
                onClose={() => setShowUsePermission(false)}
                onSave={() => makeRequest()}
                title={t('PROCESS.USERS_ACCESS')}
                isCreating
                isLoading={isLoading}
            >
                <AddUserPermission values={null} />
            </ModalRight>
        </>
    )
}

