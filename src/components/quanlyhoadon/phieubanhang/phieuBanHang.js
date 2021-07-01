import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  renderConvertSoLuongTheoDonVi,
  renderTien,
} from "../../../common/convert/renderConvert";
import PDFPrint from "../../../common/pdf_print";
import * as actHoaDonHoaDonDaHoanTat from "../../../actions/quanly_hoadon_ban_thanhcong/actQuanLyHoaDonBanThanhCong";
import { Tabs, Divider, Button } from "antd";
import CalendarHoaDon from "./calendarHoaDon";
import queryString from "query-string";
import PhieuBanHangCommon from "./../../quanlybanhang/phieuBanHang";
const { TabPane } = Tabs;
export default function PhieuBanHang({
  onEdit,
  setIsVisibleLichSuPhieuBanHang,
}) {
  const dispatch = useDispatch();

  const dataListTatCaHoaDon = useSelector(
    (state) => state.quanly_hoadon.phieubanhang.list
  );

  var totalNgay = 0;
  const renderTotalTienNgay = (value) => {
    totalNgay += value;
  };
  dataListTatCaHoaDon &&
    Array.isArray(dataListTatCaHoaDon) &&
    dataListTatCaHoaDon.length > 0 &&
    dataListTatCaHoaDon.map((itemHoaDon, indexHoaDon) => {
      renderTotalTienNgay(itemHoaDon.totalTien);
    });
  const onHandleLichSuHoaDon = (value) => {
    const queryStringParam = queryString.stringifyUrl({
      url: "quanlybanhangthanhcong/getAllLichSuChinhSuaHoaDonTheoIdHoaDon",
      query: { idHoaDon: value.id },
    });
    dispatch(
      actHoaDonHoaDonDaHoanTat.actFetchLichSuHoaDonRequest(queryStringParam)
    );
    setIsVisibleLichSuPhieuBanHang(true);
  };
  return (
    <>
      <CalendarHoaDon />
      <hr />
      <Tabs tabPosition="left" style={{ textAlign: "center" }}>
        {dataListTatCaHoaDon &&
        Array.isArray(dataListTatCaHoaDon) &&
        dataListTatCaHoaDon.length > 0 ? (
          dataListTatCaHoaDon.map((itemHoaDon, indexHoaDon) => {
            return (
              <TabPane
                tab={`${indexHoaDon + 1} . ${itemHoaDon.ngayTaoBanGhi}`}
                key={indexHoaDon + 1}
              >
                <Button
                  className="mr-3"
                  onClick={() => {
                    onEdit(itemHoaDon && itemHoaDon.id);
                  }}
                >
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </Button>
                <Button
                  onClick={() => {
                    onHandleLichSuHoaDon(itemHoaDon);
                  }}
                >
                  Tra cứu lịch sử ({itemHoaDon.tongCongLichSuHoaDon})
                </Button>
                <PhieuBanHangCommon stylePrint={true} dataHoaDon={itemHoaDon} />
              </TabPane>
            );
          })
        ) : (
          <h6 style={{ textAlign: "center", color: "red" }}>
            Không tìm thấy hoá đơn !
          </h6>
        )}
      </Tabs>
      <Divider orientation="right">
        {" "}
        Tổng cộng : {renderTien(totalNgay)}
      </Divider>
    </>
  );
}
