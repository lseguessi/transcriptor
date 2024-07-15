// components/CustomScript.js
import Script from 'next/script';

const CustomScript = () => (
  <Script
    src="https://cloud.google.com/ai/gen-app-builder/client?hl=en_US"
    strategy="beforeInteractive"
  />
);

export default CustomScript;
