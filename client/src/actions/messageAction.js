import {
  MESSAGE_EMAIL,
  MESSAGE_CONFIRM,
  MESSAGE_CANCEL,
  MESSAGE_INIT,
  REMOVE_MESSAGE,
  MESSAGE_GET_COIN,
  MESSAGE_EMPTY_BALANCE,
  MESSAGE_NEW_TRANS
} from "../actions/constants";

export const resetMessage = () => dispatch => {
  dispatch({ type: REMOVE_MESSAGE });
};
export const initMessage = () => dispatch => {
  dispatch({ type: MESSAGE_INIT });
};
export const confirmMessage = () => dispatch => {
  dispatch({ type: MESSAGE_CONFIRM });
};
export const cancelMessage = () => dispatch => {
  dispatch({ type: MESSAGE_CANCEL });
};
export const emailMessage = () => dispatch => {
  dispatch({ type: MESSAGE_EMAIL });
};
export const getCoinMessage = () => dispatch => {
  dispatch({ type: MESSAGE_GET_COIN });
};
export const emptyBalanceMessage = () => dispatch => {
  dispatch({ type: MESSAGE_EMPTY_BALANCE });
};
export const newTrans = address => dispatch => {
  dispatch({ type: MESSAGE_NEW_TRANS, address });
};
