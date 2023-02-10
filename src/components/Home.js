import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import Sidebar from "./home/Sidebar";
import Head from "./home/Head";
import "./home/home.css";

const { Content, Footer } = Layout;

export default function Home() {
  return (
    <div>
      <Layout className="home" hasSider>
        <Sidebar />
        <Layout
          className="site-layout"
          style={{
            marginLeft: 200,
          }}
        >
          <Head />
          <Content className="content">
            <Outlet />
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            SSV Blog - Admin Page
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}
