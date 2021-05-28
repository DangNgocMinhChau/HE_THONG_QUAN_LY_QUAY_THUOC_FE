import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { message } from "antd";
import * as Message from "../../constants/Message";

export function getAllThongBaoRequest() {
  return (dispatch) => {
    return callApi("quanlythongbao", "GET", null).then((res) => {
      if (res) {
        dispatch(actFetchAllThongBao(res.data));
      }
    });
  };
}

export const actFetchAllThongBao = (data) => {
  return {
    type: Types.FETCH_THONGBAO,
    data,
  };
};

export function actDelQuanLyThongBaoRequest(id) {
  return (dispatch) => {
    return callApi(`quanlythongbao/${id}`, "DELETE", null).then((res) => {
      if (res) {
        dispatch(actDeleteThongBao(id));
      }
    });
  };
}

export const actDeleteThongBao = (id) => {
  return {
    type: Types.DELETE_THONGBAO,
    id,
  };
};

export function actCreateThongBaoRequest(value) {
  return (dispatch) => {
    return callApi(`quanlythongbao`, "POST", value).then((res) => {
      if (res) {
      }
    });
  };
}
