import * as Types from "../../constants/ActionType";
var initialState = [];

const hoadonthanhcongtheokhachhang = (state = initialState, action) => {
  var index = -1;
  var { id, value, data } = action;
  switch (action.type) {
    case Types.HOADONDAHOANTAT_THEO_KHACHHANG:
      state = value;
      return [...state];
    default:
      return [...state];
  }
};

export default hoadonthanhcongtheokhachhang;
