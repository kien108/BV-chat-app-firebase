import React from "react";
import styled from "styled-components";

import variables from "../../assets/scss/variables.module.scss";
import { devices } from "../../utils/devices";

import Navigation from "../navigation";

import { Layout as AntLayout } from "antd";
import { Outlet } from "react-router-dom";

const { Content, Sider } = AntLayout;

const StyledLayout = styled(AntLayout)`
   height: 100vh;

   .ant-layout {
      background-color: ${variables.black};

      &-sider {
         max-width: none !important;
         overflow: hidden;

         @media ${devices.laptop} {
            flex-basis: 12.5% !important;
         }

         &-children {
            padding: 15px 0px;

            @media ${devices.laptop} {
               padding: 30px 15px;
            }
            background: ${variables.black};
         }
      }
   }
`;

const LayoutFull = () => {
   return (
      <StyledLayout hasSider>
         <Sider breakpoint="lg" collapsedWidth="0">
            <Navigation />
         </Sider>

         <AntLayout style={{ flexBasis: "100%" }}>
            <Content style={{ backgroundColor: "#191c24", borderRadius: "40px" }}>
               <Outlet />
            </Content>
         </AntLayout>
      </StyledLayout>
   );
};

export default LayoutFull;
