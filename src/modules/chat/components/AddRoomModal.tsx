import React, { useContext, useState } from "react";
import { Form, Input, Modal } from "antd";
import { AppContext } from "../../../context/AppProvider";
import { useForm } from "antd/lib/form/Form";
import { addDocument } from "../../../firebase/services";
import { AuthContext } from "../../../context/AuthProvider";
import styled from "styled-components";

const StyledModal = styled(Modal)`
   border-radius: 10px;
   overflow: hidden;
   border: 1px solid ${(props) => props.theme.colors.primary};

   .ant-modal {
      &-header,
      &-body,
      &-footer {
         background-color: ${(props) => props.theme.colors.bgGroupContent};
      }

      &-header {
         .ant-modal-title {
            color: ${(props) => props.theme.colors.txtPrimary};
         }
      }

      &-body {
         .ant-form {
            .ant-form-item-label label {
               color: ${(props) => props.theme.colors.txtPrimary};
            }
         }
      }

      &-footer {
         .ant-btn-primary {
            background-color: ${(props) => props.theme.colors.primary};
         }
      }
   }
`;

const AddRoomModal = () => {
   const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
   const [form] = useForm();
   const { user } = useContext(AuthContext);

   const handleOk = () => {
      // add new room

      addDocument("rooms", { ...form.getFieldsValue(), members: user ? [user.uid] : [] });

      form.resetFields();

      setIsAddRoomVisible && setIsAddRoomVisible(false);
   };

   const handleCancel = () => {
      form.resetFields();

      setIsAddRoomVisible && setIsAddRoomVisible(false);
   };

   return (
      <div>
         <StyledModal
            title="Add Room"
            visible={isAddRoomVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            centered
         >
            <Form form={form} layout="vertical">
               <Form.Item label="Name" name="name">
                  <Input placeholder="Field room name" />
               </Form.Item>
               <Form.Item label="Description" name="description">
                  <Input.TextArea placeholder="Field description" />
               </Form.Item>
            </Form>
         </StyledModal>
      </div>
   );
};

export default AddRoomModal;
