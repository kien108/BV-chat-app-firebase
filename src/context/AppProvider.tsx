import React, { createContext, useMemo, useContext, useState } from "react";
import useFireStore from "../hooks/useFireStore";
import useMedia from "../hooks/useMedia";
import useToggle from "../hooks/useToggle";

import { AuthContext, IUser } from "./AuthProvider";

interface IAppContext {
   rooms: IRoom[] | undefined;
   isAddRoomVisible: boolean;
   setIsAddRoomVisible?: any;
   selectedRoomId: string | undefined;
   setSelectedRoomId?: any;
   selectedRoom: IRoom | undefined;
   members: IUser[] | undefined;
   isInviteMemberVisible: boolean;
   setAddInviteMemberVisible?: any;
   currentScreen: string;
}

const AppContextDefaultValue: IAppContext = {
   rooms: undefined,
   isAddRoomVisible: false,
   selectedRoomId: undefined,
   selectedRoom: undefined,
   members: undefined,
   isInviteMemberVisible: false,
   currentScreen: "",
};
export const AppContext = createContext<IAppContext>(AppContextDefaultValue);

interface IRoom {
   id: string | undefined;
   name: string;
   description: string;
   members: string[];
}

const AppProvider = ({ children }: { children: any }) => {
   const [isAddRoomVisible, setIsAddRoomVisible] = useToggle();
   const [isInviteMemberVisible, setAddInviteMemberVisible] = useToggle();
   const [selectedRoomId, setSelectedRoomId] = useState<string>("");
   const currentScreen = useMedia<string>(
      [
         "(min-width: 1600px)",
         "(min-width: 1200px)",
         "(min-width: 992px)",
         "(min-width: 768px)",
         "(min-width: 576px)",
      ],
      ["xxl", "xl", "lg", "md", "sm"],
      "xs"
   );

   const { user } = useContext(AuthContext);

   const roomsCondition = useMemo(() => {
      return {
         fieldName: "members",
         operator: "array-contains",
         compareValue: user?.uid,
      };
   }, [user?.uid]);

   const rooms: IRoom[] = useFireStore("rooms", roomsCondition);

   const selectedRoom = useMemo(
      () => rooms.find((room) => room.id === selectedRoomId) || undefined,
      [rooms, selectedRoomId]
   );

   const usersCondition = useMemo(() => {
      return {
         fieldName: "uid",
         operator: "in",
         compareValue: selectedRoom && selectedRoom.members,
      };
   }, [selectedRoom]);

   const members: IUser[] = useFireStore("users", usersCondition);

   return (
      <AppContext.Provider
         value={{
            rooms,
            isAddRoomVisible,
            setIsAddRoomVisible,
            selectedRoomId,
            setSelectedRoomId,
            selectedRoom,
            members,
            isInviteMemberVisible,
            setAddInviteMemberVisible,
            currentScreen,
         }}
      >
         {children}
      </AppContext.Provider>
   );
};

export default AppProvider;
