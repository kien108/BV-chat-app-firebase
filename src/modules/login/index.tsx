import React from "react";
import "antd/dist/antd.variable.min.css";

import firebase, { auth } from "../../firebase/config";

import { BsFacebook } from "react-icons/bs";
import { AiFillGoogleCircle } from "react-icons/ai";

import Button from "../../components/button";

import { Title } from "../../components/typhography";

import { addDocument, generateKeywords } from "../../firebase/services";
import styled from "styled-components";
import useToggle from "../../hooks/useToggle";

const fbProvider = new firebase.auth.FacebookAuthProvider();

const StyledLogin = styled.div`
   background-image: linear-gradient(to right, rgb(97, 55, 133), rgb(73, 54, 148));
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 0px 10px;

   .container {
      width: 400px;
      display: flex;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      background-color: ${(props) => props.theme.colors.black};
      padding: 50px 30px;
      border-radius: 10px;
      gap: 20px;

      .title {
         color: ${(props) => props.theme.colors.txtPrimary};
         font-size: 3.5rem;
         font-weight: 600;
         margin-bottom: 3rem;
      }

      .btn-google {
         gap: 10px;
         font-size: 1.5rem;
         background-color: red;
      }

      .btn-facebook {
         background-color: #2374e1;
         gap: 10px;
         font-size: 1.5rem;
      }
   }
`;

const Container = styled.div``;
const Login = () => {
   const handleFbLogin = async () => {
      const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);

      if (additionalUserInfo && user && additionalUserInfo.isNewUser) {
         const data = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: additionalUserInfo.providerId,
            keywords: generateKeywords(user.displayName || ""),
         };

         addDocument("users", data);
      }
   };
   const [show, setShow] = useToggle();

   return (
      <StyledLogin>
         <Container className="container">
            <Title
               className="title"
               style={{
                  textAlign: "center",
               }}
               level={2}
            >
               Login
            </Title>
            <Button
               icon={<AiFillGoogleCircle size={27} />}
               className="btn-google"
               style={{ width: "100%", marginBottom: 5 }}
            >
               Login with Google
            </Button>
            <Button
               icon={<BsFacebook size={26} />}
               className="btn-facebook"
               style={{ width: "100%" }}
               onClick={handleFbLogin}
            >
               Login with Facebook
            </Button>
         </Container>
      </StyledLogin>
   );
};

export default Login;
