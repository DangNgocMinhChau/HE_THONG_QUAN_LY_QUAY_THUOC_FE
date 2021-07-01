import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import {
  openMessageLoading,
  thongBao,
} from "../../common/renderThongBao/renderThongBaoCommon";
import * as message from "../../constants/Message";
import { renderDateTheoHeThong } from "../../common/convert/renderConvert";

export function actFetchHoaDonGTGTRequest() {
  return (dispatch) => {
    return callApi("hoadongtgt", "GET", null).then((res) => {
      if (res) {
        // const data = res.data.filter((item) => item.flag !== false);
        dispatch(actFetchHoaDonGTGT(res.data.result));
      }
    });
  };
}

export function actFetchHoaDonGTGTTheoDateRequest(queryStringParam) {
  return (dispatch) => {
    return callApi(queryStringParam, "GET", null).then((res) => {
      if (res) {
        dispatch(actFetchHoaDonGTGT(res.data.result));
      }
    });
  };
}

export function actFetchHoaDonGTGTDaXoaRequest() {
  return (dispatch) => {
    return callApi("hoadongtgt/getAllHoaDonGTGTDaXoa", "GET", null).then(
      (res) => {
        if (res) {
          dispatch(actFetchHoaDonGTGT(res.data.result));
        }
      }
    );
  };
}

export const actFetchHoaDonGTGT = (data) => {
  return {
    type: Types.FETCH_HOADON_GTGT,
    data,
  };
};

export function actDeleteHoaDonGTGTRequest(id) {
  return (dispatch) => {
    return callApi(`hoadongtgt/${id}`, "DELETE", null).then((res) => {
      if (res) {
        dispatch(actDeleteHoaDonGTGT(id));
      }
    });
  };
}

export const actDeleteHoaDonGTGT = (id) => {
  openMessageLoading(message.XOA_THANH_CONG);
  return {
    type: Types.DELETE_HOADON_GTGT,
    id,
  };
};

export const actRecoveryHoaDonGTGT = (id) => {
  openMessageLoading(message.XOA_THANH_CONG);
  return {
    type: Types.DELETE_HOADON_GTGT,
    id,
  };
};

export function actDeleteHanghoaTrongHoaDonGTGTRequest(id) {
  return (dispatch) => {
    return callApi(`hanghoahoadongtgt/${id}`, "DELETE", null).then((res) => {
      if (res) {
        // dispatch(actDeleteHoaDonGTGT(id));
      }
    });
  };
}

export function actRecoveryHanghoaTrongHoaDonGTGTRequest(id) {
  return (dispatch) => {
    return callApi(
      `hoadongtgt/phuchoihoadongtgtdaxoa/${id}`,
      "DELETE",
      null
    ).then((res) => {
      if (res) {
        dispatch(actRecoveryHoaDonGTGT(id));
        openMessageLoading(res.data.result);
      }
    });
  };
}

export function actCreateHoaDonGTGTRequest(dataHoaDonGTGT) {
  dataHoaDonGTGT = {
    ...dataHoaDonGTGT,
    ngayTaoBanGhi: renderDateTheoHeThong(),
  };
  return (dispatch) => {
    return callApi(`hoadongtgt`, "POST", dataHoaDonGTGT).then((res) => {
      if (res) {
        thongBao(message.THEM_THANH_CONG);
        dispatch(actCreateHoaDonGTGT(res.data.result));
      }
    });
  };
}

export const actCreateHoaDonGTGT = (value) => {
  return {
    type: Types.CREATE_HOADON_GTGT,
    value,
  };
};

export function actGetHoaDonGTGTByIdRequest(id) {
  return (dispatch) => {
    return callApi(`hoadongtgt/${id}`, "GET", null).then((res) => {
      if (res) {
        dispatch(actGetHoaDonGTGTById(res.data.result));
      }
    });
  };
}

export const actGetHoaDonGTGTById = (value) => {
  return {
    type: Types.EDIT_HOADON_GTGT,
    value,
  };
};

export function actUpdateHoaDonGTGTRequest(value) {
  return (dispatch) => {
    return callApi(`hoadongtgt/${value.id}`, "PUT", value).then((res) => {
      if (res) {
        thongBao(message.SUA_THANH_CONG);
        dispatch(actUpdateHoaDonGTGT(res.data.result));
      }
    });
  };
}

export function actUpdateSetFlagRequest(value) {
  return (dispatch) => {
    return callApi(`hoadongtgt/${value.id}`, "PUT", value).then((res) => {
      if (res) {
        dispatch(actUpdateHoaDonGTGT(res.data));
      }
    });
  };
}

export const actUpdateHoaDonGTGT = (value) => {
  return {
    type: Types.UPDATE_HOADON_GTGT,
    value,
  };
};
