import { combineReducers } from "redux";
import list from "./list";
import item from "./item";
import phieubanhangtheokhachhang from "./phieubanhangtheokhachhang";
import listlichsudieuchinhphieubanhang from "./list_lichsudieuchinhphieubanhang";

export default combineReducers({
  list,
  item,
  phieubanhangtheokhachhang,
  listlichsudieuchinhphieubanhang,
});
