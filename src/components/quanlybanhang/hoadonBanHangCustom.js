import React from "react";
import PDFPrint from "./../../common/pdf_print";
import {
  renderConvertSoLuongTheoDonVi,
  renderTien,
} from "./../../common/convert/renderConvert";
function HoadonBanHangCustom({ onEdit, dataHoaDon }) {
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
            <tr className="content tr-custom-table-hoadon">
              <td className="tr-custom-table-hoadon">{index + 1}</td>
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
    <>
      <PDFPrint>
        <div class="ticket">
          <img
            src="./../thiet-ke-logo-nha-thuoc-gia-re-tai-lac-hong.jpg"
            alt="Logo"
          />
          <p class="centered">
            Ngọc Châu
            <br></br>
            <small> Email: chaungoc@gmail.com</small>
            <br></br>
            <small> Đ/C: h18/16 K96 Điện Biên Phủ</small>
            <br></br>
            <small> SĐT: 0905315214</small>
            <hr />
            <small className=" d-flex justify-content-start">
              Tên người bán :{" "}
              {dataHoaDon && dataHoaDon?.thongTinNguoiBan?.tenNguoiDung}
            </small>
            <small className=" d-flex justify-content-start">
              Thời gian: {dataHoaDon && dataHoaDon?.ngayTaoBanGhi}
            </small>
            ---------------------------------------------
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
          </p>
          <hr />

          <table className="tr-custom-table-hoadon">
            <thead>
              <tr className="tr-custom-table-hoadon">
                <td width="40px">STT</td>
                <td width="60px">Sản phẩm</td>
                <td width="60px">Số lượng</td>
                <td width="100px">Đơn giá</td>
                <td width="100px" className="text-center">
                  Thành tiền
                </td>
              </tr>
            </thead>
            <tbody>{renderDataTable(dataHoaDon && dataHoaDon.sanPham)}</tbody>
            <tbody>
              <tr className="tr-custom-table-hoadon">
                <td></td>
                <td></td>
                <td></td>
                <td>Tổng tiền : </td>
                <td>{renderTien(totalTien)}</td>
              </tr>
            </tbody>
          </table>
          <hr />
          <p class="centered">
            Cảm ơn quý khách và hẹn gặp lại !
            <br />
            ngocchau.com
          </p>
        </div>
      </PDFPrint>
    </>
  );
}

export default HoadonBanHangCustom;
