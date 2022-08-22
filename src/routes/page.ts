import ChatPage from "../modules/chat/pages/ChatPage";
import Login from "../modules/login";
import SITE_MAP from "./routesString";

export interface Route {
   path: string;
   roles: string[];
   auth: boolean;
   component: () => JSX.Element;
   layout?: () => JSX.Element;
}

export enum ROLES {
   USER = "user",
   ADMIN = "admin",
   TEACHER = "teacher",
   STUDENT = "student",
}

const routes: Route[] = [
   {
      path: SITE_MAP.LOGIN,
      component: Login,
      auth: false,
      roles: [ROLES.USER, ROLES.ADMIN],
      // layout: LayoutNone,
   },
   {
      path: SITE_MAP.CHAT,
      component: ChatPage,
      auth: false,
      roles: [ROLES.USER, ROLES.ADMIN],
      // layout: LayoutNone,
   },
];

export default routes;
