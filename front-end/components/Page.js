import React from "react";
import { withRouter } from "next/router";
import { Layout, Menu, Avatar, Row, Col, Dropdown } from "antd";
import routes from "../lib/routes";
import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const NonDashboardRoutes = ["/signin"];

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        Log out
      </a>
    </Menu.Item>
  </Menu>
);

const Page = ({ router, children }) => {
  const isNotDashboard = NonDashboardRoutes.includes(router.pathname);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isNotDashboard && (
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            backgroundColor: "white",
            height: "100vh"
          }}
        >
          <div className="logo" />
          <Menu defaultSelectedKeys={["0"]} mode="inline">
            <img
              src={require("../static/logo-2.png")}
              style={{ width: "100%", marginBottom: "2px" }}
              alt="Logo"
            />
            {routes.map(route => {
              return (
                <Menu.Item key={route.name}>
                  {route.icon}
                  {route.name}
                  <Link href={route.path}>
                    <a></a>
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
      )}
      <Layout style={{ height: "100vh", overflow: "auto" }}>
        {!isNotDashboard && (
          <Header style={{ padding: 0, height: 58, backgroundColor: "white" }}>
            <Row justify="end">
              <Col style={{ right: "22px" }}>Admin@ee.com</Col>
              <Col>
                <Dropdown
                  trigger={["click"]}
                  overlay={menu}
                  placement="bottomRight"
                >
                  <Avatar
                    style={{ right: "17px", cursor: "pointer" }}
                    icon={<UserOutlined />}
                  />
                </Dropdown>
              </Col>
            </Row>
          </Header>
        )}
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>E-commerce 2020</Footer>
      </Layout>
    </Layout>
  );
};

export default withRouter(Page);
