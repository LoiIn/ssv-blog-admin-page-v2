import React from "react";
import { Row, Col, Card, Form, Input, Button, Select, Space } from "antd";
import { SearchOutlined, RollbackOutlined } from "@ant-design/icons";
const { Option } = Select;

export default function SearchUser(props) {
  const [formSearch] = Form.useForm();

  const onReset = () => {
    formSearch.resetFields();
  };

  const onSearch = (values) => {
    props.onSearch(values);
  };

  const onSelect = (value) => {
    formSearch.setFieldsValue("role", value);
  };

  return (
    <Row className="search__area">
      <Col span={24}>
        <Card title="Search">
          <Form form={formSearch} name="search-form" onFinish={onSearch}>
            <Row gutter={24}>
              <Col span={8} className="gutter-row">
                <Form.Item
                  label="Name"
                  name="name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8} className="gutter-row">
                <Form.Item
                  label="Email"
                  name="email"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8} className="gutter-row">
                <Form.Item
                  label="Role"
                  name="role"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  initialValue={"all"}
                >
                  <Select onChange={onSelect} allowClear>
                    <Option value={"all"}>All</Option>
                    <Option value="admin">admin</Option>
                    <Option value="user">user</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} className="search__form__btn">
                <Space>
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
                </Space>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
