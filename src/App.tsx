import React, { useState } from "react";
import "./App.scss";

import { BrowserRouter } from "react-router-dom";

import Router from "./routes/Router";
import AuthProvider from "./context/AuthProvider";
import AppProvider from "./context/AppProvider";
import useMedia from "./hooks/useMedia";
const AddRoomModal = React.lazy(() => import("./modules/chat/components/AddRoomModal"));
const InviteMemberModal = React.lazy(() => import("./modules/chat/components/InviteMemberModal"));

function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <AuthProvider>
               <AppProvider>
                  <Router />
                  <AddRoomModal />
                  <InviteMemberModal />
               </AppProvider>
            </AuthProvider>
         </BrowserRouter>
      </div>
   );
}

export default App;
