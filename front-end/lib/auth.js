import { DeleteUser } from "../redux/action";

const setToken = headers => {
  localStorage.setItem("access-token", headers);
};

const getToken = () => localStorage.getItem("access-token");

const removeToken = dispatch => {
  localStorage.removeItem("access-token");
  dispatch(DeleteUser());
  window.location.reload();
};

export { setToken, getToken, removeToken };
