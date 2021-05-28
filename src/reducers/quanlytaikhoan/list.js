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
    case Types.FETCH_TAIKHOAN:
      var arayNew = [];
      if (data) {
        data.map((item, index) => {
          item = {
            ...item,
            key: item.id,
          };
          arayNew.push(item);
        });
      }

      state = arayNew;
      return [...state];
    case Types.CREATE_TAIKHOAN:
      state.push(action.value);
      return [...state];
    case Types.DELETE_TAIKHOAN:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    case Types.UPDATE_TAIKHOAN:
      index = findIndex(state, value.id);
      state[index] = value;
      return [...state];
    default:
      return [...state];
  }
};

export default list;
