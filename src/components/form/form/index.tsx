import { FormProps } from "antd";
import React from "react";
import StyledForm from "./styles";

interface Props extends FormProps {}

const Form: React.FC<Props> = (props) => {
   return <StyledForm {...props}>aa</StyledForm>;
};

export default Form;
