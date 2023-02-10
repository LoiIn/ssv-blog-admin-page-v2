import React, { useEffect } from "react";
import moment from "moment";
import { Modal, Form, Input, DatePicker, Upload, Button } from "antd";
import { makeMoment } from "../../../apis/tools";
import { PlusCircleOutlined } from "@ant-design/icons";
const dateFormat = "YYYY-MM-DD";

export default function EditProfile(props) {
  const [formAdd] = Form.useForm();

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  useEffect(() => {
    console.log(props.profiles.id);
    var _info = {
      name: props.profiles.name,
      email: props.profiles.email,
      social_link: props.profiles.social_link,
      birthday: makeMoment(props.profiles.birthday),
    };
    formAdd.setFieldsValue(_info);
  }, []);

  const editProfiles = async () => {
    var img = formAdd.getFieldValue("avatar");

    if (img.file.status === "done") {
      let _date = formAdd.getFieldValue("birthday");
      let info = {
        name: formAdd.getFieldValue("name"),
        email: formAdd.getFieldValue("email"),
        social: formAdd.getFieldValue("social_link"),
        password: formAdd.getFieldValue("password"),
        password_confirmation: formAdd.getFieldValue("password_confirmation"),
        birthday: _date === null ? null : moment(_date).format(dateFormat),
        avatar: img.file.thumbUrl,
      };
      let res = await props.onUpdate(props.profiles.id, info);
      console.log(res);
      if (res !== "fail") {
        // hideModal();
      }
    }
  };

  const hideModal = () => {
    props.setModalVisible(false);
  };

  const handleChange = (e) => {
    // getBase64(e, curAavtar => formAdd.setFieldsValue('avatar', curAavtar));
    // console.log(formAdd.getFieldValue('avatar'));
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = function () {
      callback(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
    // reader.addEventListener('load', () => callback(reader.result));
    // if (img) {
    //     reader.readAsDataURL(img);
    // }
  };

  return (
    <Modal
      title="Edit profile"
      on={props.modalVisible}
      onOk={editProfiles}
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
          label="New Password"
          name="password"
          // rules={[{required: true, message: 'Password filed is required'}]}
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
            // {required: true, message: 'Password must be confirmed'},
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
        <Form.Item label="Avatar" name="avatar">
          <Upload
            customRequest={dummyRequest}
            onChange={handleChange}
            listType="picture"
            maxCount={1}
          >
            <Button icon={<PlusCircleOutlined />}>Add images</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
