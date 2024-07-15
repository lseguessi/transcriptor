import Head from "next/head";
import { PageWrapper } from "@/components/commons/PageWraper";
import MenuCards from "@/components/commons/MenuCards";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    setTimeout(() => {

      // checkSession();
    }, 5000);

  }, []);

  return (
    <>
      <Head>
        <title>Poder Judicial</title>
      </Head>
      <PageWrapper>
        <div style={{ flexDirection: "row" }}>
          <MenuCards maxWidth={300} />
        </div>
      </PageWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale || "en")),
    },
  };
};
export default Home;
