import React, { useContext, useMemo, useState } from "react";
import { Avatar, Form, Input, Modal, Select, SelectProps, Spin } from "antd";
import { AppContext } from "../../../context/AppProvider";
import { useForm } from "antd/es/form/Form";
import { addDocument } from "../../../firebase/services";
import { AuthContext } from "../../../context/AuthProvider";
import { debounce } from "lodash";
import { db } from "../../../firebase/config";
import useFireStore from "../../../hooks/useFireStore";
import styled from "styled-components";

interface IOption {
   value: string | number | undefined;
   label: string;
   photoURL: string;
}

interface IDebounceSelect extends SelectProps {
   label: string;
   fetchOptions: any;
   debounceTimeout: number;
   curMembers: string[] | undefined;
}
const DebounceSelect: React.FC<IDebounceSelect> = (props) => {
   // select component
   const { fetchOptions, debounceTimeout, curMembers } = props;

   const [fetching, setFetching] = useState(false);
   const [options, setOptions] = useState<IOption[]>([]);

   const debounceFetcher = useMemo(() => {
      const loadOptions = (value: string) => {
         setOptions([]);
         setFetching(true);

         curMembers
            ? fetchOptions(value, curMembers).then((newOptions: IOption[]) => {
                 setOptions(newOptions);
                 setFetching(false);
              })
            : setFetching(false);
      };

      return debounce(loadOptions, debounceTimeout);
   }, [debounceTimeout, fetchOptions]);

   return (
      <Select
         labelInValue
         onSearch={debounceFetcher}
         filterOption={false}
         notFoundContent={fetching ? <Spin size="small" /> : null}
         {...props}
      >
         {options.map((opt) => (
            <Select.Option key={opt.value} value={opt.value} title={opt.label}>
               <Avatar size="small" src={opt.photoURL}>
                  {opt.photoURL ? "" : opt.label.charAt(0).toUpperCase()}
               </Avatar>
               <label htmlFor="">{opt.label}</label>
            </Select.Option>
         ))}
      </Select>
   );
};

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

      &-footer {
         .ant-btn-primary {
            background-color: ${(props) => props.theme.colors.primary};
         }
      }
   }
`;

const InviteMemberModal = () => {
   const { isInviteMemberVisible, setAddInviteMemberVisible, selectedRoomId, selectedRoom } =
      useContext(AppContext);
   const [form] = useForm();
   const { user } = useContext(AuthContext);
   const [value, setValue] = useState<{ label: any; value: string }[]>([]);

   const handleOk = () => {
      form.resetFields();

      //update members in current room
      const roomRef = db.collection("rooms").doc(selectedRoomId);

      console.log("value", value);
      roomRef.update({
         members: selectedRoom ? [...selectedRoom.members, ...value.map((val) => val.value)] : [],
      });

      setAddInviteMemberVisible && setAddInviteMemberVisible(false);
   };

   const handleCancel = () => {
      form.resetFields();

      setAddInviteMemberVisible && setAddInviteMemberVisible(false);
   };

   const fetchUserList = async (search: string, curMembers: string[]) => {
      return db
         .collection("users")
         .where("keywords", "array-contains", search)
         .orderBy("displayName")
         .limit(20)
         .get()
         .then((snapshot) => {
            return snapshot.docs
               .map((doc) => ({
                  label: doc.data().displayName,
                  photoURL: doc.data().photoURL,
                  value: doc.data().uid,
               }))
               .filter((opt) => !curMembers.includes(opt.value));
         })
         .catch((e) => console.log(e));
   };

   return (
      <StyledModal
         title="Add Members"
         visible={isInviteMemberVisible}
         onOk={handleOk}
         onCancel={handleCancel}
         centered
      >
         <Form form={form} layout="vertical">
            <DebounceSelect
               mode="multiple"
               label="List members"
               value={value}
               placeholder="Enter member name"
               fetchOptions={fetchUserList}
               debounceTimeout={500}
               onChange={(newValue) => setValue(newValue)}
               curMembers={selectedRoom && selectedRoom.members}
               style={{ width: "100%" }}
            />
         </Form>
      </StyledModal>
   );
};

export default InviteMemberModal;
