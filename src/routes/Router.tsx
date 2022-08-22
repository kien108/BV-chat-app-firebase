import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./page";

const Router = () => {
   return (
      <Routes>
         {routes.map((item) => (
            <Route key={item.path} path={item.path} element={<item.component />} />
         ))}
      </Routes>
   );
};

export default Router;
