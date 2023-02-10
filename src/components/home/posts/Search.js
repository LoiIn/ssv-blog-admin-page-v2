import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, Input, Button, Select, Space } from "antd";
import { SearchOutlined, RollbackOutlined } from "@ant-design/icons";

import { getAllCategories } from "../../../apis/category";
import { search } from "../../../apis/user";
const { TextArea } = Input;

export default function SearchPost(props) {
  const [formSearch] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const getCates = async () => {
      let data = await getAllCategories();
      if (data !== "fail") setCategories(data);
    };

    getCates();
  }, []);

  useEffect(() => {
    const getAdmins = async () => {
      let cond = {
        role: ["super-admin", "admin"],
      };
      let data = await search(cond);
      if (data !== "fail") setAdmins(data);
    };

    getAdmins();
  }, []);

  const onReset = () => {
    formSearch.resetFields();
  };

  const onSearch = (values) => {
    props.onSearch(values);
  };

  const onSelect = (key, value) => {
    formSearch.setFieldsValue(key, value);
  };

  return (
    <Row className="search__area">
      <Col span={24}>
        <Card title="Search">
          <Form form={formSearch} name="search-form" onFinish={onSearch}>
            <Row gutter={24}>
              <Col span={8} className="gutter-row">
                <Form.Item
                  label="Title"
                  name="title"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <TextArea
                    autoSize={{
                      minRows: 1,
                      maxRows: 3,
                    }}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={16} className="gutter-row">
                <Form.Item
                  label="Summary"
                  name="summary"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <TextArea
                    autoSize={{
                      minRows: 1,
                      maxRows: 3,
                    }}
                    allowClear
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8} className="gutter-row">
                <Form.Item
                  label="Author"
                  name="author"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Select
                    key="author"
                    onChange={(value) => onSelect("author", value)}
                    allowClear
                    options={admins.map((admin) => ({
                      label: admin.name,
                      value: admin.id,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={8} className="gutter-row">
                <Form.Item
                  label="Category"
                  name="category"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Select
                    key="category"
                    onChange={(value) => onSelect("category", value)}
                    allowClear
                    options={categories.map((category) => ({
                      label: category.name,
                      value: category.id,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={8} className="gutter-row">
                <Form.Item
                  label="Tag"
                  name="tags"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Select
                    mode="tags"
                    allowClear
                    options={tags.map((tag) => ({
                      label: tag,
                      value: tag,
                    }))}
                  />
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
