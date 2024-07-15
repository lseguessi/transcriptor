import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: auto;
  height: 100vh;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const LoginImage = styled.img`
  width: 110%; // Aumentar a largura da imagem
  height: 100%;
  object-fit: cover;
  position: relative; // Adicionado aqui
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FormSide = styled.div`
  width: 100%;
  height: 100%;

  
  background-color: white;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  z-index: 1;

  display: flex;
  object-fit: cover;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  h1 {
    color: #AD2517;
    font-size: 36px;
    line-height: 42px;
    margin-top: 20px;
    font-weight: 500;
  }

  h3 {
    color: #1A1D1F;
    font-size: 22px;
    line-height: 26px;
    font-weight: 400;
    margin-top: 20px;
  }

  p {
    margin-top: 36px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const FormMobile = styled.div`
  display: none;

  @media (max-width: 768px) {
    width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  background-color: white;  

  position: absolute;
  overflow-x: hidden;
  top: 15%;
  }

`;

export const LogoStf = styled.img`
  width: 200px;
  height: 151px;
`;

export const ButtonLogin = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 500px;
  height: 57px;
  background-color: #AD2517;
  border-radius: 12px;
  margin-top: 32px;
  border: none;
  color: white;
  font-size: 22;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SocialLogin = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 20px;
`;

export const BtnSocialLogin = styled.div`
  width: 144px;
  height: 48px;
  background-color: #EFF4F5;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 15px;
  font-weight: bold;
  font-family: "Inter", sans-serif;
  gap: 8px;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`