import { PageWrapper } from "@/components/commons/PageWraper";
import MenuCards from "@/components/commons/MenuCards";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button } from "@material-tailwind/react";
import { useTranslation } from "next-i18next";
import { Box } from "@mui/material";
import { changeLanguage } from "i18next";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;

  const handleLanguageChange = (langValue: string) => {
    i18n.changeLanguage(langValue);
    router.push({ pathname, query }, undefined, { locale: langValue });
  };
  return (
    <>
      <Head>
        <title>Poder Judicial</title>
      </Head>
      <PageWrapper>
        <div style={{ flexDirection: "row" }}>
          <Box
            height={200}
            my={4}
            display="flex"
            alignItems="center"
            alignContent={"center"}
            flexDirection={"row"}
            justifyContent={"center"}
            gap={4}
            p={2}
          >
            <Button
              onClick={() => handleLanguageChange("en")}
              size="lg"
              color={locale == "en" ? "indigo" : "blue-gray"}
              variant="gradient"
              placeholder={""}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {t("LANGUAGES.en")}
            </Button>
            <Button
              onClick={() => handleLanguageChange("es")}
              size="lg"
              color={locale == "es" ? "indigo" : "blue-gray"}
              variant="gradient"
              placeholder={""}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {t("LANGUAGES.es")}
            </Button>
            <Button
              onClick={() => handleLanguageChange("pt")}
              size="lg"
              color={locale == "pt-BR" ? "indigo" : "blue-gray"}
              variant="gradient"
              placeholder={""}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {t("LANGUAGES.pt")}
            </Button>
          </Box>
        </div>
      </PageWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  // console.log("getServerSideProps", locale);
  // const res = serverSideTranslations(locale || 'en');
  // const [data] = await Promise.all([res]);

  return {
    props: {
      ...(await serverSideTranslations(locale || "en")),
    },
  };
  // return {
  //     props: {
  //         ...((await serverSideTranslations(locale)),
  //     },
  // };
};
