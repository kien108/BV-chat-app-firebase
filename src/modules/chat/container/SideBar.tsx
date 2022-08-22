import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import RoomList from "../components/RoomList";
import UserInfo from "../components/UserInfo";

const StyledSidebar = styled.div`
   background-color: ${(props) => props.theme.colors.bgGroup};
   color: white;
   height: 100vh;
`;

const SideBar = () => {
   return (
      <StyledSidebar>
         <Row>
            <Col span={24}>
               <UserInfo />
            </Col>

            <Col span={24}>
               <RoomList />
            </Col>
         </Row>
      </StyledSidebar>
   );
};

export default SideBar;
