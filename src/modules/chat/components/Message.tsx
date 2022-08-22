import { Avatar, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const { Text } = Typography;

const StyledWrapper = styled.div`
   margin-bottom: 10px;

   .wrapper {
      display: flex;

      .author-header {
         display: flex;
         align-items: center;
         align-self: flex-start;

         .author {
            margin: 0px 5px 0px 10px;
            font-weight: bold;
         }

         .date {
            margin-left: 5px;
            font-size: 11px;
            color: #a7a7a7;
         }
      }
   }

   .content {
      margin-left: 40px;
   }
`;

interface Props {
   text: string;
   displayName: string;
   createAt: string;
   photoURL: string;
}
const Message: React.FC<Props> = (props) => {
   const { text, displayName, createAt, photoURL } = props;

   return (
      <StyledWrapper>
         <div className="wrapper">
            <Avatar src={photoURL}>{photoURL ? "" : displayName.charAt(0).toUpperCase()}</Avatar>
            <div className="author-header">
               <Text className="author">{displayName}</Text>
               <Text className="date">{createAt}</Text>
            </div>
         </div>
         <div className="">
            <Text className="content">{text}</Text>
         </div>
      </StyledWrapper>
   );
};

export default Message;
