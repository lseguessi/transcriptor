"use client";
import { useState } from "react";
import { authLogin } from "@/lib/services/auth-request";
import { UnauthorizedError } from "@/lib/services/exceptions/UnauthorizedError";
import {
  getTokenCookie,
  setToken,
  setTokenCookie,
  setUser,
} from "@/lib/services/storage/app-storage";
import { useRouter } from "next/router";
import {
  ButtonLogin,
  Container,
  FormMobile,
  FormSide,
  LoginImage,
  LogoStf,
} from "../../components/pages/login/styled";
import { t } from "i18next";
import CustomInput from "@/components/commons/InputText";
import { TfiEmail } from "react-icons/tfi";
import { IoLockClosedOutline } from "react-icons/io5";
import { TailSpin } from "react-loader-spinner";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import {
  GoogleLogin,
  hasGrantedAllScopesGoogle,
  useGoogleLogin,
} from "@react-oauth/google";

import axios from "axios";

function Login() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setIsloading(true);
      if (codeResponse && codeResponse.access_token) {
        setToken(codeResponse.access_token);
        setTokenCookie(codeResponse.access_token);
        localStorage.setItem("google_access_token", codeResponse.access_token);
        fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setUser(data);
            localStorage.setItem("google_user", JSON.stringify(data));
            setTimeout(() => {
              setIsloading(false);
              router.push("/home");
            }, 3000);
          })
          .catch((e: UnauthorizedError | Error | any) => {
            console.log("error mess", e);
            setIsloading(false);
            setErrorMessage(e?.message);
          });
      }
    },
    flow: "implicit",
    scope: "https://www.googleapis.com/auth/drive.readonly",
  });

  // const handlerLogin = async () => {
  //   login();

  //   setErrorMessage(null);
  //   if (!email || !password) {
  //     setTimeout(() => {
  //       setErrorMessage("Digite seu email e senha para prosseguir");
  //     }, 500);
  //     return;
  //   }
  //   setIsloading(true);
  //   try {
  //     const response = await authLogin({ email, password });
  //     console.log("ressss", response);
  //     if (response) {
  //       // setToken(response.data?.api_token);
  //       // setTokenCookie(response.data?.api_token);
  //       // setUser(response.data?.user);
  //       setTimeout(() => {
  //         setIsloading(false);
  //         router.push("/home");
  //       }, 3000);
  //     }
  //   } catch (e: UnauthorizedError | Error | any) {
  //     console.log("error mess", e);
  //     setIsloading(false);
  //     setErrorMessage(e?.message);
  //   }
  // };

  return (
    <Container>
      <LoginImage src="../images/login-img.png" alt="Sede poder judicial" />
      <FormSide>
        <LogoStf src="../images/logo_peru.png" alt="Poder Judicial Logo" />
        <h1>{t("WELCOME")}</h1>
        {/* <h3>{t("FILL_DATA")}</h3>
        <CustomInput
          type="email"
          name="email"
          id="email"
          placeholder={t("Informe seu e-mail")}
          icon={<TfiEmail color={"#ddd"} />}
          onChange={(v) => setEmail(v)}
        />
        <CustomInput
          type="password"
          name="password"
          id="password"
          onChange={(v) => setPassword(v)}
          placeholder={t("Informe sua senha")}
          icon={<IoLockClosedOutline color={"#ddd"} />}
        />
        <p style={{ fontSize: "14px", color: "red", fontStyle: "italic" }}>
          {errorMessage}
        </p> */}
        <ButtonLogin onClick={() => login()}>
          {isLoading == true ? (
            <TailSpin
              visible={true}
              height="30"
              width="30"
              color="white"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <>{t("Entrar")}</>
          )}
        </ButtonLogin>
      </FormSide>

      <FormMobile>
        <LogoStf src="../images/logo_peru.png" alt="Logotipo STF" />
        <h2>{t("Seja bem-vindo")}</h2>
        {/* <h4>{t("FILL_DATA")}</h4> */}
        {/* <CustomInput
          type="email"
          name="email"
          id="email"
          placeholder={t("Informe seu e-mail")}
          icon={<TfiEmail color={"#D3E2EA"} />}
          onChange={(v) => setEmail(v)}
        />

        <CustomInput
          type="password"
          name="password"
          id="password"
          onChange={(v: any) => setPassword(v)}
          placeholder={t("Informe sua senha")}
          icon={<IoLockClosedOutline color={"#D3E2EA"} />}
        /> */}

        {/* <p style={{ fontSize: "16px", color: "red", fontStyle: "italic" }}>
          {errorEmail} {errorPassword} {errorLogin}
        </p> */}

        {/* <SocialLogin>
          <BtnSocialLogin>
            <img src="/icons/google.svg" alt="" />
            Google
          </BtnSocialLogin>
          <BtnSocialLogin>
            <img src="/icons/outlook.svg" alt="" />
            Outlook
          </BtnSocialLogin>
        </SocialLogin> */}

        <ButtonLogin onClick={() => login()}>
          {isLoading == true ? (
            <TailSpin
              visible={true}
              height="30"
              width="30"
              color="white"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <>{t("Entrar")}</>
          )}
        </ButtonLogin>
      </FormMobile>
    </Container>
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

export default Login;
