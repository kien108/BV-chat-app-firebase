import styled from "styled-components";
import { Menu } from "antd";
import variables from "../../assets/scss/variables.module.scss";

const StyledMenu = styled(Menu)`
   &.ant-menu {
      background-color: ${variables.black};
      font-family: ${variables.font};
      border: none;

      .ant-menu-item {
         color: ${variables.txtSecondary};
         font-weight: 500;
         display: flex;
         align-items: center;
         gap: 8px;
         padding: 23px 20px;
         border-radius: 20px;
         transition: all 0.2s ease-in-out;
         color: ${variables.txtSecondary};

         .ant-menu-title-content {
            a {
               color: ${variables.txtSecondary};
            }
         }

         &:hover {
            background-color: ${variables.navFooter} !important;
         }

         .anticon {
            font-weight: 700;
            width: 22px;
            svg {
               width: 100%;
               height: 100%;
            }
         }
         &-selected {
            background-color: ${variables.navFooter} !important;
            font-weight: 600;

            .ant-menu-title-content {
               a {
                  color: ${variables.txtPrimary};
               }
            }

            .anticon {
               color: ${variables.primary} !important;
            }
         }
      }
   }
`;

export default StyledMenu;
