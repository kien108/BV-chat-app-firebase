import { Select as AntSelect, SelectProps } from "antd";
import { DefaultOptionType } from "antd/lib/select";
import { useRef, useState } from "react";
import {
   Container,
   InputMessageStyle,
   StyledLabelSelect,
   StyledSelect,
   StyledTitleSelect,
} from "./styles";
import "./styles.scss";
import DownArrowSvgComponent from "./DownArrowSvgComponent";
import { NOTHING_FOUND, OptionType } from "./types";

export interface CustomSelectProps extends SelectProps<any> {
   error?: boolean;
   options?: OptionType[];
   optionsTag?: OptionType[];
   name: string;
   message?: string;
   label?: string;
   isEdit?: boolean;
   title?: string;
   required?: boolean;
   selectedItems?: Array<string | number>;
   setSelectedItems?: any;
   onChange: (value: any, name: DefaultOptionType | DefaultOptionType[]) => void;
}
const Select = ({
   error,
   options,
   message,
   isEdit,
   name,
   allowClear,
   placeholder,
   onChange,
   optionsTag,
   selectedItems,
   setSelectedItems,
   ...props
}: CustomSelectProps) => {
   const status = error ? "error" : "";

   const hanleOnChange = (value: any, name: DefaultOptionType | DefaultOptionType[]) => {
      onChange && onChange(value, name);
      props.mode && setSelectedItems && (setSelectedItems(value) as unknown);
   };

   return (
      <StyledSelect
         options={options}
         message={message}
         isEdit={isEdit}
         name={name}
         allowClear={allowClear}
         placeholder={placeholder}
         onChange={(value) => {
            // onChange(value);
            hanleOnChange(value, name as unknown as DefaultOptionType | DefaultOptionType[]);
         }}
         optionsTag={optionsTag}
         selectedItems={selectedItems}
         setSelectedItems={setSelectedItems}
         status={status}
      />
   );
};

export default Select;
