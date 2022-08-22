import { UserAddOutlined } from "@ant-design/icons";
import { Alert, Avatar, Form, Tooltip, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { formatRelative } from "date-fns/esm";
import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../../../context/AppProvider";
import { AuthContext } from "../../../context/AuthProvider";
import { addDocument } from "../../../firebase/services";
import useFireStore from "../../../hooks/useFireStore";
import Message from "../components/Message";

import Input from "../../../components/form/input";

import Button from "../../../components/button";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const { Text, Paragraph } = Typography;

import { IoMdArrowRoundBack } from "react-icons/io";
import { BsEmojiSunglasses } from "react-icons/bs";
import { FaBars } from "react-icons/fa";

const StyledHeader = styled.div`
   display: flex;
   align-items: center;
   height: 60px;
   padding: 0px 20px;
   border-bottom: 1px solid rgba(230, 230, 230);
   justify-content: space-between;

   .header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      &__title {
         margin: 0;
         font-weight: bold;
         font-size: 15px;
         color: ${(props) => props.theme.colors.txtPrimary};
      }

      &__description {
         font-size: 13px;
         margin-bottom: 0;
         color: ${(props) => props.theme.colors.txtThird};
         font-weight: 500;
      }
   }

   .btn-menu {
      display: none;
   }

   .md & {
      .btn-back {
         display: none;
      }
      .btn-menu {
         display: block;
         background-color: transparent;
         display: flex;
      }
   }
`;

const StyledButtonGroup = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
`;

const WrapperStyled = styled.div`
   height: 100vh;
   background-color: ${(props) => props.theme.colors.bgGroupContent};

   .btn-emoji {
      position: relative;

      em-emoji-picker {
         position: absolute;
         right: 110%;
         bottom: 0;
      }
   }
`;

const StyledContent = styled.div`
   height: calc(100% - 56px);
   display: flex;
   flex-direction: column;
   padding: 11px;
   justify-content: flex-end;
`;

const StyledForm = styled(Form)`
   display: flex;
   align-items: center;
   gap: 20px;
   padding: 4px;
   border: 1.5px solid ${(props) => props.theme.colors.primary};
   border-radius: 6px;

   .ant-form-item {
      margin-bottom: 0;
      flex: 1;
   }

   .ant-input {
      color: ${(props) => props.theme.colors.txtPrimary};
   }
`;

const StyledMessageList = styled.div`
   max-height: 100%;
   overflow-y: auto;
   display: flex;
   flex-direction: column;
   gap: 15px;
   background-color: ${(props) => props.theme.colors.bgGroupContent};

   .wrapper {
      .author-header {
         .author {
            color: ${(props) => props.theme.colors.txtPrimary};
            font-weight: 500;
         }
         .date {
            color: ${(props) => props.theme.colors.txtThird};
         }
      }
   }

   .content {
      color: ${(props) => props.theme.colors.txtThird};
      font-weight: 600;
   }
`;

const ChatWindow = () => {
   const [inputValue, setInputValue] = useState("");
   const [form] = useForm();
   const [chosenEmoji, setChosenEmoji] = useState(false);

   const { selectedRoom, members, setAddInviteMemberVisible, currentScreen, setSelectedRoomId } =
      useContext(AppContext);

   const { user } = useContext(AuthContext);

   const { uid, photoURL, displayName } = user || {};

   const handleInputChange = (e: any) => {
      setInputValue(e.target.value);
   };

   const handleSubmit = () => {
      addDocument("messages", {
         text: inputValue,
         uid,
         photoURL,
         roomId: selectedRoom && selectedRoom.id,
         displayName,
      });

      form.resetFields(["message"]);
      setInputValue("");
      setChosenEmoji(false);
   };

   const conditionMessages = useMemo(() => {
      return {
         fieldName: "roomId",
         operator: "==",
         compareValue: selectedRoom && selectedRoom.id,
      };
   }, [selectedRoom && selectedRoom.id]);
   const messages = useFireStore("messages", conditionMessages);

   const formatDate = (seconds: number) => {
      let formattedDate = "";

      if (seconds) {
         formattedDate = formatRelative(new Date(seconds * 1000), new Date());
      }

      return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
   };

   const onEmojiClick = (emoji: any) => {
      setInputValue((prev) => prev + emoji.native);
   };

   const handleOpenMenu = () => {};

   return (
      <WrapperStyled>
         {selectedRoom && selectedRoom.id ? (
            <>
               <StyledHeader>
                  <Button
                     className="btn-back"
                     onClick={() => setSelectedRoomId && setSelectedRoomId("")}
                     icon={<IoMdArrowRoundBack size={26} />}
                  />
                  <Button
                     className="btn-menu"
                     onClick={handleOpenMenu}
                     icon={<FaBars size={26} />}
                  />
                  <div className="header">
                     <Text className="header__title">{selectedRoom.name}</Text>
                     <Paragraph className="header__description">
                        {selectedRoom.description}
                     </Paragraph>
                  </div>
                  <StyledButtonGroup>
                     <Button
                        icon={<UserAddOutlined />}
                        type="text"
                        onClick={() => setAddInviteMemberVisible && setAddInviteMemberVisible(true)}
                     >
                        Add User
                     </Button>
                     <Avatar.Group maxCount={2}>
                        {members &&
                           members.map((member) => (
                              <Tooltip title={member.displayName} key={member.uid}>
                                 <Avatar src={member.photoURL}>
                                    {member.photoURL
                                       ? ""
                                       : member.displayName
                                       ? member.displayName.charAt(0).toUpperCase()
                                       : "U"}
                                 </Avatar>
                              </Tooltip>
                           ))}
                     </Avatar.Group>
                  </StyledButtonGroup>
               </StyledHeader>
               <StyledContent>
                  <StyledMessageList>
                     {messages &&
                        messages.map((msg: any) => (
                           <Message
                              key={msg.id}
                              text={msg.text}
                              photoURL={msg.photoURL}
                              createAt={formatDate(msg?.createAt?.seconds)}
                              displayName={msg.displayName}
                           />
                        ))}
                  </StyledMessageList>
                  <StyledForm form={form}>
                     <Form.Item name="message">
                        <Input
                           value={inputValue}
                           onChange={handleInputChange}
                           onPressEnter={handleSubmit}
                           bordered={false}
                           autoComplete="off"
                           placeholder="Enter message..."
                        />
                     </Form.Item>
                     <Button
                        className="btn-emoji"
                        onClick={() => setChosenEmoji((prev) => !prev)}
                        icon={<BsEmojiSunglasses size={20} />}
                     >
                        {chosenEmoji && (
                           <Picker
                              className="emoji-picker"
                              data={data}
                              onEmojiSelect={(e: any) => onEmojiClick(e)}
                           />
                        )}
                     </Button>

                     <Button onClick={handleSubmit}>Send</Button>
                  </StyledForm>
               </StyledContent>
            </>
         ) : (
            <Alert message="Please select room" type="info" showIcon closable />
         )}
      </WrapperStyled>
   );
};

const checkRoute = () => {
   const paths = location.pathname.split("/");
   if (location.pathname.includes("/admin")) return paths.slice(0, 2).join("/");

   return paths[0];
};
export default ChatWindow;
