import React from "react";
import { Modal, Form, Input } from "antd";

export default function FormUser(props) {
  const [formAdd] = Form.useForm();

  const hideModal = () => {
    props.setModalVisible(false);
  };

  const addNewUser = () => {
    props.onAdd(formAdd.getFieldsValue());
    hideModal();
    formAdd.setFieldsValue({});
  };

  return (
    <Modal
      title="Add new user account"
      open={props.modalVisible}
      onOk={addNewUser}
      onCancel={hideModal}
      cancelText="Cancel"
    >
      <Form layout="vertical" form={formAdd}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email filed is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name filed is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password filed is required" }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="password_confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Password must be confirmed" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}
