import React, { useLayoutEffect } from "react";

const useLockBodyScroll = (): void => {
   useLayoutEffect((): (() => void) => {
      // Get original body overflow
      const originalStyle: string = window.getComputedStyle(document.body).overflow;
      // Prevent scrolling on mount
      document.body.style.overflow = "hidden";

      // Re-enable scrolling when component unmounts
      return () => (document.body.style.overflow = originalStyle);
   }, []);
};

export default useLockBodyScroll;
