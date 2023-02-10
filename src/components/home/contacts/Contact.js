import React from "react";
import { Table, Button, Row, Space } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import SearchContact from "./Search";
import useHookContact from "../../../hooks/contact";
// import { useHistory } from 'react-router-dom';

const { Column } = Table;

export default function Contact() {
  // const history = useHistory();
  const [contacts, viewContact, deleteContact, searchContacts] =
    useHookContact();

  const viewDetail = (id) => {
    // history.push(`/contacts/${id}`);
  };

  return (
    <div>
      <SearchContact onSearch={(data) => searchContacts(data)} />

      <Row className="user__action">
        <div className="heading">Contact's table</div>
      </Row>
      <Table
        className="table"
        pagination={{
          position: "topRight",
          pageSize: 5,
        }}
        dataSource={contacts}
      >
        <Column title="ID" dataIndex="id" key="stt" width="5%" />
        <Column title="Username" dataIndex="name" key="name" width="20%" />
        <Column title="Email" dataIndex="email" key="email" width="25%" />
        <Column title="Content" dataIndex="content" key="content" width="40%" />
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
                onClick={() => deleteContact(record.id)}
              />
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
