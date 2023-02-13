import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  AccountBookOutlined,
  BulbOutlined,
  MailOutlined,
  ProfileOutlined,
  SettingOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import logo from "./logo.png";
const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const menuItems = [
  getItem(<Link to="/">Dashboard</Link>, "1", <PieChartOutlined />),
  getItem(<Link to="/users">Account</Link>, "2", <AccountBookOutlined />),
  getItem(<Link to="/posts">Post</Link>, "3", <ProfileOutlined />),
  getItem(<Link to="/categories">Category</Link>, "4", <SettingOutlined />),
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const onClick = (e) => {};

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="sidebar"
      breakpoint="md"
      collapsedWidth="60px"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      onClick={onClick}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          textAlign: "center",
        }}
      >
        <Link to="/">
          <img className="logo__img" src={logo} alt="logo" />
        </Link>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={menuItems}
        theme="dark"
      />
    </Sider>
  );
}
