import axios from "axios";
import {
  FETCH_USER_WALLET,
  GET_SEND_TRANSACTION,
  GET_RECEIVE_TRANSACTION,
  GET_INIT_TRANSACTION,
  GET_PENDING_TRANSACTION
} from "./constants";

export const getWallet = () => async dispatch => {
  const { data } = await axios.get("/api/user/wallet");
  dispatch({ type: FETCH_USER_WALLET, payload: data });
};

export const getSendTransaction = () => async dispatch => {
  const { data } = await axios.get("/api/user/transaction?type=send");
  dispatch({ type: GET_SEND_TRANSACTION, payload: data });
};

export const getReceiveTransaction = () => async dispatch => {
  const { data } = await axios.get("/api/user/transaction?type=receive");
  dispatch({ type: GET_RECEIVE_TRANSACTION, payload: data });
};

export const getInitTransaction = () => async dispatch => {
  const { data } = await axios.get("/api/user/transaction?type=init");
  dispatch({ type: GET_INIT_TRANSACTION, payload: data });
};

export const getPendingTransaction = () => async dispatch => {
  const { data } = await axios.get("/api/user/transaction?type=pending");
  dispatch({ type: GET_PENDING_TRANSACTION, payload: data });
};
