import { useEffect, useState } from "react";

const useMedia = <T>(queries: string[], values: T[], defaultValue: T) => {
   // Array containing a media query list for each query
   const mediaQueryLists = queries.map((q) => window.matchMedia(q));

   // Function that gets value based on matching media query
   const getValue = () => {
      // Get index of first media query that matches
      const index = mediaQueryLists.findIndex((mql) => mql.matches);
      // Return related value or defaultValue if none

      document.body.removeAttribute("class");
      document.body.classList.add((values?.[index] || defaultValue) as unknown as string);

      return values?.[index] || defaultValue;
   };

   // Store value is matching with screen
   const [value, setValue] = useState<T>(getValue);

   useEffect(() => {
      const handler = () => setValue(getValue);

      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach((mql) => mql.addListener(handler));

      return () =>
         mediaQueryLists.forEach((mql) => {
            mql.removeListener(handler);
         });
   }, []);
   return value;
};

export default useMedia;

// const columnCount = useMedia<string>(
//    // Media queries
//    [
//       "(min-width: 1600px)",
//       "(min-width: 1200px)",
//       "(min-width: 992px)",
//       "(min-width: 768px)",
//       "(min-width: 576px)",
//    ],
//    // Column counts (relates to above media queries by array index)
//    ["xxl", "xl", "lg", "md", "sm"],
//    // Default column count
//    "xs"
// );
