import React from "react";
import { Modal, Form, Input } from "antd";

export default function FormTag(props) {
  const [formAdd] = Form.useForm();
  formAdd.setFieldsValue(props.tagInfo);

  const hideModal = () => {
    props.setModalVisible(false);
  };

  const onFinish = () => {
    let info = formAdd.getFieldsValue();
    props.tagId === 0 ? props.onAdd(info) : props.onUpdate(props.tagId, info);

    hideModal();
  };

  return (
    <Modal
      title={props.tagId === 0 ? "Add new Tag" : "Edit Tag"}
      on={props.modalVisible}
      onOk={onFinish}
      onCancel={hideModal}
      cancelText="Cancel"
    >
      <Form form={formAdd} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title filed is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: "Slug filed is required" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
