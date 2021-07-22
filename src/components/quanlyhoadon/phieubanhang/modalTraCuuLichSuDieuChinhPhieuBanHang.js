import React, { useEffect, useState } from "react";
import { Drawer, Timeline } from "antd";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
export default function ModalTraCuuLichSuDieuChinhPhieuBanHang({
  isVisibleLichSuPhieuBanHang,
  onCancel,
  onSave,
  checkEdit,
  setCheckSubmitForm,
}) {
  const dataListLichSuDieuChinhPhieuBanHang = useSelector(
    (state) => state.quanly_hoadon.phieubanhang.listlichsudieuchinhphieubanhang
  );

  return (
    <Drawer
      title="Tra cứu lịch sử phiếu bán hàng"
      placement="right"
      closable={false}
      onClose={onCancel}
      visible={isVisibleLichSuPhieuBanHang}
      key="right"
      width={500}
    >
      <Timeline>
        {dataListLichSuDieuChinhPhieuBanHang.map((item, index) => {
          return (
            <Timeline.Item key={index}>
              {item.ngayTaoBanGhi}
              <div>- Tên người sửa : {item.thongTinNguoiBan.tenNguoiDung}</div>
              <div>- SĐT : {item.thongTinNguoiBan.soDienThoai}</div>
              <div>- Lý do chỉnh sửa : {item.noiDungChinhSua}</div>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </Drawer>
  );
}
