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
import styled from "styled-components";

const { Header, Content, Footer, Sider } = Layout;

const NonDashboardRoutes = ["/signin"];

const Page = ({
  router,
  children,
  user,
  loggedIn,
  logoutEvent,
  routeActive
}) => {
  const isNotDashboard = NonDashboardRoutes.includes(router.pathname);

  const menu = (
    <Menu>
      <Menu.Item onClick={logoutEvent}>Log out</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isNotDashboard && loggedIn && (
        <StyledSider breakpoint="lg" collapsedWidth="0">
          <div className="logo" />
          <Menu defaultSelectedKeys={[routeActive]} mode="inline">
            <a href="/">
              <StyledImg src={require("../static/logo-2.png")} alt="Logo" />
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
        </StyledSider>
      )}
      <Layout style={{ height: "100vh", overflow: "auto" }}>
        {!isNotDashboard && loggedIn && (
          <StyledHeader>
            <Row justify="end">
              <Col style={{ right: "22px" }}>{user.username}</Col>
              <Col>
                <Dropdown
                  trigger={["click"]}
                  overlay={menu}
                  placement="bottomRight"
                >
                  <StyledAvatar icon={<UserOutlined />} />
                </Dropdown>
              </Col>
            </Row>
          </StyledHeader>
        )}
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>E-commerce 2020</Footer>
      </Layout>
    </Layout>
  );
};

const StyledSider = styled(Sider)`
  background-color: white;
  height: 100vh;
`;

const StyledAvatar = styled(Avatar)`
  right: 17px;
  cursor: pointer;
`;

const StyledHeader = styled(Header)`
  padding: 0px;
  height: 58px;
  background-color: white;
`;

const StyledImg = styled.img`
  width: 100%;
  margin-bottom: 2px;
`;

export default compose(
  withRouter,
  withState("routeActive", "setRouteActive", ""),
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
    routes,
    verifyToken,
    logoutEvent: ({ deleteToken }) => e => {
      deleteToken();
    }
  }),
  lifecycle({
    async componentDidMount() {
      try {
        await this.props.setRouteActive(
          routes.find(item => item.path === this.props.router.route).name
        );
      } catch {}
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
