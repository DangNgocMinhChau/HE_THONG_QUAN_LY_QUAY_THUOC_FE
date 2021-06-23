import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { message } from "antd";
import * as Message from "../../constants/Message";

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

export function actFetchBanHangRequest() {
  return (dispatch) => {
    return callApi("quanlybanhang", "GET", null).then((res) => {
      if (res) {
        // const data = res.data.filter((item) => item.flag !== false);
        dispatch(actFetchBanHang(res.data.result));
        dispatch(
          actHoaDonBanHang(
            Array.isArray(res.data.result) &&
              res.data.result.length > 0 &&
              res.data.result[0]
          )
        );
      }
    });
  };
}

export const actFetchBanHang = (data) => {
  return {
    type: Types.FETCH_BANHANG,
    data,
  };
};

export function actDeleteBanHangRequest(id) {
  return (dispatch) => {
    return callApi(`quanlybanhang/${id}`, "DELETE", null).then((res) => {
      if (res) {
        dispatch(actDeleteBanHang(id));
        dispatch(actHoaDonBanHang(null));
      }
    });
  };
}

export function actDeleteSanPhamRequest(id) {
  return (dispatch) => {
    return callApi(`sanpham/${id}`, "DELETE", null).then((res) => {
      if (res) {
        // dispatch(actDeleteBanHang(id));
        // dispatch(actHoaDonBanHang(null));
      }
    });
  };
}

export const actDeleteBanHang = (id) => {
  return {
    type: Types.DELETE_BANHANG,
    id,
  };
};

export function actCreateBanHangRequest(value) {
  return (dispatch) => {
    return callApi(`quanlybanhang`, "POST", value).then((res) => {
      if (res) {
        dispatch(actCreateBanHang(res.data.result));
        dispatch(actHoaDonBanHang(res.data.result));
      }
    });
  };
}

export const actCreateBanHang = (value) => {
  return {
    type: Types.CREATE_BANHANG,
    value,
  };
};

export const actHoaDonBanHang = (value) => {
  return {
    type: Types.ITEM_HOADON_BANHANG,
    value,
  };
};

export function actGetBanHangByIdRequest(id) {
  if (id) {
    return (dispatch) => {
      return callApi(`quanlybanhang/${id}`, "GET", null).then((res) => {
        if (res) {
          dispatch(actGetBanHangById(res.data.result));
          dispatch(actHoaDonBanHang(res.data.result));
        }
      });
    };
  }
}

export function actGetHoaDonSauKhiBanByIdRequest(id, hoaDonDaHoanTat) {
  return (dispatch) => {
    return callApi(`quanlybanhang/${id}`, "GET", null).then((res) => {
      if (res) {
        dispatch(actGetBanHangById(res.data.result));
        hoaDonDaHoanTat(res.data.result);
      }
    });
  };
}

export const actGetBanHangById = (value) => {
  return {
    type: Types.EDIT_BANHANG,
    value,
  };
};

export function actUpdateBanHangRequest(value) {
  return (dispatch) => {
    return callApi(`quanlybanhang/${value.id}`, "PUT", value).then((res) => {
      if (res) {
        message.success(Message.SUA_THANH_CONG);
        dispatch(actUpdateBanHang(res.data.result));
        dispatch(actHoaDonBanHang(res.data.result));
      }
    });
  };
}

export function actUpdateSetFlagRequest(value) {
  return (dispatch) => {
    return callApi(`quanlybanhang/${value.id}`, "PUT", value).then((res) => {
      if (res) {
        dispatch(actUpdateBanHang(res.data.result));
      }
    });
  };
}

export const actUpdateBanHang = (value) => {
  return {
    type: Types.UPDATE_BANHANG,
    value,
  };
};
