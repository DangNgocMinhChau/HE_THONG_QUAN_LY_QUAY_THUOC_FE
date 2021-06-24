import { combineReducers } from "redux";
import list from "./list";
import item from "./item";
import hoadonthanhcongtheokhachhang from "./hoadonthanhcongtheokhachhang";
import listlichsuhoadon from "./list_lichsuhoadon";

export default combineReducers({
  list,
  item,
  hoadonthanhcongtheokhachhang,
  listlichsuhoadon,
});
