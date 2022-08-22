import React, { useEffect, useRef } from "react";

type Compare = (prev: any, next: any) => boolean;

// unlike useMemo, this hooks can compare nested value like obj,...
// if using useMemo and pass dependency like obj.id (es-lint will complain and we'll ignore it => dirty)
const useMemoCompare = (next: any, compare: Compare) => {
   // Ref to storing prev value
   const prevRef = useRef<any>(undefined);
   const prev = prevRef.current;

   // Flag compare prev and next
   const isEqual = compare(prev, next);

   // If flag = false => update prev = next
   useEffect(() => {
      if (isEqual) return;

      prevRef.current = next;
   });

   // if equal return prev, else return next
   return isEqual ? prev : next;
};

export default useMemoCompare;
