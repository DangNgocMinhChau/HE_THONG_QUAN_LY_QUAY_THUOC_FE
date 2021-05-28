import { combineReducers } from "redux";
import list from "./list";
import item from "./item";
import itemHoaDon from "./itemHoaDon";

export default combineReducers({
  list,
  item,
  itemHoaDon,
});
