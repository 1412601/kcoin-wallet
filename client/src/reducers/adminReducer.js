import {
  FETCH_SYSTEM_STATISTICS,
  FETCH_ALL_USERS_INFORMATION,
  FETCH_ALL_TRANSACTION_INFORMATION,
  FETCH_ALL_ADDRESS_INFORMATION
} from "../actions/constants";

const initialState = {
  systemStatistics: {},
  usersInformation: [],
  transInformation: [],
  addressesInformation: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SYSTEM_STATISTICS:
      return { ...state, systemStatistics: action.payload };
    case FETCH_ALL_USERS_INFORMATION:
      return { ...state, usersInformation: action.payload };
    case FETCH_ALL_TRANSACTION_INFORMATION:
      return { ...state, transInformation: action.payload };
    case FETCH_ALL_ADDRESS_INFORMATION:
      return { ...state, addressesInformation: action.payload };
    default:
      return state;
  }
};
