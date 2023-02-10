import React from "react";
import moment from "moment";
import { Modal, Form, Input, DatePicker } from "antd";
const dateFormat = "YYYY-MM-DD";
const initAdmin = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  social_link: "",
  birthday: "",
};

export default function FormAdmin(props) {
  const [formAdd] = Form.useForm();

  const hideModal = () => {
    props.setModalVisible(false);
  };

  const addNewAdmin = () => {
    let _date = formAdd.getFieldValue("birthday");
    let info = {
      name: formAdd.getFieldValue("name"),
      email: formAdd.getFieldValue("email"),
      password: formAdd.getFieldValue("password"),
      password_confirmation: formAdd.getFieldValue("password_confirmation"),
      social_link: formAdd.getFieldValue("social_link"),
      birthday: _date === null ? null : moment(_date).format(dateFormat),
    };

    props.onAdd(info);
    formAdd.setFieldsValue(initAdmin);
    hideModal();
  };

  return (
    <Modal
      title="Add new admin account"
      open={props.modalVisible}
      onOk={addNewAdmin}
      onCancel={hideModal}
      cancelText="Cancel"
    >
      <Form form={formAdd} layout="vertical">
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
          name="password_confirmation"
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
        <Form.Item label="Social Link" name="social_link">
          <Input />
        </Form.Item>
        <Form.Item label="Birthday" name="birthday">
          <DatePicker format={dateFormat} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
