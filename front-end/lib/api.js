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

const getChangeticketByReleaseCycle = async Body => {
  try {
    let response = await axios.post(
      `${constants.API}/snow/changeticket/releasecycle`,
      {
        ...Body
      }
    );
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
};

export { signin, verifyToken };
