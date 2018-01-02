import {
  FETCH_SYSTEM_STATISTICS,
  FETCH_ALL_USERS_INFORMATION,
  FETCH_ALL_TRANSACTION_INFORMATION,
  FETCH_ADDRESS_PAGE,
  FETCH_TRANSACTION_PAGE,
  FETCH_USER_PAGE
} from "../actions/constants";

const initialState = {
  systemStatistics: null,
  usersInformation: [],
  transInformation: {
    trans: [],
    numbOfPages: 0,
    MAX_RECORDS: 0
  },
  addressesInformation: {
    addresses: [],
    numbOfPages: 0,
    MAX_RECORDS: 0
  },
  usersPage: {
    users: [],
    numbOfPages: 0,
    MAX_RECORDS: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SYSTEM_STATISTICS:
      return { ...state, systemStatistics: action.payload };
    case FETCH_ALL_USERS_INFORMATION:
      return { ...state, usersInformation: action.payload };
    case FETCH_ALL_TRANSACTION_INFORMATION:
      return { ...state, transInformation: action.payload };
    case FETCH_ADDRESS_PAGE:
      return { ...state, addressesInformation: action.payload };
    case FETCH_TRANSACTION_PAGE:
      return { ...state, transInformation: action.payload };
    case FETCH_USER_PAGE:
      return { ...state, usersPage: action.payload };
    default:
      return state;
  }
};
