import { InputProps } from "rc-input";
import React from "react";
import StyledInput, { StyledInputPassword } from "./styles";

interface Props extends InputProps {
   error?: boolean;
   bordered: boolean;
}

const Input: React.FC<Props> = (props) => {
   const { error } = props;
   const status = error ? "error" : "";

   return <StyledInput {...props} status={status} />;
};

const InputPassword: React.FC<Props> = (props) => {
   const { error } = props;
   const status = error ? "error" : "";
   return <StyledInputPassword {...props} status={status} />;
};

export default Input;
export { InputPassword };
