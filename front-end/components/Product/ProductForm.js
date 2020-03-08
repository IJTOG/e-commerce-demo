import { Button, Row, Col, Form, Input, Upload, message } from "antd";
import { lifecycle, withHandlers, withState, withProps } from "recompose";
import { withRouter } from "next/router";
import { compose } from "redux";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadImage, updateProduct, createProduct } from "../../lib/api";
const { TextArea } = Input;
import styled from "styled-components";

const ProductForm = ({
  beforeUpload,
  handleChange,
  imageUrl,
  loading,
  form,
  onSubmit,
  handleTextChange,
  nameHelptext,
  priceHelptext,
  detailHelptext
}) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      lg: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      lg: { span: 18 }
    }
  };
  return (
    <Row justify="center">
      <Col xs={20} md={8}>
        <Form {...formItemLayout}>
          <Form.Item
            label={<span>Product name </span>}
            validateStatus={nameHelptext.type}
            help={nameHelptext.text}
          >
            <Input
              onChange={e => handleTextChange(e, "name")}
              type="text"
              value={form.name}
            />
          </Form.Item>
          <Form.Item
            label={<span>Product price </span>}
            validateStatus={priceHelptext.type}
            help={priceHelptext.text}
          >
            <Input
              onChange={e => handleTextChange(e, "price")}
              type="number"
              value={form.price}
            />
          </Form.Item>
          <Form.Item
            label={<span>Detail </span>}
            validateStatus={detailHelptext.type}
            help={detailHelptext.text}
          >
            <TextArea
              onChange={e => handleTextChange(e, "detail")}
              value={form.detail}
            />
          </Form.Item>
          <Form.Item label="Image">
            <Upload
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <StyledImg
                  src={imageUrl}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div className="ant-upload-text">Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
        <Row justify="end">
          <Button onClick={onSubmit} type="primary" htmlType="submit">
            Submit
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

const StyledImg = styled.img`
  width: 100%;
`;

export default compose(
  withState("form", "setForm", { name: "", price: 0, detail: "" }),
  withState("Product", "setProduct", ""),
  withState("imageUrl", "setImageUrl", null),
  withState("loading", "setLoading", false),
  withState("editMode", "setEditmode", false),
  withState("nameHelptext", "setNameHelptext", { type: null, text: null }),
  withState("priceHelptext", "setPriceHelptext", { type: null, text: null }),
  withState("detailHelptext", "setDetailHelptext", { type: null, text: null }),
  withProps(props => {
    return props;
  }),
  withRouter,
  withHandlers({
    validateForm: ({
      form,
      setNameHelptext,
      setPriceHelptext,
      setDetailHelptext
    }) => async () => {
      let notError = true;
      if (form.name === "") {
        setNameHelptext({ type: "error", text: "Please input product name!" });
        notError = false;
      } else setNameHelptext({ type: null, text: null });
      if (form.price === 0) {
        setPriceHelptext({
          type: "error",
          text: "Please input product price!"
        });
        notError = false;
      } else setPriceHelptext({ type: null, text: null });
      if (form.detail === "") {
        setDetailHelptext({
          type: "error",
          text: "Please input product detail!"
        });
        notError = false;
      } else setDetailHelptext({ type: null, text: null });
      return notError;
    }
  }),
  withHandlers({
    uploadImage,
    updateProduct,
    createProduct,
    onSubmit: ({ form, imageUrl, editMode, validateForm }) => async () => {
      const _form = form;
      if (await validateForm()) {
        if (imageUrl) _form.image = imageUrl;
        else _form.image = "https://via.placeholder.com/300";
        try {
          if (editMode) await updateProduct(form);
          else await createProduct(_form);
          window.location.href = "/Products";
        } catch {
          alert("error");
        }
      }
    },
    handleTextChange: ({ form, setForm }) => async ({ target }, name) => {
      let _form = form;
      _form[name] = target.value;
      setForm(_form);
    },
    handleChange: ({ setLoading, setImageUrl }) => async info => {
      if (info.file.status === "uploading") {
        setLoading({ loading: true });
        return;
      }
      if (info.file.status === "done") {
        let url = await uploadImage(info.file.originFileObj);

        setImageUrl(url);
      }
    },
    beforeUpload: () => file => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    }
  }),
  lifecycle({
    async componentDidUpdate(nextProps) {
      if (this.props.product !== nextProps.product) {
        const data = this.props.product.entities;
        const _form = {
          id: data.id,
          name: data.name,
          price: data.price,
          detail: data.detail,
          image: data.image
        };
        this.props.setImageUrl(data.image);
        this.props.setForm(_form);
        this.props.setEditmode(true);
      }
    }
  })
)(ProductForm);
