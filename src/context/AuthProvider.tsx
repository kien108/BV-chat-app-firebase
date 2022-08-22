import { Spin } from "antd";
import React, { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase/config";

export interface IUser {
   displayName: string | null;
   email: string | null;
   uid: string;
   photoURL: string | null;
}

interface IAuthContext {
   user: IUser | undefined;
}

const AuthContextDefaultValue = {
   user: undefined,
};
export const AuthContext = createContext<IAuthContext>(AuthContextDefaultValue);

const AuthProvider = (props: any) => {
   const [user, setUser] = useState<IUser>();
   const navigate = useNavigate();

   useEffect(() => {
      auth.onAuthStateChanged((user) => {
         if (user) {
            const { displayName, email, uid, photoURL } = user;
            setUser({ displayName: displayName, email: email, uid, photoURL });
            navigate("/");
            return;
         }
         navigate("/login");
      });
   }, []);

   return <AuthContext.Provider value={{ user }}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
