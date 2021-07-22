import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import * as message from "../../constants/Message";
import * as actQuanLyCMND from "../quanly_cmnd/actQuanLyCMND";
import moment from "moment";
import {
  openMessageLoading,
  thongBao,
} from "../../common/renderThongBao/renderThongBaoCommon";
import { renderDateTheoHeThong } from "../../common/convert/renderConvert";
// Quản lý tài khoản

export function actFetchTaiKhoanRequest() {
  return (dispatch) => {
    return callApi("quanlytaikhoan", "GET", null).then((res) => {
      if (res) {
        // const data = res.data.result.filter((item) => item.flag !== false);
        dispatch(actFetchTaiKhoan(res.data.result));
      }
    });
  };
}

export const actFetchTaiKhoan = (data) => {
  return {
    type: Types.FETCH_TAIKHOAN,
    data,
  };
};

export function actDeleteTaiKhoanRequest(id) {
  return (dispatch) => {
    return callApi(`quanlytaikhoan/${id}`, "DELETE", null).then((res) => {
      if (res) {
        dispatch(actDeleteTaiKhoan(id));
      }
    });
  };
}

export const actDeleteTaiKhoan = (id) => {
  openMessageLoading(message.XOA_THANH_CONG);
  return {
    type: Types.DELETE_TAIKHOAN,
    id,
  };
};

export function actCreateTaiKhoanRequest(value) {
  return (dispatch) => {
    return callApi(`quanlytaikhoan`, "POST", value).then((res) => {
      if (res) {
        if (res.status) {
          let dataCMND = {
            cmnd: res.data.result.cmnd,
            idUser: res.data.result.id,
            ngayTaoBanGhi: moment().format("DD/MM/yyyy HH:mm:ss "),
          };
          dispatch(actQuanLyCMND.actCreateCMNDRequest(dataCMND));
          thongBao(res.msg);
          dispatch(actCreateTaiKhoan(res.data.result));
        } else {
          thongBao(res.msg);
        }
      }
    });
  };
}

export const actCreateTaiKhoan = (value) => {
  return {
    type: Types.CREATE_TAIKHOAN,
    value,
  };
};

export function actGetTaiKhoanByIdRequest(id) {
  return (dispatch) => {
    return callApi(`quanlytaikhoan/${id}`, "GET", null).then((res) => {
      if (res) {
        dispatch(actGetTaiKhoanById(res.data.result));
      }
    });
  };
}

export const actGetTaiKhoanById = (value) => {
  return {
    type: Types.EDIT_TAIKHOAN,
    value,
  };
};

export function actUpdateTaiKhoanRequest(value) {
  return (dispatch) => {
    return callApi(`quanlytaikhoan/${value.id}`, "PUT", value).then((res) => {
      if (res) {
        thongBao(message.SUA_THANH_CONG);
        dispatch(actUpdateTaiKhoan(res.data.result));
      }
    });
  };
}

export function actChangePasssTaiKhoanRequest(value) {
  return (dispatch) => {
    return callApi(`quanlytaikhoan/${value.id}`, "PUT", value).then((res) => {
      if (res) {
        dispatch(actUpdateTaiKhoan(res.data));
      }
    });
  };
}

export function actUpdateSetFlagRequest(value) {
  return (dispatch) => {
    return callApi(`quanlytaikhoan/${value.id}`, "PUT", value).then((res) => {
      if (res) {
        dispatch(actUpdateTaiKhoan(res.data));
      }
    });
  };
}

export const actUpdateTaiKhoan = (value) => {
  return {
    type: Types.UPDATE_TAIKHOAN,
    value,
  };
};

export const actLoginUserSuccess = (value) => {
  return {
    type: Types.LOGIN_SUCCESS,
    value,
  };
};

export const actLogOut = (value) => {
  return {
    type: Types.LOGIN_SUCCESS,
    value,
  };
};

export const actLockAccount = (value) => {
  return {
    type: Types.UPDATE_TAIKHOAN,
    value,
  };
};

export function actGetTaiKhoanByIdInApplicationRequest(id) {
  return (dispatch) => {
    return callApi(`quanlytaikhoan/${id}`, "GET", null).then((res) => {
      if (res) {
        dispatch(actLoginUserSuccess(res.data.result));
      }
    });
  };
}

export function actGetTaiKhoanByIdLoginFailRequest(id) {
  return (dispatch) => {
    return callApi(`quanlytaikhoan/${id}`, "GET", null).then((res) => {
      if (res) {
        let data = {
          ...res.data.result,
          lockUser: true,
        };
        dispatch(actUpdateTaiKhoanRequest(data));
      }
    });
  };
}

export function actGetTaiKhoanByIdUnLockRequest(id) {
  return (dispatch) => {
    return callApi(`quanlytaikhoan/${id}`, "GET", null).then((res) => {
      if (res) {
        let data = {
          ...res.data.result,
          lockUser: "false",
        };
        dispatch(actUpdateUnlockTaiKhoanRequest(data));
      }
    });
  };
}

export function actUpdateUnlockTaiKhoanRequest(value) {
  return (dispatch) => {
    return callApi(`quanlytaikhoan/${value.id}`, "PUT", value).then((res) => {
      if (res) {
        thongBao(message.MO_KHOA_TAI_KHOAN_THANH_CONG);
        dispatch(actUpdateTaiKhoan(res.data.result));
      }
    });
  };
}

export const actUpdateAccountCurrent = (data) => {
  let value = data;
  value = {
    ...data,
    checkToken: true,
    matKhauGoc: null,
  };
  return {
    type: Types.LOGIN_SUCCESS,
    value,
  };
};

export function actGetTaiKhoanByIdLockRequest(id) {
  return (dispatch) => {
    return callApi(`quanlytaikhoan/${id}`, "GET", null).then((res) => {
      if (res) {
        let data = {
          ...res.data.result,
          lockUser: "true",
          ngayChinhSua: renderDateTheoHeThong(),
        };
        dispatch(actUpdatelockTaiKhoanRequest(data));
      }
    });
  };
}

export function actUpdatelockTaiKhoanRequest(value) {
  return (dispatch) => {
    return callApi(`quanlytaikhoan/${value.id}`, "PUT", value).then((res) => {
      if (res) {
        thongBao(message.KHOA_TAI_KHOAN_THANH_CONG);
        dispatch(actUpdateTaiKhoan(res.data.result));
      }
    });
  };
}

export function actCreateUserChoUnlockRequest(value) {
  return (dispatch) => {
    return callApi(`quanlyuserchounlock`, "POST", value).then((res) => {
      if (res) {
        thongBao(message.THEM_THANH_CONG);
      }
    });
  };
}

export function actCreateThongBaoRequest(value) {
  value = {
    message: `Tài khoản ${value.tenDangNhap} yêu cầu mở khóa `,
    idUser: value.id,
  };
  return (dispatch) => {
    return callApi(`quanlythongbao`, "POST", value).then((res) => {
      if (res) {
      }
    });
  };
}

export function actLoginTaiKhoan(value, setLoginThanhCong) {
  return (dispatch) => {
    return callApi(value, "GET", null).then((res) => {
      if (res) {
        dispatch(actLoginUserSuccess(res.data.result));
        setLoginThanhCong(res.data.result);
      }
    });
  };
}

export function actCheckTaiKhoanTonTaiRequest(value, checkTaiKhoanDangKy) {
  return (dispatch) => {
    return callApi(value, "GET", null).then((res) => {
      if (res) {
        if (res.data.result) {
          checkTaiKhoanDangKy();
        }
      }
    });
  };
}
