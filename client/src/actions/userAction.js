import axios from "axios";
import { FETCH_USER_WALLET } from "./constants";

export const getWallet = () => async dispatch => {
  const { data } = await axios.get("/api/user/wallet");
  dispatch({ type: FETCH_USER_WALLET, payload: data });
};
