import { InputProps } from "antd";
import { ErrorMessage } from "formik";
import React from "react";
import styled, { css } from "styled-components";
import Input from "../../input";
import Select from "../../select/Select";
import { OptionType } from "../../select/types";

interface Props extends InputProps {
   field: any;
   form: any;

   layout?: string;
   label?: string;
}

const StyledSelectField = styled.div<{ layout?: string }>`
   &.input-container {
      width: 100%;

      .input-field {
         display: flex;
         align-items: center;
         width: 100%;

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

const SelectField: React.FC<Props> = (props) => {
   const { form, field, label, layout, ...selectProps } = props;

   const { name, onChange } = field;
   const { errors, touched } = form;

   const showError = errors[name] && touched[name];

   const handelChange = (value: any) => {
      console.log(value);
      const changeEvent = {
         target: {
            name,
            value,
         },
      };

      field.onChange(changeEvent);
   };

   return (
      <StyledSelectField layout={layout} className="input-container">
         <div className="input-field">
            {label && (
               <label htmlFor={name} className="input-label">
                  {label}
               </label>
            )}
            <Select
               {...selectProps}
               {...field}
               id={field.name}
               onChange={handelChange}
               error={showError}
            />
         </div>

         <p className="input-error">
            <ErrorMessage name={name} />
         </p>
      </StyledSelectField>
   );
};

SelectField.defaultProps = {
   layout: "horizontal",
};

export default SelectField;
