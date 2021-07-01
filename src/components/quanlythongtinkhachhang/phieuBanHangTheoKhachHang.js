import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Tabs } from "antd";
import PhieuBanHang from "../quanlybanhang/phieuBanHang";
const { TabPane } = Tabs;
export default function PhieuBanHangTheoKhachHang(props) {
  const { dataListHoadonTheoKhachHang } = useSelector(
    (state) => ({
      dataListHoadonTheoKhachHang:
        state.quanly_hoadon.phieubanhang.phieubanhangtheokhachhang,
    }),
    shallowEqual
  );

  return (
    <div>
      <Tabs tabPosition="left" style={{ height: 800 }}>
        {dataListHoadonTheoKhachHang.map((item, index) => {
          return (
            <TabPane tab={item.ngayTaoBanGhi} key={index}>
              <div style={{ marginLeft: "30%" }}>
                <PhieuBanHang dataHoaDon={item} />
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
}
