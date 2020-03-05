const initialState = {
  username: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_USER":
      state = action.payload;
      return state;

    case "DELETE_USER":
      state = initialState;
      return state;

    default:
      return state;
  }
};
