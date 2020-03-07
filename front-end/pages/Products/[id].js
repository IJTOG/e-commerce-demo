import { Card, Row, Col } from "antd";
import { compose } from "redux";
import { lifecycle, withHandlers, withState } from "recompose";
import { getProducts } from "../../lib/api";
import { withRouter } from "next/router";

const Product = ({ router }) => (
  <Card title="Product" bordered={false} style={{ top: 20 }}>
    <Row justify="end">
      <Col>TEST</Col>
    </Row>
  </Card>
);

export default compose(
  withRouter,
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
)(Product);
