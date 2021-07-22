import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { message } from "antd";
import {
  openMessageLoading,
  thongBao,
} from "../../common/renderThongBao/renderThongBaoCommon";
import { renderDateTheoHeThong } from "../../common/convert/renderConvert";

export const actFindRequest = (url) => {
  return (dispatch) => {
    return callApi(`${url}/find`, "GET", null).then((res) => {
      if (res) {
        dispatch(actFind(res.data.result));
      }
    });
  };
};

export const actFind = (data) => {
  return {
    type: Types.FETCH_CRUD,
    data,
  };
};

export const resetList = (data) => {
  return {
    type: Types.FETCH_CRUD,
    data,
  };
};

export function actDeleteRequest(url, value) {
  return (dispatch) => {
    return callApi(`${url}`, "DELETE", value).then((res) => {
      if (res) {
        res.data.listId.map((id, index) => {
          dispatch(actDelete(id, res.data.msg));
        });
      }
    });
  };
}

export const actDelete = (id, msg) => {
  openMessageLoading(msg);
  return {
    type: Types.DELETE_CRUD,
    id,
  };
};

export function actCreateRequest(url, value) {
  return (dispatch) => {
    return callApi(`${url}`, "POST", value).then((res) => {
      if (res) {
        thongBao(res.data.msg);
        dispatch(actCreate(res.data.result));
      }
    });
  };
}

export const actCreate = (value) => {
  return {
    type: Types.CREATE_CRUD,
    value,
  };
};

export function actGetIdRequest(url, id) {
  return (dispatch) => {
    return callApi(`${url}/${id}`, "GET", null).then((res) => {
      if (res) {
        dispatch(actGetById(res.data.result));
      }
    });
  };
}

export const actGetById = (value) => {
  return {
    type: Types.EDIT_CRUD,
    value,
  };
};

export function actUpdateRequest(url, value) {
  return (dispatch) => {
    return callApi(`${url}/${value.id}`, "PUT", value).then((res) => {
      if (res) {
        thongBao(res.data.msg);
        dispatch(actUpdate(res.data.result));
      }
    });
  };
}

export function actUpdateSetFlagRequest(url, value) {
  return (dispatch) => {
    return callApi(`${url}/${value.id}`, "PUT", value).then((res) => {
      if (res) {
        dispatch(actUpdate(res.data));
      }
    });
  };
}
export const actUpdate = (value) => {
  return {
    type: Types.UPDATE_CRUD,
    value,
  };
};
