import React from 'react';
import { Icon, InputContainer, StyledInput } from './styles';

type CustomInputProps = {
  type: string;
  icon: JSX.Element;
  name: string;
  id: string;
  placeholder: string;
  onChange: (value: string) => void;
  error?: string;
};

const CustomInput = ({ type, icon, placeholder, onChange, error  }: CustomInputProps) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <InputContainer error={error}>
      {icon && <Icon>{icon}</Icon>}
      <div className='divider' />
      <StyledInput type={type} placeholder={placeholder} onChange={handleChange} />
    </InputContainer>
  );
};

export default CustomInput;
