import * as Types from "../../../constants/ActionType";
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
  var { id, value, data, account_current } = action;
  switch (action.type) {
    case Types.FETCH_QUYEN:
      if (data) {
        let list = [];
        data.map((item, index) => {
          item = {
            ...item,
            value: item.id,
          };
          list.push(item);
        });
        state = list;
      }
      return [...state];
    default:
      return [...state];
  }
};

export default list;
