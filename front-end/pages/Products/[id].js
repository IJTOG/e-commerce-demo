import { Card, Row, Col } from "antd";
import { compose } from "redux";
import { lifecycle, withHandlers, withState } from "recompose";
import { getProduct } from "../../lib/api";
import { withRouter } from "next/router";
import ProductForm from "../../components/Product/ProductForm";

const Product = ({ product }) => (
  <Card title="Edit Product" bordered={false} style={{ top: 20 }}>
    <ProductForm product={product} />
  </Card>
);

export default compose(
  withRouter,
  withState("product", "setProduct", null),
  withHandlers({
    getProduct
  }),
  lifecycle({
    async componentDidMount() {
      let _product = await getProduct(this.props.query.id);
      await this.props.setProduct(_product);
    }
  })
)(Product);
