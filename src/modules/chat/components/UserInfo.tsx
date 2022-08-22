import { Avatar, Typography } from "antd";
import Button from "../../../components/button";

import { useEffect, useContext } from "react";
import styled from "styled-components";

import { auth, db } from "../../../firebase/config";
import { MdDarkMode, MdWbSunny } from "react-icons/md";

import { AuthContext } from "../../../context/AuthProvider";
import useDarkMode from "../../../hooks/useDarkMode";
const WrapperStyled = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 12px 16px;
   border-bottom: 1px solid rgba(82, 38, 83);
   gap: 5px;

   .auth {
      display: flex;
      align-items: center;
      gap: 10px;

      .username {
         color: white;
         font-size: 1.3rem;
      }
   }

   .ant-btn.btn-toggle {
      background-color: transparent;
      color: #d4d40c;
      cursor: pointer;
   }
`;

const UserInfo = () => {
   const { user } = useContext(AuthContext);

   const { displayName, photoURL } = user || {};

   useEffect(() => {
      db.collection("users").onSnapshot((snapshot) => {
         const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
         }));
      });
   }, []);

   const [isDarkMode, toggleDarkMode] = useDarkMode();

   return (
      <WrapperStyled>
         <Button
            className="btn-toggle"
            onClick={toggleDarkMode}
            icon={!isDarkMode ? <MdDarkMode size={40} /> : <MdWbSunny size={40} />}
         ></Button>
         <div className="auth">
            <Avatar size="small" src={photoURL}>
               {photoURL ? "" : displayName?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography.Text className="username">{displayName}</Typography.Text>
         </div>
         <Button
            ghost
            onClick={() => {
               auth.signOut();
            }}
         >
            Log out
         </Button>
      </WrapperStyled>
   );
};

export default UserInfo;
