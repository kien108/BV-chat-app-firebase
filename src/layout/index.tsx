import React from "react";

import { Route } from "../routes/page";

import LayoutFull from "./pages/LayoutFull";

interface Props {
   route: Route;
}

const Layout: React.FC<Props> = (props) => {
   const { route } = props;

   const LayoutRoute = route.layout ? route.layout : LayoutFull;

   return <LayoutRoute />;
};

export default Layout;
