import * as Types from "../../../constants/ActionType";
var initialState = [];

const list = (state = initialState, action) => {
  var { data } = action;
  switch (action.type) {
    case Types.FETCH_NHACUNGCAP_SELECT:
      if (data) {
        state = data;
      }
      return [...state];
    default:
      return [...state];
  }
};

export default list;
