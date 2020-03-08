import axios from "axios";
// import { getToken } from "./auth";

const host = process.env.host;
const port = process.env.port;
// --------------------------------------- Always attached Access token(If exist) ------------------------------------------
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("access-token");

    if (token) {
      config.headers["Authorization"] = token;
    }

    return config;
  },

  error => {
    return Promise.reject(error);
  }
);

const signin = async (username, password) => {
  try {
    let response = await axios.post(`http://${host}:${port}/api/user/login`, {
      username,
      password
    });
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const verifyToken = async () => {
  try {
    let response = await axios.get(`http://${host}:${port}/api/user`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getProducts = async () => {
  try {
    let response = await axios.get(`http://${host}:${port}/api/products`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getProduct = async _id => {
  try {
    let response = await axios.get(
      `http://${host}:${port}/api/products/` + _id
    );
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const createProduct = async form => {
  try {
    let response = await axios.post(
      `http://${host}:${port}/api/products/create`,
      form
    );
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const updateProduct = async form => {
  try {
    let response = await axios.patch(
      `http://${host}:${port}/api/products/update`,
      form
    );
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const deleteProduct = async _id => {
  try {
    let response = await axios.delete(
      `http://${host}:${port}/api/products/delete/` + _id
    );
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const uploadImage = async image => {
  try {
    const form = new FormData();
    form.append("file", image);
    let response = await axios.post(`http://${host}:${port}/api/files`, form);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export {
  signin,
  verifyToken,
  getProducts,
  getProduct,
  deleteProduct,
  uploadImage,
  updateProduct,
  createProduct
};
