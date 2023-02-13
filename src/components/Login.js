import React from "react";
import { Row, Col, Typography, Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import imgSSV from "./ssv.PNG";
import "./login.css";

import { login } from "./../apis/auth";

const { Title } = Typography;

export default function Login() {
  const history = useNavigate();

  const handleLogin = async (values) => {
    let { status, token, data } = await login(values);
    if (status === "success") {
      history("/");
    }
  };

  return (
    <div className="login">
      <Row align="center">
        <Title level={1} type="success">
          SSV Blog Admin Site
        </Title>
      </Row>
      <Row className="login__form">
        <Col span={12}>
          <img src={imgSSV} width="300px" height="300px" alt="SSV members" />
        </Col>
        <Col span={12}>
          <Form
            layout="horizontal"
            name="login"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleLogin}
          >
            <Title level={3} align="center">
              LOGIN
            </Title>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="margin__bottom--none"
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
