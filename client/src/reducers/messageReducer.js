import {
  MESSAGE_EMAIL,
  MESSAGE_CONFIRM,
  MESSAGE_CANCEL,
  MESSAGE_INIT,
  REMOVE_MESSAGE,
  MESSAGE_GET_COIN,
  MESSAGE_EMPTY_BALANCE,
  MESSAGE_NEW_TRANS,
  MESSAGE_CONFIRM_TRANS
} from "../actions/constants";

const initialState = {
  message: "",
  type: -1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_MESSAGE:
      return {
        message: "",
        type: -1
      };
    case MESSAGE_INIT:
      return {
        message:
          "You have created a new transaction successfully. Check INIT tabs to confirm transaction.",
        type: 1
      };
    case MESSAGE_CONFIRM:
      return {
        message:
          "You have confirmed a transaction successfully. Check PENDING tabs to see transaction's status",
        type: 1
      };
    case MESSAGE_CANCEL:
      return {
        message: "You have deleted a transaction successfully.",
        type: 2
      };
    case MESSAGE_EMAIL:
      return {
        message: "We have sent activation link to your email. Please check!",
        type: 0
      };
    case MESSAGE_GET_COIN:
      return {
        message:
          "You have requested KCoin successfully, transaction is pending now!",
        type: 1
      };
    case MESSAGE_EMPTY_BALANCE:
      return {
        message: "You don't have enough coin to create new transactions!",
        type: 2
      };
    case MESSAGE_NEW_TRANS:
      return {
        message: `You have been received a transaction from ${action.address}`,
        type: 0
      };
    case MESSAGE_CONFIRM_TRANS:
      return {
        message: `We have sent a ${
          action.type
        } transaction link to your email. Please check!`,
        type: 1
      };
    default:
      return state;
  }
};
