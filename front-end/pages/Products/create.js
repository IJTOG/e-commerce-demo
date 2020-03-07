import { Card } from "antd";
import { compose } from "redux";
import { lifecycle, withHandlers } from "recompose";
import ProductForm from "../../components/Product/ProductForm";

const Product = () => (
  <Card title="Add Product" bordered={false} style={{ top: 20 }}>
    <ProductForm />
  </Card>
);

export default compose(
  withHandlers({}),
  lifecycle({
    async componentDidMount() {}
  })
)(Product);
