import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";

import variables from "../../assets/scss/variables.module.scss";

import { motion } from "framer-motion";
const StyledHeader = styled(motion.div)`
   display: flex;
   align-items: center;
   justify-content: center;

   .logo {
      width: 100px;
      aspect-ratio: 1;
      overflow: hidden;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }

   .name {
      color: ${variables.txtPrimary};

      .first {
         text-transform: uppercase;
         font-weight: bold;
         display: block;
         font-size: 1.8rem;
      }

      .second {
         font-size: 1.3rem;
         margin-left: 10px;
         color: ${variables.txtSecondary};
      }
   }
`;

const NavHeader = () => {
   return (
      <StyledHeader
         initial={{
            x: "100%",
         }}
         animate={{
            x: 0,
         }}
         transition={{
            duration: 0.8,
         }}
      >
         <div className="logo">
            <img src={logo} alt="" />
         </div>
         <div className="name">
            <span className="first">digital</span>
            <span className="second">management</span>
         </div>
      </StyledHeader>
   );
};

export default NavHeader;
