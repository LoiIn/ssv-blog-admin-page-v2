import React from "react";
import { Row, Col, Card, Form, Input, Button } from "antd";
import { SearchOutlined, RollbackOutlined } from "@ant-design/icons";

export default function SearchContact(props) {
  const [formSearch] = Form.useForm();

  const onReset = () => {
    formSearch.resetFields();
  };

  const onSearch = (values) => {
    props.onSearch(values);
  };

  return (
    <Row className="search__area">
      <Col span={24}>
        <Card title="Search">
          <Form form={formSearch} name="search-form" onFinish={onSearch}>
            <Row gutter={24}>
              <Col span={12} className="gutter-row">
                <Form.Item
                  label="Username"
                  name="name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12} className="gutter-row">
                <Form.Item
                  label="Email"
                  name="email"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} className="gutter-row">
                <Form.Item
                  label="Content"
                  name="content"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} className="search__form__btn">
                <Button
                  type="primary"
                  danger
                  htmlType="button"
                  icon={<RollbackOutlined />}
                  onClick={onReset}
                >
                  Reset
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
