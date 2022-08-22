import React, { useContext } from "react";
import { Collapse, Typography } from "antd";
import styled from "styled-components";
import { PlusSquareOutlined } from "@ant-design/icons";
import { AppContext } from "../../../context/AppProvider";

const { Panel } = Collapse;

import Button from "../../../components/button";
import useDarkMode from "../../../hooks/useDarkMode";

const StyledPanel = styled(Panel)`
   &&& {
      padding: 20px;

      .ant-collapse-header,
      p {
         color: white;
         font-size: 20px;
         font-weight: 700;
      }

      .ant-collapse-content-box {
         padding: 0 45px;

         .room-title {
            color: ${(props) => props.theme.colors.txtSecondary};
            font-weight: 600;
            font-size: 17px;

            &:hover {
               opacity: 0.8;
            }
         }

         .ant-btn {
            margin-top: 20px;
         }
      }
   }
`;

const LinkStyled = styled(Typography.Link)`
   display: block;
   margin-bottom: 5px;
   color: white;
`;

const RoomList = () => {
   const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext);

   const handleAddRoom = () => {
      setIsAddRoomVisible && setIsAddRoomVisible(true);
   };

   return (
      <Collapse defaultActiveKey={["1"]} ghost>
         <StyledPanel header="List Rooms" key="1">
            {rooms &&
               rooms.map((room) => (
                  <LinkStyled
                     className="room-title"
                     key={room.name}
                     onClick={() => setSelectedRoomId && setSelectedRoomId(room.id)}
                  >
                     {room.name}
                  </LinkStyled>
               ))}

            <Button className="add" icon={<PlusSquareOutlined />} onClick={handleAddRoom}>
               Add Room
            </Button>
         </StyledPanel>
      </Collapse>
   );
};

export default RoomList;
