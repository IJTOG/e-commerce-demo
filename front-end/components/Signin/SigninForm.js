import { Form, Input, Button, Card, Row, Col } from "antd";
import { signin } from "../../lib/api";
import { compose } from "redux";
import { withState, withHandlers } from "recompose";
import { connect } from "react-redux";
import { SaveUser } from "../../redux/action";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const Signin = ({ onFinish, error_text }) => {
  return (
    <Row justify="center">
      <Col lg={8} xs={18}>
        <Card title="Sign in" bordered={false} style={{ top: "5vh" }}>
          <img
            src={require("../../static/logo.png")}
            style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
            alt="Logo"
          />
          <Row justify="center" style={{ color: "red", marginBottom: "10px" }}>
            {error_text}
          </Row>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: false }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" }
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default compose(
  connect(),
  withState("username", "setUsername", ""),
  withState("password", "setPassword", ""),
  withState("error_text", "setError_text", null),
  withHandlers({
    SaveUser,
    onFinish: ({ setError_text, dispatch }) => async e => {
      try {
        const _user = await signin(e.username, e.password);
        localStorage.setItem("access-token", _user.token);
        dispatch(SaveUser(_user));
        window.location.href = "/";
      } catch (err) {
        setError_text("Username or Password is incorrect");
      }
    }
  })
)(Signin);
