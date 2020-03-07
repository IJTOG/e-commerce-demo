import { Table, Tag, Card, Button, Row, Col } from "antd";
import { compose } from "redux";
import { lifecycle, withHandlers, withState } from "recompose";
import { getProducts } from "../../lib/api";
import { PlusOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: text => <a>{text}</a>
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <span>
        {<img style={{ height: "40px" }} src={record.image}></img>}{" "}
        {record.name}
      </span>
    )
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price"
  },
  {
    title: "Detail",
    dataIndex: "detail",
    key: "detail"
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <Button size="small" style={{ backgroundColor: "#FFEC3D" }}>
          Edit
        </Button>
        <span> </span>
        <Button size="small" type="danger">
          Delete
        </Button>
      </span>
    )
  }
];

const Products = ({ data }) => (
  <Card title="Product" bordered={false} style={{ top: 20 }}>
    <Row justify="end">
      <Col>
        <Button style={{ marginBottom: "10px" }} type="primary">
          <PlusOutlined />
          Add product
        </Button>
      </Col>
    </Row>
    <Table columns={columns} dataSource={data} />
  </Card>
);

export default compose(
  withState("data", "setData", null),
  withHandlers({
    getProducts
  }),
  lifecycle({
    async componentDidMount() {
      let _product = await getProducts();
      _product.entities.map(item => {
        item.key = item.id;
      });
      await this.props.setData(_product.entities);
    }
  })
)(Products);
