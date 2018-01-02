import {
  FETCH_USER_WALLET,
  GET_SEND_TRANSACTION,
  GET_RECEIVE_TRANSACTION,
  GET_INIT_TRANSACTION,
  GET_PENDING_TRANSACTION
} from "../actions/constants";

const initialState = {
  wallet: null,
  send: null,
  receive: null,
  init: null,
  pending: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_WALLET:
      return { ...state, wallet: action.payload };
    case GET_SEND_TRANSACTION:
      return { ...state, send: action.payload };
    case GET_RECEIVE_TRANSACTION:
      return { ...state, receive: action.payload };
    case GET_INIT_TRANSACTION:
      return { ...state, init: action.payload };
    case GET_PENDING_TRANSACTION:
      return { ...state, pending: action.payload };
    default:
      return state;
  }
};
