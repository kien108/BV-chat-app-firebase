import React from "react";
import variables from "./variables.module.scss";

import { ThemeProvider } from "styled-components";

interface ITheme {
   colors: Object;
   fonts: Object;
   fontSizes: Object;
}

const theme: ITheme = {
   colors: {
      primary: variables.primary,
      black: variables.black,
      navFooter: variables.navFooter,
      purple: variables.purple,

      bgPageContent: variables.bgPageContent,

      bgGroup: variables.bgGroup,
      bgGroupContent: variables.bgGroupContent,

      bgCalendarPrimary: variables.bgCalendarPrimary,
      bgCalendarSecondary: variables.bgCalendarSecondary,

      txtPrimary: variables.txtPrimary,
      txtSecondary: variables.txtSecondary,
      txtThird: variables.txtThird,
   },

   fonts: ["sans-serif", "Roboto"],
   fontSizes: {
      small: "1em",
      medium: "2em",
      large: "3em",
   },
};

export default theme;
