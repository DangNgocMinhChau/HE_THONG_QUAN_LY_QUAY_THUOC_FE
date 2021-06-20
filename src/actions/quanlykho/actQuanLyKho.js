import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import * as message from "../../constants/Message";
import moment from "moment";
import * as actQuanLyFile from "./../../actions/quanlyfiles/actQuanLyFiles";
import {
  openMessageLoading,
  thongBao,
} from "./../../constants/message/thongBao";
export const actFetchDataRequest = (data) => {
  return (dispatch) => {
    return callApi("url", "GET", null).then((res) => {
      dispatch(actFetchData(res.data));
    });
  };
};

export const actFetchData = (data) => {
  return {
    type: Types.FETCH_DATA,
    data,
  };
};

// Quản lý kho thuốc

export function actFetchKhoThuocRequest() {
  return (dispatch) => {
    return callApi("quanlykho", "GET", null).then((res) => {
      if (res) {
        dispatch(actFetchNhapKhoThuoc(res.data.result));
      }
    });
  };
}

export function actFetchThungRacKhoThuocRequest() {
  return (dispatch) => {
    return callApi("quanlykho/thungrackhothuoc", "GET", null).then((res) => {
      if (res) {
        dispatch(actFetchNhapKhoThuoc(res.data.result));
      }
    });
  };
}

export const actFetchNhapKhoThuoc = (data) => {
  return {
    type: Types.FETCH_NHAPKHOTHUOC,
    data,
  };
};

export function actDeleteNhapKhoThuocRequest(id) {
  return (dispatch) => {
    return callApi(`quanlykho/${id}`, "DELETE", null).then((res) => {
      if (res) {
        dispatch(actDeleteNhapKhoThuoc(id));
      }
    });
  };
}

export const actDeleteNhapKhoThuoc = (id) => {
  openMessageLoading(message.XOA_THANH_CONG);
  return {
    type: Types.DELETE_NHAPKHOTHUOC,
    id,
  };
};

export const actPhucHoiDuLieuKhoThuoc = (id) => {
  openMessageLoading(message.PHUC_HOI_DU_LIEU_THANH_CONG);
  return {
    type: Types.DELETE_NHAPKHOTHUOC,
    id,
  };
};

export function actCreateNhapKhoThuocRequest(value) {
  value = {
    ...value,
    ngayTaoBanGhi: moment().format("DD/MM/yyyy HH:mm:ss "),
  };
  return (dispatch) => {
    return callApi(`quanlykho`, "POST", value).then((res) => {
      if (res) {
        if (value && value.fileDinhKem) {
          let dataFiles = {
            fileDinhKem: value.fileDinhKem ? value.fileDinhKem : "",
            idThuoc: res.data.id,
          };
          dispatch(actQuanLyFile.actCreatefilesRequest(dataFiles));
        }
        thongBao(message.THEM_THANH_CONG);
        dispatch(actCreateNhapKhoThuoc(res.data.result));
      }
    });
  };
}

export const actCreateNhapKhoThuoc = (value) => {
  return {
    type: Types.CREATE_NHAPKHOTHUOC,
    value,
  };
};

export function actGetKhoThuocByIdRequest(id) {
  return (dispatch) => {
    return callApi(`quanlykho/${id}`, "GET", null).then((res) => {
      if (res) {
        dispatch(actGetKhoThuocById(res.data.result));
      }
    });
  };
}

export const actGetKhoThuocById = (value) => {
  return {
    type: Types.EDIT_NHAPKHOTHUOC,
    value,
  };
};

export function actUpdateThuocRequest(value) {
  value = {
    ...value,
    ngayChinhSua: moment().format("DD/MM/yyyy HH:mm:ss "),
  };
  return (dispatch) => {
    return callApi(`quanlykho/${value.id}`, "PUT", value).then((res) => {
      if (res) {
        thongBao(message.SUA_THANH_CONG);
        let data = {
          ...res.data.result,
          key: res.data.result.id,
          value: res.data.result.id,
          ten: res.data.result.tenThuoc,
        };
        dispatch(actUpdateThuoc(data));
      }
    });
  };
}

export function actUpdateSetFlagRequest(value, checkPhucHoiDuLieu = false) {
  return (dispatch) => {
    return callApi(`quanlykho/${value.id}`, "PUT", value).then((res) => {
      if (res) {
        dispatch(actUpdateThuoc(value.id));
        if (checkPhucHoiDuLieu) {
          dispatch(actPhucHoiDuLieuKhoThuoc(value.id));
        } else {
          dispatch(actDeleteNhapKhoThuoc(value.id));
        }
      }
    });
  };
}

export function actDeleteKhothuocRequest(value) {
  return (dispatch) => {
    return callApi(`quanlykho`, "DELETE", value).then((res) => {
      if (res) {
        res.data.listId.map((id, index) => {
          dispatch(actDeleteNhapKhoThuoc(id));
        });
      }
    });
  };
}

export function actDeleteKhothuocVinhVienRequest(value) {
  return (dispatch) => {
    return callApi(`quanlykho/xoavinhvien`, "DELETE", value).then((res) => {
      if (res) {
        res.data.listId.map((id, index) => {
          dispatch(actDeleteNhapKhoThuoc(id));
        });
      }
    });
  };
}

export const actUpdateThuoc = (value) => {
  return {
    type: Types.UPDATE_NHAPKHOTHUOC,
    value,
  };
};
