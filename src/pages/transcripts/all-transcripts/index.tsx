import { useEffect } from "react";
import { PageWrapper } from "@/components/commons/PageWraper";
import { ListAllTranscriptPage } from "@/components/pages/transcripts/all-transcripts/ListAllTranscriptPage";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SnackbarFeedback from "@/components/commons/SnackBar";
import { useListTanscriptsHook } from "@/lib/hooks/useListTranscriptsHook";
import FullLoading from "@/components/commons/FullLoading";

function ListAllTranscript({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const { response, msgError, makeRequest, isLoading } =
    useListTanscriptsHook();

  useEffect(() => {
    makeRequest();
  }, []);

  return (
    <PageWrapper>
      {isLoading ? (
        <FullLoading />
      ) : (
        <ListAllTranscriptPage data={response?.transcripts} />
      )}
      <SnackbarFeedback
        message={msgError || null}
        show={!!msgError}
        isError={true}
      />
    </PageWrapper>
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

export default ListAllTranscript;
