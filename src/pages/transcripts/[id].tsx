import { useEffect, useState } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { PageWrapper } from "@/components/commons/PageWraper";
import jsonMock from "@/_data/mock/_mock.json"
import { TranscriptPage } from "@/components/pages/transcripts/TranscriptPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDetailProccessHook } from "@/lib/hooks/useDetailProcessHook";
import { useAppStore } from "@/lib/store/appStore";
import FullLoading from "@/components/commons/FullLoading";
import SnackbarFeedback from "@/components/commons/SnackBar";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTranslation } from "react-i18next";


export default function Transcript({
    repo
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const { t } = useTranslation();
    const { makeRequest } = useDetailProccessHook();
    const { currentProccess, isLoading, errorMsg } = useAppStore();
    useEffect(() => {
        makeRequest();
    }, [router])
    return (
        <>
            <Head>
                <title>{t('JUDGE_POWER')}</title>
            </Head>
            <PageWrapper >
                {isLoading ? <FullLoading />
                    : <TranscriptPage listTranscripts={repo.transcripts} dataProcces={currentProccess || null} />
                }
                <SnackbarFeedback message={errorMsg || null} show={!!errorMsg} isError={true} />
            </PageWrapper>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    const repo = jsonMock;
    return {
        props: {
            ...(await serverSideTranslations(locale || 'en', ['common'])),
            repo,
        }
    }
}