import styled from 'styled-components';

type InputContainerProps = {
  error?: string;
};

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  align-items: center;
  padding: 16px 12px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 22px;
  width: 500px;
  height: 68px;
  position: relative;
  border: 1px solid ${({ error }) => (error ? '#FF0000' : '#D3E2EA')};

  .divider {
    position: absolute;
    border-left: 1px solid ${({ error }) => (error ? '#FF0000' : '#D3E2EA')};
    height: 68px;
    left: 44px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const StyledInput = styled.input`
  border: none;
  flex: 1;
  outline: none;
  color: #1A1D1F;
`;

export const Icon = styled.span`
  margin-right: 28px;
`;