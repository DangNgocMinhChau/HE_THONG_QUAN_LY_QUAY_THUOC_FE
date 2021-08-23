import { combineReducers } from "redux";
import quyen from "./quyen";
import select from "./select";
import nhacungcap from "./nhacungcap";

export default combineReducers({
  quyen,
  select,
  nhacungcap,
});
