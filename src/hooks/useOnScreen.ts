import { useEffect, useRef, useState } from "react";

const useOnScreen = (ref: any, rootMargin: string = "0px") => {
   // State and setter for storing whether element is visible
   const [isIntersecting, setIntersecting] = useState(false);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            // Update our state when observer callback fires
            setIntersecting(entry.isIntersecting);
         },
         {
            rootMargin,
         }
      );
      if (ref.current) {
         observer.observe(ref.current);
      }
      return () => {
         observer.unobserve(ref.current);
      };
   }, []);

   return isIntersecting;
};

export default useOnScreen;
