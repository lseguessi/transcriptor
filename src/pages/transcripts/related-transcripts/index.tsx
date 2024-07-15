import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { PageWrapper } from "@/components/commons/PageWraper";
import jsonMock from "@/_data/mock/_mock.json";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { RelatedTranscriptPage } from "@/components/pages/transcripts/related-transcripts/RelatedTranscriptPage";
import { useDetailTranscriptHook } from "@/lib/hooks/useDetailTranscriptHook";
import { useAppStore } from "@/lib/store/appStore";
import { useEffect } from "react";
import SnackbarFeedback from "@/components/commons/SnackBar";
import FullLoading from "@/components/commons/FullLoading";
type Repo = {
  proccess: any;
  transcripts: any;
};

export default function TranscriptDetail({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { makeRequest } = useDetailTranscriptHook();
  const { isLoading, errorMsg, currentDialogTranscript, currentProccess } = useAppStore();

  useEffect(() => {
    makeRequest();
  }, []);

  return (
    <PageWrapper>
      {isLoading ? (
        <FullLoading />
      ) : (
        <RelatedTranscriptPage
          listDialog={currentDialogTranscript || []}
          dataProcces={currentProccess || null}
        />
      )}
      <SnackbarFeedback
        message={errorMsg || null}
        show={!!errorMsg}
        isError={true}
      />
    </PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const repo = jsonMock;
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["common"])),
      repo,
    },
  };
};
