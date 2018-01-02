import axios from "axios";
import {
  FETCH_SYSTEM_STATISTICS,
  FETCH_ALL_USERS_INFORMATION,
  FETCH_ALL_TRANSACTION_INFORMATION,
  FETCH_ADDRESS_PAGE,
  FETCH_TRANSACTION_PAGE,
  FETCH_USER_PAGE
} from "./constants";

export const fetchSystemStatistics = () => async dispatch => {
  const { data } = await axios.get("/api/system/statistics");
  dispatch({ type: FETCH_SYSTEM_STATISTICS, payload: data });
};

export const fetchAllUsersInformation = () => async dispatch => {
  const { data } = await axios.get("/api/system/users");
  dispatch({ type: FETCH_ALL_USERS_INFORMATION, payload: data });
};

export const fetchUsersPage = page => async dispatch => {
  const { data } = await axios.get("/api/system/allUsers?page=" + page);
  dispatch({ type: FETCH_USER_PAGE, payload: data });
};

export const fetchAllTransactionInformation = () => async dispatch => {
  const { data } = await axios.get("/api/system/transactions");
  dispatch({ type: FETCH_ALL_TRANSACTION_INFORMATION, payload: data });
};

export const fetchTransactionPage = page => async dispatch => {
  const { data } = await axios.get("/api/system/transactions?page=" + page);
  dispatch({ type: FETCH_TRANSACTION_PAGE, payload: data });
};

export const fetchAddressesPage = page => async dispatch => {
  const { data } = await axios.get("/api/system/addresses?page=" + page);
  dispatch({ type: FETCH_ADDRESS_PAGE, payload: data });
};
