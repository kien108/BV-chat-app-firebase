import { useCallback, useEffect, useState } from "react";
import useToggle from "./useToggle";

const useDarkMode = (): [boolean, any] => {
   const [isDarkMode, toggleDarkMode] = useToggle(localStorage.theme === "dark");

   useEffect(() => {
      const html = window.document.body;

      if (isDarkMode) {
         html.classList.add("dark");
         localStorage.setItem("theme", "dark");
      } else {
         html.classList.remove("dark");
         localStorage.setItem("theme", "light");
      }
   }, [isDarkMode]);

   return [isDarkMode, toggleDarkMode];
};

export default useDarkMode;
