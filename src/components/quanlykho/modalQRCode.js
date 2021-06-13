import React from "react";
import { Modal, Button } from "antd";
import QrCode from "../QrCode";
import {
  renderTien,
  renderConvertSoLuongTheoDonViReturnString,
} from "./../../common/convert/renderConvert";
export default function ModalQRCode({
  visible,
  handleCancel,
  valueRecordTable,
}) {
  let valueQrCode = "";
  if (valueRecordTable) {
    valueQrCode = `
    - Tên thuốc : ${valueRecordTable.ten}
    - Loại thuốc : ${valueRecordTable.phanLoaiThuoc}
    - Khu vực để thuốc : ${valueRecordTable.khuVuc}
    - Giá bán : ${renderTien(valueRecordTable.giaTien).props.children}
    - Hạn sử dụng : ${valueRecordTable.hanSuDungThuoc}
    - Số lượng nhập : ${renderConvertSoLuongTheoDonViReturnString(
      valueRecordTable.soLuongNhap,
      valueRecordTable.donViTinh
    )}
    - Số lượng còn trong kho : ${renderConvertSoLuongTheoDonViReturnString(
      valueRecordTable.soLuongNhap - valueRecordTable.soLuongDaBan,
      valueRecordTable.donViTinh
    )}
    `;
  }

  return (
    <Modal
      title={`QR Code ${valueRecordTable && valueRecordTable.ten}`}
      visible={visible}
      onCancel={handleCancel}
      footer={[<Button onClick={handleCancel}>Đóng</Button>]}
    >
      <QrCode
        value={valueQrCode}
        tenDowload={valueRecordTable && valueRecordTable.ten}
      />
    </Modal>
  );
}
