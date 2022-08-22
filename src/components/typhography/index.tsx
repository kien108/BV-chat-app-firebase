import { ParagraphProps } from "antd/lib/typography/Paragraph";
import { TextProps } from "antd/lib/typography/Text";
import { TitleProps } from "antd/lib/typography/Title";
import React from "react";
import { IStyled, StyledParagraph, StyledText, StyledTitle } from "./styles";

export interface IParagraphProps extends ParagraphProps {
   color?: string;
   p?: string;
   m?: string;
   rounded?: string;
   bg?: string;
}

const Title: React.FC<IStyled & TitleProps> = (props) => {
   return <StyledTitle {...props}>{props.children}</StyledTitle>;
};

const Paragraph: React.FC<IParagraphProps> = (props) => {
   return <StyledParagraph {...props}>{props.children}</StyledParagraph>;
};

const Text: React.FC<IStyled & TextProps> = (props) => {
   return <StyledText {...props}>{props.children}</StyledText>;
};

export { Title, Paragraph, Text };
