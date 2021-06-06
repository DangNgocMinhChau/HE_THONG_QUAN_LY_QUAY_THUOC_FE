import moment from "moment";

export const renderTien = (value) => {
  if (value) {
    return (
      <span>
        {` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + "vnđ"}
      </span>
    );
  }
};

export const renderDate = (value) => {
  if (value) {
    return <>{moment(value).format("DD/MM/YYYY")}</>;
  }
};

export const renderDateTime = (value) => {
  if (value) {
    return <>{moment(value).format("DD/MM/YYYY HH:mm:ss")}</>;
  }
};

export const renderConverLoaiThanhToan = (value) => {
  if ("CongNo") {
    return <span>Công nợ</span>;
  } else if ("TienMat") {
    return <span>Tiền mặt</span>;
  }
};
export const renderConvertSoLuongTheoDonVi = (value, donViTinh) => {
  if ("Hop") {
    return <span>{value}/Hộp</span>;
  } else if ("Vien") {
    return <span>{value}/Viên</span>;
  } else if ("Tuyp") {
    return <span>{value}/Tuýp</span>;
  }
};
export const renderDateTheoHeThong = () => {
  return moment().format("DD/MM/yyyy HH:mm:ss ");
};
