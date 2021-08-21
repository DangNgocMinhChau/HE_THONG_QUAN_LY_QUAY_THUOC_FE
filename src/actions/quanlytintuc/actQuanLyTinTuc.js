import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";

export function actFetchTinTucRequest() {
  return (dispatch) => {
    return callApi("/quanlybaiviet/find", "GET", null).then((res) => {
      if (res) {
        dispatch(actFetchTinTuc(res.data.result));
        console.log(res);
      }
    });
  };
}

export const actFetchTinTuc = (data) => {
  return {
    type: Types.FETCH_TINTUC,
    data,
  };
};
