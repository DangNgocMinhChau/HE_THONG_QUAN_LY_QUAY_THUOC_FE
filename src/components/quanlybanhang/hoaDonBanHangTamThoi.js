import React from "react";
import PDFPrint from "./../../common/pdf_print";
import TableHoaDon from "./tableHoaDon";
import { Card, Divider } from "antd";
import { useSelector } from "react-redux";
import {
  renderConvertSoLuongTheoDonVi,
  renderTien,
} from "./../../common/convert/renderConvert";
export default function HoaDonBanHangTamThoi({ onEdit }) {
  const dataHoaDon = useSelector((state) => state.quanlybanhang.itemHoaDon);
  let totalTien = 0;
  dataHoaDon &&
    Array.isArray(dataHoaDon.sanPham) &&
    dataHoaDon.sanPham.length > 0 &&
    dataHoaDon.sanPham.map((item, index) => {
      totalTien += item.giaTien * item.soLuongMua;
    });

  const renderDataTable = (data) => {
    return (
      data &&
      data.map((item, index) => {
        return (
          <>
            <tr className="content">
              <td>{index + 1}</td>
              <td>{item.tenThuoc}</td>
              <td>
                {renderConvertSoLuongTheoDonVi(item.soLuongMua, item.donViTinh)}
              </td>
              <td>{renderTien(item.giaTien)}</td>
              <td className="text-center">
                {renderTien(item.soLuongMua * item.giaTien)}
              </td>
            </tr>
          </>
        );
      })
    );
  };

  return (
    <PDFPrint>
      <div className="container mt-5 mb-3">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <div className="card">
              <div className="d-flex flex-row p-2">
                {" "}
                <img src="https://i.imgur.com/vzlPPh3.png" width="40" />
                <div className="d-flex flex-column">
                  {" "}
                  {/* <span className="font-weight-bold">Mã hoá đơn</span>
                  <small>1222123</small> */}
                  <small> Email: chaungoc@gmail.com</small>
                  <small> Đ/C: h18/16 K96 Điện Biên Phủ</small>
                  <small> SĐT: 0905315214</small>
                </div>
              </div>
              <hr />
              <div className="table-responsive"></div>
              <div className="products">
                <small className=" d-flex justify-content-start">
                  Tên người bán :{" "}
                  {dataHoaDon && dataHoaDon?.thongTinNguoiBan?.tenNguoiDung}
                </small>
                <small className=" d-flex justify-content-start">
                  Thời gian: {dataHoaDon && dataHoaDon?.ngayTaoBanGhi}
                </small>
                <br></br>
                <small className=" d-flex justify-content-start">
                  Tên khách hàng :{" "}
                  {dataHoaDon &&
                    dataHoaDon.thongTinNguoiMua &&
                    dataHoaDon.thongTinNguoiMua.tenKhachHang}
                </small>
                <small className=" d-flex justify-content-start">
                  SĐT :{" "}
                  {dataHoaDon &&
                    dataHoaDon.thongTinNguoiMua &&
                    dataHoaDon.thongTinNguoiMua.soDienThoai}
                </small>
                <hr />
                <table className="table table-borderless">
                  <tbody>
                    <tr className="add">
                      <td>STT</td>
                      <td>Sản phẩm</td>
                      <td>Số lượng</td>
                      <td>Đơn giá</td>
                      <td className="text-center">Thành tiền</td>
                    </tr>
                    {renderDataTable(dataHoaDon && dataHoaDon.sanPham)}
                  </tbody>
                </table>
              </div>
              <hr />
              <div className="products p-0">
                <table className="table table-borderless">
                  <tbody>
                    <tr className="content">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="text-center">
                        Tổng tiền : {renderTien(totalTien)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Divider orientation="center">
                  {" "}
                  <p className="custom-text" style={{ fontSize: "small" }}>
                    Cảm ơn quý khách và hẹn gặp lại !
                  </p>
                </Divider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PDFPrint>
  );
}
