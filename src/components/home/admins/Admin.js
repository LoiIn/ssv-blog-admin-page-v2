import React, { useState } from "react";
import { Table, Button, Row, Space } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import SearchAdmin from "./Search";
import FormAdmin from "./Form";
import useHookAdmin from "../../../hooks/admin";
import { useNavigate } from "react-router-dom";

const { Column } = Table;

export default function Admin() {
  const history = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [admins, addAdmin, deleteAdmin, viewAdmin, searchAdmins] =
    useHookAdmin();

  const showModal = () => {
    setModalVisible(true);
  };

  const viewDetail = (id) => {
    history(`admins/${id}`);
  };

  return (
    <div>
      <FormAdmin
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onAdd={(data) => addAdmin(data)}
      />

      <SearchAdmin onSearch={(data) => searchAdmins(data)} />

      <Row className="user__action">
        <div className="heading">Admin's table</div>
        <Button icon={<UserAddOutlined />} onClick={showModal}>
          Add admin
        </Button>
      </Row>
      <Table
        className="table"
        pagination={{
          position: "topRight",
          pageSize: 5,
        }}
        dataSource={admins}
      >
        <Column title="ID" dataIndex="id" key="stt" width="5%" />
        <Column title="Name" dataIndex="name" key="name" width="30%" />
        <Column
          title="Date of birth"
          dataIndex="birthday"
          key="birthday"
          width="20%"
        />
        <Column title="Email" dataIndex="email" key="email" width="20%" />
        <Column
          title="Social Link"
          dataIndex="social_link"
          key="social_link"
          width="10%"
        />
        <Column
          title="Action"
          key="action"
          width="10%"
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
                title="Delete"
                icon={<DeleteOutlined />}
                onClick={() => deleteAdmin(record.id)}
              />
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
