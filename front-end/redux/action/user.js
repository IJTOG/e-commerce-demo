export const SaveUser = data => {
  return {
    type: "SAVE_USER",
    payload: {
      username: data.username
    }
  };
};

export const DeleteUser = () => {
  return {
    type: "DELETE_USER"
  };
};
