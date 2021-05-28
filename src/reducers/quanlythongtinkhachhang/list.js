import * as Types from "../../constants/ActionType";
var initialState = [];

var findIndex = (data, id) => {
  var result = -1;
  data.forEach((data, index) => {
    if (data.id === id) {
      result = index;
    }
  });
  return result;
};

const list = (state = initialState, action) => {
  var index = -1;
  var { id, value, data } = action;
  switch (action.type) {
    case Types.FETCH_THONGTINKHACHHANG:
      var arayNew = [];
      if (data) {
        data.map((item, index) => {
          item = {
            ...item,
            key: item.id,
            value: item.id,
            ten: item.soDienThoai,
          };
          arayNew.push(item);
        });
      }

      state = arayNew;
      return [...state];
    case Types.CREATE_THONGTINKHACHHANG:
      state.push(action.value);
      return [...state];
    case Types.DELETE_THONGTINKHACHHANG:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    case Types.UPDATE_THONGTINKHACHHANG:
      index = findIndex(state, value.id);
      state[index] = value;
      return [...state];
    default:
      return [...state];
  }
};

export default list;
