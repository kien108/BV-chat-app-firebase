import { MenuProps } from "antd";
import { motion } from "framer-motion";
import React from "react";
import StyledMenu from "./styles";

interface Props extends MenuProps {}

const Menu: React.FC<Props> = (props) => {
   return (
      <motion.div
         initial={{
            x: "-100%",
         }}
         animate={{
            x: 0,
         }}
         transition={{
            duration: 0.8,
         }}
      >
         <StyledMenu {...props} />
      </motion.div>
   );
};

export default Menu;
