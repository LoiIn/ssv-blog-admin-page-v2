import React from "react";
import { Modal, Form, Input } from "antd";
import { success } from "./../Message";

export default function FormCategory(props) {
  const [formAdd] = Form.useForm();
  formAdd.setFieldsValue(props.categoryInfo);

  const hideModal = () => {
    props.setModalVisible(false);
  };

  const onFinish = () => {
    let info = formAdd.getFieldsValue();

    props.categoryId === 0
      ? props.onAdd(info)
      : props.onUpdate(props.categoryId, info);

    hideModal();
  };

  return (
    <Modal
      title={props.categoryId === 0 ? "Add new Category" : "Edit Category"}
      open={props.modalVisible}
      onOk={onFinish}
      onCancel={hideModal}
      cancelText="Cancel"
    >
      <Form form={formAdd} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Title filed is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Slug" name="slug">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
