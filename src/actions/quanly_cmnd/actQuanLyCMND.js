import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { message } from "antd";
import * as Message from "../../constants/Message";

export function getAllCMNDRequest() {
  return (dispatch) => {
    return callApi("quanlycmnd", "GET", null).then((res) => {
      if (res) {
        dispatch(actFetchAllCMND(res.data.result));
      }
    });
  };
}

export const actFetchAllCMND = (data) => {
  return {
    type: Types.FETCH_CMND,
    data,
  };
};

export function actDelCMNDRequest(id) {
  return (dispatch) => {
    return callApi(`quanlycmnd/${id}`, "DELETE", null).then((res) => {
      if (res) {
        dispatch(actDeleteCMND(id));
      }
    });
  };
}

export const actDeleteCMND = (id) => {
  return {
    type: Types.DELETE_CMND,
    id,
  };
};

export function actCreateCMNDRequest(value) {
  return (dispatch) => {
    return callApi(`quanlycmnd`, "POST", value).then((res) => {
      if (res) {
        message.success(Message.THEM_THANH_CONG);
        dispatch(actCreateCMND(res.data));
      }
    });
  };
}

export const actCreateCMND = (value) => {
  return {
    type: Types.CREATE_CMND,
    value,
  };
};
