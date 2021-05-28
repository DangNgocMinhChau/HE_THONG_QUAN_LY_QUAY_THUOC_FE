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
    return <p>Công nợ</p>;
  } else if ("TienMat") {
    return <p>Tiền mặt</p>;
  }
};
export const renderConvertSoLuongTheoDonVi = (value, donViTinh) => {
  if ("Hop") {
    return <p>{value}/Hộp</p>;
  } else if ("Vien") {
    return <p>{value}/Viên</p>;
  } else if ("Tuyp") {
    return <p>{value}/Tuýp</p>;
  }
};
export const renderDateTheoHeThong = () => {
  return moment().format("DD/MM/yyyy HH:mm:ss ");
};
