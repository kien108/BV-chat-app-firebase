import { Typography } from "antd";
import { ParagraphProps } from "antd/lib/typography/Paragraph";
import { TextProps } from "antd/lib/typography/Text";
import { TitleProps } from "antd/lib/typography/Title";
import styled from "styled-components";
import { IParagraphProps } from ".";

export interface IStyled {
   color?: string;
}

export const StyledTitle = styled(Typography.Title)<IStyled & TitleProps>`
   &.ant-typography {
      font-weight: 600;
      margin: 0;
      color: ${(props) => (props.color ? props.color : props.theme.textDefaultColor)};

      ${(props) =>
         props.level === 1
            ? "font-size: 30px; line-height: 36px"
            : props.level === 2
            ? "font-size: 24px; line-height: 32px"
            : props.level === 3
            ? "font-size: 20px; line-height: 28px"
            : props.level === 4
            ? "font-size: 18px; line-height: 24px"
            : props.level === 5
            ? "font-size: 16px; line-height: 20px"
            : "font-size: 30px; line-height: 36px"};
   }
`;

export const StyledText = styled(Typography.Text)<IStyled & TextProps>`
   color: ${(props) => (props.color ? props.color : props.theme.textDefaultColor)};
   font-size: 14px;
   line-height: 20px;
   margin: 0;
`;

export const StyledParagraph = styled(Typography.Paragraph)<IParagraphProps>`
   color: ${(props) => (props.color ? props.color : props.theme.textDefaultColor)};
   font-size: 14px;
   line-height: 20px;
   margin: 0;

   margin: ${(props) => (props.m ? props.m : "0")};
   padding: ${(props) => (props.p ? props.p : "0")};
   border-radius: ${(props) => (props.rounded ? props.rounded : "0")};
   background: ${(props) => (props.bg ? props.bg : "white")};
`;
