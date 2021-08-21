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
  var { fieldRedux, data } = action;
  switch (action.type) {
    case Types.SELECT_CRUD:
      let select = {};
      if (fieldRedux == "tag") {
        select = {
          tag: data,
        };
      }
      if (fieldRedux == "quyen" || fieldRedux === "quyenId") {
        select = {
          quyen: data,
        };
      }

      if (fieldRedux == "file") {
        select = {
          file: data,
        };
      }
      state = { ...state, ...select };
      return { ...state };
    default:
      return { ...state };
  }
};

export default list;
