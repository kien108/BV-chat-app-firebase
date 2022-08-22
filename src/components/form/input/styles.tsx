import { Input } from "antd";
import styled from "styled-components";

const StyledInput = styled(Input)``;

const StyledInputPassword = styled(Input.Password)`
   display: flex !important;
   align-items: center;
`;

export default StyledInput;
export { StyledInputPassword };
