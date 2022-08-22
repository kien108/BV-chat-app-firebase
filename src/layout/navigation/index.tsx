import React, { ReactNode } from "react";
import styled from "styled-components";

import variables from "../../assets/scss/variables.module.scss";
import { devices } from "../../utils/devices";

import NavHeader from "./header";
import NavFooter from "./footer";
import Menu from "../../components/menu";

import { motion } from "framer-motion";

import { useNavigate, Navigate, Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

import {
   PieChartOutlined,
   CalendarOutlined,
   BarChartOutlined,
   InfoCircleOutlined,
   FileTextOutlined,
   SettingOutlined,
} from "@ant-design/icons";
import { ROLES } from "../../routes/page";
import { useAppSelector } from "../../app/hooks";

function getItem(label: ReactNode, key: string, icon: any, children: any, type: string) {
   return {
      key,
      icon,
      children,
      label,
      type,
   };
}

enum OPTIONS_KEY {
   DASHBOARD = "",
   CALENDAR = "calendar",
   ANALYTICS = "analytics",
   ADS = "ads",
   CAMPAIGNS = "campaigns",
   SETTINGS = "settings",
}
const items = [
   getItem(<Link to="/">Dashboard</Link>, OPTIONS_KEY.DASHBOARD, <PieChartOutlined />, null, ""),
   getItem(
      <Link to="/calendar">Calendar</Link>,
      OPTIONS_KEY.CALENDAR,
      <CalendarOutlined />,
      null,
      ""
   ),
   getItem(
      <Link to="/analytics">Analytics</Link>,
      OPTIONS_KEY.ANALYTICS,
      <BarChartOutlined />,
      null,
      ""
   ),
   getItem(<Link to="/ads">Ads</Link>, OPTIONS_KEY.ADS, <InfoCircleOutlined />, null, ""),
   getItem(
      <Link to="/campaigns">Campaigns</Link>,
      OPTIONS_KEY.CAMPAIGNS,
      <FileTextOutlined />,
      null,
      ""
   ),
   getItem(
      <Link to="/settings">Settings</Link>,
      OPTIONS_KEY.SETTINGS,
      <SettingOutlined />,
      null,
      ""
   ),
];

const StyledNav = styled.nav`
   display: flex;
   height: 100%;
   flex-direction: column;

   .ant-menu {
      margin-top: 3rem;
      font-size: 1.38rem;
   }

   @media ${devices.desktop} {
      .ant-menu {
         margin-top: 8rem;
      }
   }
`;

const Navigation: React.FC = () => {
   const currentRole = useAppSelector((state) => state.auth.role);
   const location = useLocation();

   return (
      <StyledNav>
         <NavHeader />
         <Menu
            items={items}
            defaultSelectedKeys={[currentRole]}
            selectedKeys={[location.pathname.split("/")[1]]}
         />
         <NavFooter />
      </StyledNav>
   );
};

export default Navigation;
