import axios from "axios";
// import { getToken } from "./auth";

const url_api = process.env.url_api;
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
    let response = await axios.post(`http://localhost:3001/api/user/login`, {
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
    let response = await axios.get(`http://localhost:3001/api/user`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getProducts = async () => {
  try {
    let response = await axios.get(`http://localhost:3001/api/products`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getProduct = async _id => {
  try {
    let response = await axios.get(`http://localhost:3001/api/products/` + _id);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const createProduct = async form => {
  try {
    let response = await axios.post(
      `http://localhost:3001/api/products/create`,
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
      `http://localhost:3001/api/products/update`,
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
      `http://localhost:3001/api/products/delete/` + _id
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
    let response = await axios.post(`http://localhost:3001/api/files`, form);
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
