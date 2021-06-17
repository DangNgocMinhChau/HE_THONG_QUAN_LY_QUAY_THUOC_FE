import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import * as actNhapThuoc from "../quanlykho/actQuanLyKho";
import { openMessageLoading, thongBao } from "../../constants/message/thongBao";
import * as message from "../../constants/Message";
import { renderDateTheoHeThong } from "../../common/convert/renderConvert";

export function actFetchThongTinKhachHangRequest() {
  return (dispatch) => {
    return callApi("quanlythongtinkhachhang", "GET", null).then((res) => {
      if (res) {
        // const data = res.data.filter((item) => item.flag !== false);
        dispatch(actFetchThongTinKhachHang(res.data.result));
      }
    });
  };
}

export const actFetchThongTinKhachHang = (data) => {
  return {
    type: Types.FETCH_THONGTINKHACHHANG,
    data,
  };
};

export function actDeleteThongTinKhachHangRequest(id) {
  return (dispatch) => {
    return callApi(`quanlythongtinkhachhang/${id}`, "DELETE", null).then(
      (res) => {
        if (res) {
          dispatch(actDeleteThongTinKhachHang(id));
        }
      }
    );
  };
}

export const actDeleteThongTinKhachHang = (id) => {
  openMessageLoading(message.XOA_THANH_CONG);
  return {
    type: Types.DELETE_THONGTINKHACHHANG,
    id,
  };
};

export function actCreateThongTinKhachHangRequest(
  dataThongTinKhachHang,
  dataThuoc,
  callRequestThongTinKhachHang
) {
  dataThongTinKhachHang = {
    ...dataThongTinKhachHang,
    ngayTaoBanGhi: renderDateTheoHeThong(),
  };
  return (dispatch) => {
    return callApi(
      `quanlythongtinkhachhang`,
      "POST",
      dataThongTinKhachHang
    ).then((res) => {
      if (res) {
        callRequestThongTinKhachHang();
        thongBao(message.THEM_THANH_CONG);
        if (dataThuoc && dataThuoc.id) {
          dataThuoc = {
            ...dataThuoc,
            ngayChinhSua: renderDateTheoHeThong(),
            idThongTinKhachHang: res.data.id,
          };
          dispatch(actNhapThuoc.actUpdateThuocRequest(dataThuoc));
        } else {
          if (dataThuoc && dataThuoc !== undefined && dataThuoc !== null) {
            dataThuoc = {
              ...dataThuoc,
              ngayTaoBanGhi: renderDateTheoHeThong(),
              idThongTinKhachHang: res.data.id,
            };
            dispatch(actNhapThuoc.actCreateNhapKhoThuocRequest(dataThuoc));
          }
        }
        dispatch(actCreateThongTinKhachHang(res.data.result));
      }
    });
  };
}

export const actCreateThongTinKhachHang = (value) => {
  return {
    type: Types.CREATE_THONGTINKHACHHANG,
    value,
  };
};

export function actGetThongTinKhachHangByIdRequest(id) {
  return (dispatch) => {
    return callApi(`quanlythongtinkhachhang/${id}`, "GET", null).then((res) => {
      if (res) {
        dispatch(actGetThongTinKhachHangById(res.data.result));
      }
    });
  };
}

export const actGetThongTinKhachHangById = (value) => {
  return {
    type: Types.EDIT_THONGTINKHACHHANG,
    value,
  };
};

export function actUpdateThongTinKhachHangRequest(value) {
  return (dispatch) => {
    return callApi(`quanlythongtinkhachhang/${value.id}`, "PUT", value).then(
      (res) => {
        if (res) {
          thongBao(message.SUA_THANH_CONG);
          dispatch(actUpdateThongTinKhachHang(res.data.result));
        }
      }
    );
  };
}

export function actUpdateSetFlagRequest(value) {
  return (dispatch) => {
    return callApi(`quanlythongtinkhachhang/${value.id}`, "PUT", value).then(
      (res) => {
        if (res) {
          dispatch(actUpdateThongTinKhachHang(res.data));
        }
      }
    );
  };
}

export const actUpdateThongTinKhachHang = (value) => {
  return {
    type: Types.UPDATE_THONGTINKHACHHANG,
    value,
  };
};
