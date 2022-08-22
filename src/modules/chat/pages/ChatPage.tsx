import React, { useContext } from "react";
import { Row, Col } from "antd";
import ChatWindow from "../container/ChatWindow";

import SideBar from "../container/SideBar";
import { AppContext } from "../../../context/AppProvider";

const ChatPage = () => {
   const { selectedRoomId } = useContext(AppContext);

   return (
      <Row style={{ display: "flex" }}>
         <Col span={`${selectedRoomId ? 0 : 24}`} md={9} lg={6}>
            <SideBar />
         </Col>
         <Col span={`${selectedRoomId ? 24 : 0}`} md={15} lg={18}>
            <ChatWindow />
         </Col>
      </Row>
   );
};

export default ChatPage;
