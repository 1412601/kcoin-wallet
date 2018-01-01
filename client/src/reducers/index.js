import { combineReducers } from "redux";

//REDUCERS
import authReducer from "./authReducer";
import userReducer from "./userReducer";

export default combineReducers({
  authReducer,
  userReducer
});
