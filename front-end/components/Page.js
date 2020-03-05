import React from "react";
import { withRouter } from "next/router";
import { Layout, Menu, Avatar, Row, Col, Dropdown } from "antd";
import routes from "../lib/routes";
import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { compose } from "redux";
import { lifecycle, withHandlers, withState } from "recompose";
import { verifyToken } from "../lib/api";
import { removeToken } from "../lib/auth";

const { Header, Content, Footer, Sider } = Layout;

const NonDashboardRoutes = ["/signin"];

const Page = ({ router, children, user, loggedIn, logoutEvent }) => {
  const isNotDashboard = NonDashboardRoutes.includes(router.pathname);

  const menu = (
    <Menu>
      <Menu.Item onClick={logoutEvent}>Log out</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isNotDashboard && loggedIn && (
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            backgroundColor: "white",
            height: "100vh"
          }}
        >
          <div className="logo" />
          <Menu
            defaultSelectedKeys={[
              routes.find(item => item.path === router.route).name
            ]}
            mode="inline"
          >
            <a href="/">
              <img
                src={require("../static/logo-2.png")}
                style={{ width: "100%", marginBottom: "2px" }}
                alt="Logo"
              />
            </a>
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
        {!isNotDashboard && loggedIn && (
          <Header style={{ padding: 0, height: 58, backgroundColor: "white" }}>
            <Row justify="end">
              <Col style={{ right: "22px" }}>{user.username}</Col>
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

export default compose(
  withRouter,
  withState("loggedIn", "setLoggedIn", false),
  connect(
    ({ user }) => ({ user }),
    dispatch => ({
      deleteToken() {
        removeToken(dispatch);
      }
    })
  ),
  withHandlers({
    verifyToken,
    logoutEvent: ({ deleteToken }) => e => {
      deleteToken();
    }
  }),
  lifecycle({
    async componentDidMount() {
      try {
        await verifyToken();
        await this.props.setLoggedIn(true);
      } catch {
        if (this.props.router.route !== "/signin") {
          window.location.href = "/signin";
        }
      }
    }
  })
)(Page);
