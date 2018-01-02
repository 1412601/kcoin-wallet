import axios from "axios";
import {
  FETCH_SYSTEM_STATISTICS,
  FETCH_ALL_USERS_INFORMATION,
  FETCH_ALL_TRANSACTION_INFORMATION,
  FETCH_ALL_ADDRESS_INFORMATION
} from "./constants";

export const fetchSystemStatistics = () => async dispatch => {
  const { data } = await axios.get("/api/system/statistics");
  dispatch({ type: FETCH_SYSTEM_STATISTICS, payload: data });
};

export const fetchAllUsersInformation = () => async dispatch => {
  const { data } = await axios.get("/api/system/users");
  dispatch({ type: FETCH_ALL_USERS_INFORMATION, payload: data });
};

export const fetchAllTransactionInformation = () => async dispatch => {
  const { data } = await axios.get("/api/system/transactions");
  dispatch({ type: FETCH_ALL_TRANSACTION_INFORMATION, payload: data });
};

export const fetchAllAddressesInformation = () => async dispatch => {
  const { data } = await axios.get("/api/system/addresses");
  dispatch({ type: FETCH_ALL_ADDRESS_INFORMATION, payload: data });
};
