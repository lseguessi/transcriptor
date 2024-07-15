import { useEffect, useMemo } from "react";

import { PageWrapper } from "@/components/commons/PageWraper";
import { ListTranscriptPage } from "@/components/pages/transcripts/ListTranscriptPage";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SnackbarFeedback from "@/components/commons/SnackBar";
import { useProccesstHook } from "@/lib/hooks/useProcessHook";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

function ListTranscript({ }: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const router = useRouter()
  const { t } = useTranslation();
  const searchParams = useSearchParams()
  const { pathname } = router
  const { response, msgError, makeRequest } = useProccesstHook();

  useMemo(() => {
    makeRequest();

  }, [pathname, searchParams]);

  return (
    <>
      <Head>
        <title>{t('JUDGE_POWER')}</title>
      </Head>
      <PageWrapper>
        <ListTranscriptPage data={response?.transcripts} />
        <SnackbarFeedback message={msgError} show={!!msgError} isError={true} />
      </PageWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["common"])),
    },
  };
};

export default ListTranscript;
