import React, { useEffect, useRef } from "react";

const useEventListener = (eventName: string, handler: any, element: any = window) => {
   // create handleRef
   const handlerRef = useRef<any>();

   // Update handler to newest and it just re-define handlerRef
   // If we pass handler to dependencies all of logic will re-define after re-render
   useEffect(() => {
      handlerRef.current = handler;
   }, [handler]);

   useEffect(() => {
      // Flag check element support addEventListener
      const isSupported = element && element.addEventListener;

      if (!isSupported) return;

      const eventListener = (event: any) => handlerRef.current(event);

      // Add eventListener
      element.addEventListener(eventName, eventListener);

      return () => removeEventListener(eventName, eventListener);
   }, [eventName, element]);
};

export default useEventListener;
