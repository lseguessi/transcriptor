import "@/lib/styles/globals.css";
import "@/lib/styles/app.css";

import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "@material-tailwind/react";
import Chatbot from "@/components/commons/ChatBot";
import CustomScriptChatBot from "@/lib/utils/CustomScriptChatBot";
import { useRouter } from "next/router";
import { GoogleOAuthProvider } from '@react-oauth/google';


function App({ Component, pageProps }: any) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login" || router.pathname === "/"; //

  return (
    <GoogleOAuthProvider clientId="225948906166-ed2ipdkfhnp6ff08eg0283e2mni79bmg.apps.googleusercontent.com">
      <ThemeProvider>
        <Component {...pageProps} />
        {!isLoginPage && (
          <>
            <Chatbot />
            <CustomScriptChatBot />
          </>
        )}
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default appWithTranslation(App);
