// components/CustomScript.js
import Script from 'next/script';

const CustomScriptChatBot = () => (
  <Script
    src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"
    strategy="lazyOnload"
  />
);

export default CustomScriptChatBot;
