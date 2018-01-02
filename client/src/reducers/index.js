import { combineReducers } from "redux";

//REDUCERS
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
  authReducer,
  userReducer,
  adminReducer
});
