import { useEffect, useState } from "react";
import { DefWrapper } from "./styled";

const Chatbot = () => {
  const [reloadKey, setReloadKey] = useState(0);
  let dfMessenger: any = null;
  let msgReceived: any = null;

  const initializeMessenger = () => {
    const user: any = localStorage.getItem("info");
    const processSelected: any = localStorage.getItem("process");
    const userEmail = JSON.parse(user).email;
    console.log("Dialogflow Carregado!!!");
    dfMessenger = document.querySelector("df-messenger");
    dfMessenger.clearStorage();
    const queryParameters = {
      parameters: {
        email: userEmail,
        process: processSelected,
      },
    };
    dfMessenger.setQueryParameters(queryParameters);
    dfMessenger.sendRequest("event", "WELCOME");
    console.log("Dialogflow Carregado!!!");

    document.addEventListener("df-request-sent", (event: any) => {
      console.log("Request", event.detail.data.requestBody);
    });

    document.addEventListener("df-response-received", async (event: any) => {
      console.log("event2", event.detail.messages);
      msgReceived = event.detail.messages;
    });

    document.addEventListener("df-button-clicked", async (event: any) => {
      console.log("event", event);
      const text = event.detail.text;
      console.log("msg: ", msgReceived);

      const filteredArray = msgReceived.filter((item: any) => {
        if (!item.richElements) {
          return null;
        } else {
          return item.richElements.some((element: any) => {
            return element.text === text;
          });
        }
      });

      const notNullArray = filteredArray.filter((valor: any) => valor !== null);
      const names = notNullArray.map((item: any) => {
        console.log(item);
        return item.richElements[0].event.name;
      });
      (dfMessenger as any).sendRequest("event", names[0]);
    });
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css";
    document.head.appendChild(link);

    document.addEventListener("df-messenger-loaded", initializeMessenger);

    return () => {
      document.head.removeChild(link);
      document.removeEventListener("df-messenger-loaded", initializeMessenger);
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setReloadKey((prevKey) => prevKey + 1);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (dfMessenger) {
      initializeMessenger();
    }
  }, [reloadKey]);

  return (
    <DefWrapper key={reloadKey}>
      <df-messenger
        id="dfm"
        className={"dft-messenger"}
        project-id="br-cnj-cld-01"
        agent-id="cf02de2d-5ba9-4a5c-8eab-f421d623fcb8"
        language-code="pt-br"
        chat-title="Asistente"
        chat-icon="https://storage.googleapis.com/docs-chatico/ChaticoBogota.png"
        location="us-central1"
      ></df-messenger>
    </DefWrapper>
  );
};

export default Chatbot;
