import React, { useState } from "react";
import { Table, Button, Row, Space } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";

import useHookTag from "../../../hooks/tag";
// import { useHistory } from "react-router-dom";
import SearchTag from "./Search";
import FormTag from "./Form";

const { Column } = Table;

export default function Tag() {
  // const history = useHistory();
  const [modalVisible, setModalVisible] = useState(false);
  const [tags, addTag, updateTag, deleteTag, viewTag, searchTags, getIndex] =
    useHookTag();
  const defaultInfo = {
    title: "",
    slug: "",
  };
  const [tagInfo, setTagInfo] = useState(defaultInfo);
  const [tagId, setTagId] = useState(0);

  const showModal = async (id) => {
    let index = getIndex(id);
    id !== 0 ? setTagInfo(tags[index]) : setTagInfo(defaultInfo);
    id !== 0 ? setTagId(id) : setTagId(0);
    setModalVisible(true);
  };

  const viewDetail = (id) => {
    // history.push(`/tags/${id}`);
  };

  return (
    <div>
      <FormTag
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onAdd={(data) => addTag(data)}
        tagInfo={tagInfo}
        onUpdate={updateTag}
        tagId={tagId}
      />

      <SearchTag onSearch={(data) => searchTags(data)} />

      <Row className="user__action">
        <div className="heading">Tag's table</div>
        <Button icon={<PlusCircleOutlined />} onClick={() => showModal(0)}>
          Add Tag
        </Button>
      </Row>
      <Table
        className="table"
        pagination={{
          position: "topRight",
          pageSize: 5,
        }}
        dataSource={tags}
      >
        <Column title="ID" dataIndex="id" key="stt" width="5%" />
        <Column title="Title" dataIndex="title" key="title" width="40%" />
        <Column title="Slug" dataIndex="slug" key="slug" width="40%" />
        <Column
          title="Action"
          key="action"
          width="15%"
          render={(text, record) => (
            <Space>
              <Button
                type="text"
                title="View"
                icon={<EyeOutlined />}
                onClick={() => viewDetail(record.id)}
              />
              <Button
                type="text"
                title="Edit"
                icon={<EditOutlined />}
                onClick={() => showModal(record.id)}
              />
              <Button
                type="text"
                title="Delete"
                icon={<DeleteOutlined />}
                onClick={() => deleteTag(record.id)}
              />
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
