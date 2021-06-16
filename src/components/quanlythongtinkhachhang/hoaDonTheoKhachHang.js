import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Tabs } from "antd";
import HoaDonBanHangCustom from "./../quanlybanhang/hoadonBanHangCustom";
const { TabPane } = Tabs;
export default function HoaDonTheoKhachHang(props) {
  const { dataListHoadonTheoKhachHang } = useSelector(
    (state) => ({
      dataListHoadonTheoKhachHang:
        state.quanly_hoadon_ban_thanhcong.hoadonthanhcongtheokhachhang,
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
                <HoaDonBanHangCustom dataHoaDon={item} />
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
}
