import React, { useEffect, useMemo, useRef } from "react";
import useDarkMode from "../../../hooks/useDarkMode";
import useEventListener from "../../../hooks/useEventListener";
import useMedia from "../../../hooks/useMedia";
import useMemoCompare from "../../../hooks/useMemoCompare";
import useOnScreen from "../../../hooks/useOnScreen";
import useToggle from "../../../hooks/useToggle";

const TestHook = (props: any) => {
   const { obj } = props;

   const objFinal = useMemoCompare(obj, (prev, next) => {
      return prev && prev.id === next.id;
   });

   const screenSize = useMedia<string>(
      // Media queries
      [
         "(min-width: 1600px)",
         "(min-width: 1200px)",
         "(min-width: 992px)",
         "(min-width: 768px)",
         "(min-width: 576px)",
      ],
      // Column counts (relates to above media queries by array index)
      ["xxl", "xl", "lg", "md", "sm"],
      // Default column count
      "xs"
   );

   const [darkMode, setDarkMode] = useDarkMode();

   useEffect(() => {
      console.log("re render");
   }, [objFinal]);

   return (
      <div>
         <button onClick={setDarkMode}>Dark vlzlxcv</button>
         <h1 style={{ color: "white" }}>{darkMode ? "DArk vl" : "Light vl"}</h1>
         <h1 style={{ color: "white" }}>Size: {screenSize}</h1>
      </div>
   );
};

export default TestHook;
