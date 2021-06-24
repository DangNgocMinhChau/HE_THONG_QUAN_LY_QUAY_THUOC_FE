import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { message } from "antd";
import * as Message from "../../constants/Message";

export function actFetchHoaDonDaHoanTatRequest() {
  return (dispatch) => {
    return callApi("quanlybanhangthanhcong", "GET", null).then((res) => {
      if (res) {
        dispatch(actFetchHoaDonDaHoanTat(res.data.result));
      }
    });
  };
}

export function actFetchHoaDonDaHoanTatTheoDateRequest(queryStringParam) {
  return (dispatch) => {
    return callApi(queryStringParam, "GET").then((res) => {
      if (res) {
        console.log(res);
        dispatch(actFetchHoaDonDaHoanTat(res.data.result));
      }
    });
  };
}

export const actFetchHoaDonDaHoanTat = (data) => {
  return {
    type: Types.FETCH_HOADONDAHOANTAT,
    data,
  };
};

export function actFetchLichSuHoaDonRequest(queryStringParam) {
  return (dispatch) => {
    return callApi(queryStringParam, "GET").then((res) => {
      if (res) {
        dispatch(actFetchLichSuHoaDon(res.data.result));
      }
    });
  };
}

export const actFetchLichSuHoaDon = (data) => {
  return {
    type: Types.FETCH_LICHSUHOADON,
    data,
  };
};

export function actDeleteHoaDonDaHoanTatRequest(id) {
  return (dispatch) => {
    return callApi(`quanlybanhangthanhcong/${id}`, "DELETE", null).then(
      (res) => {
        if (res) {
          dispatch(actDeleteHoaDonDaHoanTat(id));
        }
      }
    );
  };
}

export function actDeleteSanPhamThanhCongRequest(id) {
  return (dispatch) => {
    return callApi(`sanphamthanhcong/${id}`, "DELETE", null).then((res) => {
      if (res) {
        // dispatch(actDeleteBanHang(id));
        // dispatch(actHoaDonBanHang(null));
      }
    });
  };
}

export const actDeleteHoaDonDaHoanTat = (id) => {
  return {
    type: Types.DELETE_HOADONDAHOANTAT,
    id,
  };
};

export function actCreateHoaDonDaHoanTatRequest(value) {
  return (dispatch) => {
    return callApi(`quanlybanhangthanhcong`, "POST", value).then((res) => {
      if (res) {
        dispatch(actCreateHoaDonDaHoanTat(res.data.result));
      }
    });
  };
}

export const actCreateHoaDonDaHoanTat = (value) => {
  return {
    type: Types.CREATE_HOADONDAHOANTAT,
    value,
  };
};

export function actGetHoaDonDaHoanTatByIdRequest(id) {
  return (dispatch) => {
    return callApi(`quanlybanhangthanhcong/${id}`, "GET", null).then((res) => {
      if (res) {
        dispatch(actGetHoaDonDaHoanTatById(res.data.result));
      }
    });
  };
}

export function actGetHoaDonSauKhiBanByIdRequest(id, callback) {
  return (dispatch) => {
    return callApi(`quanlybanhangthanhcong/${id}`, "GET", null).then((res) => {
      if (res) {
        dispatch(actGetHoaDonDaHoanTatById(res.data));
        callback(res.data);
      }
    });
  };
}

export const actGetHoaDonDaHoanTatById = (value) => {
  return {
    type: Types.EDIT_HOADONDAHOANTAT,
    value,
  };
};

export function actUpdateHoaDonDaHoanTatRequest(value) {
  return (dispatch) => {
    return callApi(`quanlybanhangthanhcong/${value.id}`, "PUT", value).then(
      (res) => {
        if (res) {
          message.success(Message.SUA_THANH_CONG);
          dispatch(actUpdateHoaDonDaHoanTat(res.data.result));
        }
      }
    );
  };
}

export function actUpdateSetFlagRequest(value) {
  return (dispatch) => {
    return callApi(`quanlybanhangthanhcong/${value.id}`, "PUT", value).then(
      (res) => {
        if (res) {
          dispatch(actUpdateHoaDonDaHoanTat(res.data));
        }
      }
    );
  };
}

export const actUpdateHoaDonDaHoanTat = (value) => {
  return {
    type: Types.UPDATE_HOADONDAHOANTAT,
    value,
  };
};

export function actGetHoaDonTheoKhachHangRequest(id) {
  return (dispatch) => {
    return callApi(
      `quanlybanhangthanhcong/getAllHoaDonByKhachHang/${id}`,
      "GET",
      null
    ).then((res) => {
      if (res) {
        let arr = [];
        res.data.result &&
          Array.isArray(res.data.result) &&
          res.data.result.map((item, index) => {
            arr.push(item.result);
          });
        dispatch(actGetHoaDonTheoKhachHang(arr));
      }
    });
  };
}

export const actGetHoaDonTheoKhachHang = (value) => {
  return {
    type: Types.HOADONDAHOANTAT_THEO_KHACHHANG,
    value,
  };
};
