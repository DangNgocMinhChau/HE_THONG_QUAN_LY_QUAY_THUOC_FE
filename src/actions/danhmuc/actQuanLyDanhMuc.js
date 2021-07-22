import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";

export function getAllDanhMucQuyenRequest(account_current) {
  return (dispatch) => {
    return callApi("quanlyquyen/find", "GET", null).then((res) => {
      if (res) {
        dispatch(getAllDanhMucQuyen(account_current, res.data.result));
      }
    });
  };
}

export const getAllDanhMucQuyen = (account_current, data) => {
  return {
    type: Types.FETCH_QUYEN,
    data,
    account_current,
  };
};
