import { Table, Card, Button, Row, Col, Modal } from "antd";
const { Column } = Table;
import Link from "next/link";
import { compose } from "redux";
import { lifecycle, withHandlers, withState } from "recompose";
import { getProducts, deleteProduct } from "../../lib/api";
import { PlusOutlined } from "@ant-design/icons";

const Products = ({ data, visible, handleOk, handleCancel, showModal }) => (
  <Card title="Product" bordered={false} style={{ top: 20 }}>
    <Row justify="end">
      <Col>
        <Button style={{ marginBottom: "10px" }} type="primary">
          <PlusOutlined />
          <Link href={"/Products/create"}>
            <a style={{ color: "white" }}>Add product</a>
          </Link>
        </Button>
      </Col>
    </Row>
    <Table dataSource={data}>
      <Column title="Id" dataIndex="id" key="id" />
      <Column
        title="Image"
        dataIndex="image"
        key="Image"
        render={(text, record) => (
          <span>
            {<img style={{ height: "40px" }} src={record.image}></img>}{" "}
          </span>
        )}
      />
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Price" dataIndex="price" key="price" />
      <Column title="Detail" dataIndex="detail" key="detail" />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <span>
            <Button size="small" style={{ backgroundColor: "#FFEC3D" }}>
              <Link href={"/Products/" + record.id}>Edit</Link>
            </Button>
            <span> </span>
            <Button
              name={record.id}
              onClick={showModal}
              size="small"
              type="danger"
            >
              Delete
            </Button>
          </span>
        )}
      />
    </Table>
    <Modal
      title="Delete row"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Are you sure?</p>
    </Modal>
  </Card>
);

export default compose(
  withState("selected", "setSelected", null),
  withState("visible", "setVisible", false),
  withState("data", "setData", null),
  withHandlers({
    fecthData: ({ setData }) => async () => {
      let _product = await getProducts();
      _product.entities.map(item => {
        item.key = item.id;
      });
      await setData(_product.entities);
    }
  }),
  withHandlers({
    deleteProduct,
    getProducts,
    showModal: ({ setVisible, setSelected }) => e => {
      setSelected(e.target.name);
      setVisible(true);
    },
    handleOk: ({ setVisible, selected, fecthData }) => async e => {
      await deleteProduct(selected);
      await fecthData();
      setVisible(false);
    },
    handleCancel: ({ setVisible }) => e => {
      setVisible(false);
    }
  }),
  lifecycle({
    async componentDidMount() {
      await this.props.fecthData();
    }
  })
)(Products);
