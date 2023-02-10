import React, { useEffect, useState } from "react";
import { Table, Button, Row, Space, Form, Modal, Input } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";

import useHookCategory from "../../../hooks/category";
import { useNavigate } from "react-router-dom";
import SearchCategory from "./Search";
import FormCategory from "./Form";

const { Column } = Table;

export default function Category() {
  const history = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    viewCategory,
    searchCategories,
    getIndex,
  ] = useHookCategory();
  const defaultInfo = {
    title: "",
    slug: "",
  };
  const [categoryInfo, setCategoryInfo] = useState(defaultInfo);
  const [categoryId, setCategoryId] = useState(0);

  const showModal = async (id) => {
    let index = getIndex(id);
    id !== 0
      ? setCategoryInfo(categories[index])
      : setCategoryInfo(defaultInfo);
    id !== 0 ? setCategoryId(id) : setCategoryId(0);
    setModalVisible(true);
  };

  const viewDetail = (id) => {
    history(`/categories/${id}`);
  };

  return (
    <div>
      <FormCategory
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onAdd={(data) => addCategory(data)}
        categoryInfo={categoryInfo}
        onUpdate={updateCategory}
        categoryId={categoryId}
      />

      <SearchCategory onSearch={(data) => searchCategories(data)} />

      <Row className="user__action">
        <div className="heading">Category's table</div>
        <Button icon={<PlusCircleOutlined />} onClick={() => showModal(0)}>
          Add Category
        </Button>
      </Row>
      <Table
        className="table"
        pagination={{
          position: "topRight",
          pageSize: 5,
        }}
        dataSource={categories}
      >
        <Column title="Name" dataIndex="name" key="name" width="40%" />
        <Column title="Slug" dataIndex="slug" key="slug" width="40%" />
        <Column
          title="Action"
          key="action"
          align="center"
          width="20%"
          render={(text, record) => (
            <Space>
              <Button
                type="primary"
                title="View"
                icon={<EyeOutlined />}
                onClick={() => viewDetail(record.id)}
              />
              <Button
                title="Edit"
                icon={<EditOutlined />}
                onClick={() => showModal(record.id)}
              />
              <Button
                type="primary"
                title="Delete"
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteCategory(record.id)}
              />
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
