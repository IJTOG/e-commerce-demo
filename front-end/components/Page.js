import React from "react";
import { withRouter } from "next/router";
import { Layout, Menu } from "antd";
import routes from "../lib/routes";
import Link from "next/link";

const { Header, Content, Footer, Sider } = Layout;

const NonDashboardRoutes = ["/signin"];

const Page = ({ router, children }) => {
  const isNotDashboard = NonDashboardRoutes.includes(router.pathname);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isNotDashboard && (
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{ backgroundColor: "white" }}
        >
          <div className="logo" />
          <Menu defaultSelectedKeys={["0"]} mode="inline">
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
      <Layout>
        {!isNotDashboard && (
          <Header style={{ padding: 0, backgroundColor: "white" }}>Test</Header>
        )}
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>E-commerce 2020</Footer>
      </Layout>
    </Layout>
  );
};

export default withRouter(Page);
