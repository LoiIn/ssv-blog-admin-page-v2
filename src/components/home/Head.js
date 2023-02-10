import React from "react";
import { Layout, Avatar, Dropdown, Button, Space } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  BackwardOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../../apis/auth";
const { Header } = Layout;

const items = [
  {
    label: "Me",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "Logout",
    key: "2",
    icon: <LogoutOutlined />,
  },
];

export default function Head() {
  const history = useNavigate();

  const handleLogout = async (e) => {
    console.log("hihi");
    // let res = await logout();
    // if (res !== "fail") {
    //   // history("login");
    // }
  };
  const backPage = () => {
    history(-1);
  };
  return (
    <Header className="header">
      <Button onClick={backPage}>
        <BackwardOutlined /> Back
      </Button>
      <Dropdown
        onClick={(e) => handleLogout(e)}
        menu={{
          items,
        }}
        trigger={["hover"]}
      >
        <a>
          <Space>
            Loiin
            <Avatar icon={<UserOutlined />} />
          </Space>
        </a>
      </Dropdown>
    </Header>
  );
}
