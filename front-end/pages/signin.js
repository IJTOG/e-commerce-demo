import { Form, Input, Button, Checkbox, Card, Row, Col } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const Signin = () => {
  const onFinish = values => {
    console.log("Success:", values);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="center">
      <Col lg={8} xs={18}>
        <Card title="Sign in" bordered={false} style={{ top: "5vh" }}>
          <img
            src={require("../static/logo.png")}
            style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
            alt="Logo"
          />
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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

export default Signin;
