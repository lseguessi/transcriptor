import styled from "styled-components";

export const DefWrapper = styled.div`
  df-messenger {
    z-index: 999;
    position: fixed;
    --df-messenger-font-color: #000;
    --df-messenger-font-family: Google Sans;
    --df-messenger-chat-background: #f3f6fc;
    --df-messenger-chat-window-height: 500px !important;
    --df-messenger-chat-window-width: 80vw !important;
    --df-messenger-chat-padding: 124px 124px 18px 124px !important;

    margin: 0;
    padding: 0;
    position: fixed;
    right: 10vw;
    bottom: 5vh;
    transform: translateX(50%) translateY(50%);

    @media (max-width: 1024px) {
      --df-messenger-chat-window-width: 90vw !important;
      --df-messenger-chat-padding: 124px 24px 18px 24px !important;
      right: 0vw;
    }
  }
`;
