import { combineReducers } from "redux";

//REDUCERS
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
  authReducer,
  userReducer,
  adminReducer,
  messageReducer
});
