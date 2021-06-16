import { combineReducers } from "redux";
import list from "./list";
import item from "./item";
import hoadonthanhcongtheokhachhang from "./hoadonthanhcongtheokhachhang";

export default combineReducers({
  list,
  item,
  hoadonthanhcongtheokhachhang,
});
