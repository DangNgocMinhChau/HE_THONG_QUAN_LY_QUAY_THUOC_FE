import React, { useEffect, useState } from "react";
import { Drawer, Timeline } from "antd";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { ClockCircleOutlined } from "@ant-design/icons";
function ModalTraCuuLichSuHoadon({
  isVisibleLichSuHoaDon,
  onCancel,
  onSave,
  checkEdit,
  setCheckSubmitForm,
}) {
  const dataListLichSuHoaDon = useSelector(
    (state) => state.quanly_hoadon_ban_thanhcong.listlichsuhoadon
  );

  return (
    <>
      <Drawer
        title="Tra cứu lịch sử hóa đơn"
        placement="right"
        closable={false}
        onClose={onCancel}
        visible={isVisibleLichSuHoaDon}
        key="right"
        width={500}
      >
        <Timeline>
          {dataListLichSuHoaDon.map((item, index) => {
            return (
              <Timeline.Item>
                {item.ngayTaoBanGhi} : {item.noiDungChinhSua}
              </Timeline.Item>
            );
          })}
        </Timeline>
      </Drawer>
    </>
  );
}

export default ModalTraCuuLichSuHoadon;
