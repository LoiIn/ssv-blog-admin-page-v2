import React from "react";
import { Layout, Avatar, Dropdown, Button, Space } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  BackwardOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../apis/auth";

const { Header } = Layout;

export default function Head() {
  const history = useNavigate();

  const handleLogout = async () => {
    let res = await logout();
    if (res === "success") history("/login");
  };

  const backPage = () => {
    history(-1);
  };
  return (
    <Header className="header">
      <Button onClick={backPage}>
        <BackwardOutlined /> Back
      </Button>
      <Button onClick={handleLogout}>
        <LogoutOutlined /> Logout
      </Button>
    </Header>
  );
}
