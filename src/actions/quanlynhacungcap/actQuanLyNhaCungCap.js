import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import * as actNhapThuoc from "../quanlykho/actQuanLyKho";
import {
  openMessageLoading,
  thongBao,
} from "./../../common/renderThongBao/renderThongBaoCommon";
import * as message from "./../../constants/Message";
import { renderDateTheoHeThong } from "./../../common/convert/renderConvert";

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

export function actFetchNhaCungCapRequest() {
  return (dispatch) => {
    return callApi("quanlynhacungcap", "GET", null).then((res) => {
      if (res) {
        dispatch(actFetchNhaCungCap(res.data.result));
      }
    });
  };
}

export const actFetchNhaCungCap = (data) => {
  return {
    type: Types.FETCH_NHACUNGCAP,
    data,
  };
};

export function actDeleteNhaCungCapRequest(id) {
  return (dispatch) => {
    return callApi(`quanlynhacungcap/${id}`, "DELETE", null).then((res) => {
      if (res) {
        dispatch(actDeleteNhaCungCap(id));
      }
    });
  };
}

export const actDeleteNhaCungCap = (id) => {
  openMessageLoading(message.XOA_THANH_CONG);
  return {
    type: Types.DELETE_NHACUNGCAP,
    id,
  };
};

export function actCreateNhaCungCapRequest(dataNhaCungCap, dataThuoc) {
  dataNhaCungCap = {
    ...dataNhaCungCap,
    ngayTaoBanGhi: renderDateTheoHeThong(),
  };
  return (dispatch) => {
    return callApi(`quanlynhacungcap`, "POST", dataNhaCungCap).then((res) => {
      if (res) {
        thongBao(message.THEM_THANH_CONG);
        if (dataThuoc && dataThuoc.id) {
          dataThuoc = {
            ...dataThuoc,
            ngayChinhSua: renderDateTheoHeThong(),
            nhaCungCapId: res.data.result.id,
          };
          dispatch(actNhapThuoc.actUpdateThuocRequest(dataThuoc));
        } else {
          if (dataThuoc && dataThuoc !== undefined && dataThuoc !== null) {
            dataThuoc = {
              ...dataThuoc,
              ngayTaoBanGhi: renderDateTheoHeThong(),
              nhaCungCapId: res.data.result.id,
            };
            dispatch(actNhapThuoc.actCreateNhapKhoThuocRequest(dataThuoc));
          }
        }
        dispatch(actCreateNhaCungCap(res.data.result));
      }
    });
  };
}

export const actCreateNhaCungCap = (value) => {
  value = {
    ...value,
    value: value.id,
    ten: value.tenNhaCungCap,
  };
  return {
    type: Types.CREATE_NHACUNGCAP,
    value,
  };
};

export function actGetNhaCungCapByIdRequest(id) {
  return (dispatch) => {
    return callApi(`quanlynhacungcap/${id}`, "GET", null).then((res) => {
      if (res) {
        dispatch(actGetNhaCungCapById(res.data.result));
      }
    });
  };
}

export const actGetNhaCungCapById = (value) => {
  return {
    type: Types.EDIT_NHACUNGCAP,
    value,
  };
};

export function actUpdateNhaCungCapRequest(value) {
  return (dispatch) => {
    return callApi(`quanlynhacungcap/${value.id}`, "PUT", value).then((res) => {
      if (res) {
        thongBao(message.SUA_THANH_CONG);
        dispatch(actUpdateNhaCungCap(res.data));
      }
    });
  };
}

export function actUpdateSetFlagRequest(value) {
  return (dispatch) => {
    return callApi(`quanlynhacungcap/${value.id}`, "PUT", value).then((res) => {
      if (res) {
        dispatch(actUpdateNhaCungCap(res.data));
      }
    });
  };
}

export const actUpdateNhaCungCap = (value) => {
  return {
    type: Types.UPDATE_NHACUNGCAP,
    value,
  };
};
