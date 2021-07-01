import * as Types from "../../../constants/ActionType";
var initialState = [];

const listlichsudieuchinhphieubanhang = (state = initialState, action) => {
  var index = -1;
  var { id, value, data } = action;
  switch (action.type) {
    case Types.FETCH_LICHSUHOADON:
      var arayNew = [];
      if (data) {
        data.map((item, index) => {
          item = {
            ...item,
            key: item.thuocId,
          };
          arayNew.push(item);
        });
      }

      state = arayNew;
      return [...state];
    default:
      return [...state];
  }
};

export default listlichsudieuchinhphieubanhang;
