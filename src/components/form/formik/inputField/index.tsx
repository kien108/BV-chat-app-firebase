import { InputProps } from "antd";
import React from "react";
import styled, { css } from "styled-components";
import Input, { InputPassword } from "../../input";
import { ErrorMessage } from "formik";

interface Props extends InputProps {
   field: any;
   form: any;

   layout?: string;
   label?: string;
}

const StyledInputField = styled.div<{ layout?: string }>`
   &.input-container {
      width: 100%;

      .input-field {
         display: flex;
         align-items: center;

         ${(props) =>
            props.layout === "vertical" &&
            css`
               flex-direction: column;
               align-items: flex-start;
               gap: 0.5rem;
            `}
      }

      .input-error {
         color: #b71616;
         font-weight: 300;
         margin-top: 1rem;
         margin-bottom: 0;
         font-size: 1.3rem;
      }
   }
`;

const InputField: React.FC<Props> = (props) => {
   const { form, field, label, layout, ...inputProps } = props;
   const { name } = field;
   const { errors, touched } = form;
   const showError = errors[name] && touched[name];

   return (
      <StyledInputField layout={layout} className="input-container">
         <div className="input-field">
            {label && (
               <label htmlFor={name} className="input-label">
                  {label}
               </label>
            )}
            {props.type === "password" ? (
               <InputPassword
                  {...inputProps}
                  {...field}
                  error={showError}
                  id={name}
                  className="input-content"
               />
            ) : (
               <Input
                  {...inputProps}
                  {...field}
                  error={showError}
                  id={name}
                  className="input-content"
               />
            )}
         </div>
         <p className="input-error">
            <ErrorMessage name={name} />
         </p>
      </StyledInputField>
   );
};

InputField.defaultProps = {
   layout: "horizontal",
};

export default InputField;
