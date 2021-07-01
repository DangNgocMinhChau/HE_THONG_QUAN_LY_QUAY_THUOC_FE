import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { message } from "antd";
import * as Message from "../../constants/Message";
import moment from "moment";
import { renderDateTheoHeThong } from "./../../common/convert/renderConvert";

// Quản lý file

export function actFetchfilesRequest() {
  return (dispatch) => {
    return callApi("files", "GET", null).then((res) => {
      if (res) {
        dispatch(actFetchfiles(res.data));
      }
    });
  };
}

export function actFetchfilesToTypeRequest(type) {
  return (dispatch) => {
    return callApi(`files/${type}`, "GET", null).then((res) => {
      if (res) {
        dispatch(actFetchfiles(res.data));
      }
    });
  };
}

export const actFetchfiles = (data) => {
  return {
    type: Types.FETCH_FILES,
    data,
  };
};

export function actDeletefilesRequest(id) {
  return (dispatch) => {
    dispatch(actDeletefiles(id));
    return callApi(`files/${id}`, "DELETE", null).then((res) => {
      dispatch(actDeletefiles(id));
    });
  };
}

export const actDeletefiles = (id) => {
  return {
    type: Types.DELETE_FILES,
    id,
  };
};

export function actCreatefilesRequest(datafiles) {
  datafiles = {
    ...datafiles,
    ngayTaoBanGhi: renderDateTheoHeThong(),
  };
  return (dispatch) => {
    return callApi(`upload-file-gdriver`, "POST", datafiles).then((res) => {
      if (res) {
        message.success(Message.THEM_THANH_CONG);
        dispatch(actCreatefiles(res.data));
      }
    });
  };
}

export const actCreatefiles = (value) => {
  return {
    type: Types.CREATE_FILES,
    value,
  };
};

export function actGetfilesByIdRequest(id) {
  return (dispatch) => {
    return callApi(`upload-file-gdriver/${id}`, "GET", null).then((res) => {
      if (res) {
        dispatch(actGetfilesById(res.data));
      }
    });
  };
}

export const actGetfilesById = (value) => {
  return {
    type: Types.EDIT_FILES,
    value,
  };
};

export function actUpdatefilesRequest(value) {
  value = {
    ...value,
    ngayChinhSua: renderDateTheoHeThong(),
  };
  return (dispatch) => {
    return callApi(`upload-file-gdriver/${value.id}`, "PUT", value).then(
      (res) => {
        if (res) {
          message.success(Message.SUA_THANH_CONG);
          dispatch(actUpdatefiles(res.data));
        }
      }
    );
  };
}

export function actUpdateSetFlagRequest(value) {
  value = {
    ...value,
    flag: false,
    ngayChinhSua: renderDateTheoHeThong(),
  };
  return (dispatch) => {
    return callApi(`upload-file-gdriver/${value.id}`, "PUT", value).then(
      (res) => {
        if (res) {
          dispatch(actUpdatefiles(res.data));
        }
      }
    );
  };
}

export const actUpdatefiles = (value) => {
  return {
    type: Types.UPDATE_FILES,
    value,
  };
};
