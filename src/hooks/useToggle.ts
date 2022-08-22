import { useCallback, useState } from "react";

const useToggle = (
   initialState: boolean = false
): [boolean, React.Dispatch<React.SetStateAction<any>>] => {
   const [state, setState] = useState<boolean>(initialState);

   // Define and memorize an fc toggle value
   // setState doesn't necessary to define in dependencies
   const toggle = useCallback(() => setState((prev) => !prev), []);

   return [state, toggle];
};

export default useToggle;
