import { Select as AntSelect, Typography } from "antd";
import styled, { css } from "styled-components";
import { CustomSelectProps } from "./Select";

export const Container = styled.div<{ isError?: boolean | undefined }>`
   position: relative;
`;

export const StyledSelect = styled(AntSelect)<CustomSelectProps>`
   z-index: 0;
   width: 100%;

   .ant-select-selector,
   input {
      border-radius: 10px !important;
      height: 56px !important;

      &.ant-select-selection-search-input {
         border: none !important;
      }
   }

   span {
      text-align: left;
   }

   .ant-select-selector {
      &:focus,
      &:hover,
      &:focus-within {
         border: solid 2px ${(props) => props.theme.strongBlue} !important;
         box-shadow: none !important;
      }
   }

   .ant-select:not(.ant-select-customize-input) .ant-select-selector {
      transition: none;
   }

   .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
      .ant-select-selector {
      border: none;
      outline: 2px solid #000;
      box-shadow: none !important;
   }

   .ant-select-arrow {
      font-size: 18px;
   }

   .ant-select-clear {
      background-color: transparent;
      margin-top: -8px !important;
      font-size: 18px;
      margin-left: 24px;
   }

   .ant-select-selector:focus-within ~ .ant-select-arrow {
      transition: transform 400ms ease !important;
      transform: rotate(-180deg) !important;
   }

   .anticon-close-circle {
      transform: translateX(-30px);
   }

   .ant-select-selection-item {
      margin-top: 18px;
      margin-left: ${(props) => props.mode && "7px"};
   }

   .ant-select-selection-placeholder {
      margin-top: ${(props) => (!props.mode ? "22px" : "12px")};
   }

   .ant-select-selection-search > .ant-select-selection-search-input {
      padding-top: 20px !important;
   }
`;

export const StyledLabelSelect = styled(Typography)<{ isShowLabel?: boolean }>`
   z-index: 999;
   position: absolute;
   color: ${(props) => props.theme.strongGray};
   text-align: left;

   ${(props) =>
      props.isShowLabel
         ? css`
              transform: translateY(50%);
              font-size: 16px;
           `
         : css`
              transform: translateY(26%);
           `};

   padding-left: 12px;
   transition: all 0.3s;
   pointer-events: none;
`;

export const StyledTitleSelect = styled(Typography)`
   font-size: 13px;
   font-weight: 600;
   margin-bottom: 4px;
   color: ${(props) => props.theme.textDefault};
   text-align: left;
   display: flex;

   .required-mark {
      color: red;
   }
`;

export const InputMessageStyle = styled.span<{
   error: boolean | undefined;
}>`
   text-align: left;
   font-size: 12px;
   color: ${(props) => props.theme.red};
   display: inline-block;
   margin-top: 5px;
   width: 100% !important;
`;
