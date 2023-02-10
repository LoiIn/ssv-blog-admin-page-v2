import React, { useState } from "react";
import { Table, Button, Row, Space, Tooltip } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

import useHookUser from "../../../hooks/user";
import { useNavigate } from "react-router-dom";
import SearchUser from "./Search";
import FormUser from "./Form";

const { Column } = Table;

export default function User() {
  const history = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [users, addUser, deleteUser, viewUser, searchUsers, switchRole] =
    useHookUser();

  const showModal = () => {
    setModalVisible(true);
  };

  const viewDetail = (id) => {
    history(`/users/${id}`);
  };

  return (
    <div>
      <FormUser
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onAdd={(data) => addUser(data)}
      />

      <SearchUser onSearch={(data) => searchUsers(data)} />

      <Row className="user__action">
        <div className="heading">User's table</div>
        <Button icon={<UserAddOutlined />} onClick={showModal}>
          Add User
        </Button>
      </Row>
      <Table
        className="table"
        pagination={{
          position: "topRight",
          pageSize: 5,
        }}
        dataSource={users}
      >
        <Column title="Name" dataIndex="name" key="name" width="35%" />
        <Column title="Email" dataIndex="email" key="email" width="35%" />
        <Column title="Role" dataIndex="role" key="role" width="20%" />
        <Column
          title="Action"
          key="action"
          width="10%"
          align="center"
          render={(text, record) => (
            <Space>
              <Tooltip title="View">
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={() => viewDetail(record.id)}
                  disabled={record.role == "super-admin"}
                />
              </Tooltip>
              <Tooltip title="Change Role">
                <Button
                  type="default"
                  icon={<UserSwitchOutlined />}
                  onClick={() => switchRole(record.id, record.role)}
                  disabled={record.role == "super-admin"}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => deleteUser(record.id)}
                  disabled={record.role == "super-admin"}
                />
              </Tooltip>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
