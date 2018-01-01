import { FETCH_USER_WALLET } from "../actions/constants";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER_WALLET:
      return action.payload;
    default:
      return state;
  }
};
