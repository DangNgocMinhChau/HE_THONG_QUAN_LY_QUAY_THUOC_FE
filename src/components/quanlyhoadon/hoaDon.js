import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  renderConvertSoLuongTheoDonVi,
  renderTien,
} from "../../common/convert/renderConvert";
import PDFPrint from "../../common/pdf_print";
import { Tabs, Divider, Alert } from "antd";
const { TabPane } = Tabs;
function HoaDon({ onEdit, valueDate }) {
  const dataListTatCaHoaDon = useSelector(
    (state) => state.quanly_hoadon_ban_thanhcong.list
  );

  const account_current = useSelector(
    (state) => state.quanlylogin.account_current
  );
  var totalNgay = 0;
  const renderTotalTienNgay = (value) => {
    totalNgay += value;
  };

  dataListTatCaHoaDon &&
    Array.isArray(
      dataListTatCaHoaDon.filter(
        (item) => item.ngayTaoBanGhi.split(" ")[0] === valueDate
      )
    ) &&
    dataListTatCaHoaDon.filter(
      (item) => item.ngayTaoBanGhi.split(" ")[0] === valueDate
    ).length > 0 &&
    dataListTatCaHoaDon
      .filter((item) => item.ngayTaoBanGhi.split(" ")[0] === valueDate)
      .map((itemHoaDon, indexHoaDon) => {
        renderTotalTienNgay(itemHoaDon.totalTien);
      });

  return (
    <>
      <Tabs tabPosition="left" style={{ textAlign: "center" }}>
        {dataListTatCaHoaDon &&
        Array.isArray(
          dataListTatCaHoaDon.filter(
            (item) => item.ngayTaoBanGhi.split(" ")[0] === valueDate
          )
        ) &&
        dataListTatCaHoaDon.filter(
          (item) => item.ngayTaoBanGhi.split(" ")[0] === valueDate
        ).length > 0 ? (
          dataListTatCaHoaDon
            .filter((item) => item.ngayTaoBanGhi.split(" ")[0] === valueDate)
            .map((itemHoaDon, indexHoaDon) => {
              return (
                <TabPane tab={itemHoaDon.ngayTaoBanGhi} key={indexHoaDon + 1}>
                  <PDFPrint stylePrint={true}>
                    <div class="container mt-5 custom-border ">
                      <div class="d-flex justify-content-center row">
                        <div class="col-md-12">
                          <div class="p-3 bg-white rounded">
                            <div class="row">
                              <div class="col-md-6">
                                <h1 class="text-uppercase text-danger">
                                  Ngọc Châu
                                </h1>
                                <div class="billed">
                                  <span class="font-weight-bold  d-flex justify-content-start">
                                    Thông tin người bán :{" "}
                                  </span>
                                </div>
                                <ul>
                                  <li>
                                    {" "}
                                    <div class="billed">
                                      <span class="  d-flex justify-content-start">
                                        Người viết :{" "}
                                        {itemHoaDon &&
                                          itemHoaDon?.thongTinNguoiBan
                                            ?.tenNguoiDung}
                                      </span>
                                    </div>
                                  </li>
                                  <li>
                                    <div class="billed">
                                      <span class=" d-flex justify-content-start">
                                        Thời gian:{" "}
                                        {itemHoaDon &&
                                          itemHoaDon?.ngayTaoBanGhi}
                                      </span>
                                    </div>
                                  </li>
                                </ul>
                                <div class="billed">
                                  <span class="font-weight-bold  d-flex justify-content-start">
                                    Thông tin khách hàng :{" "}
                                  </span>
                                </div>
                                <ul>
                                  <li>
                                    <div class="billed">
                                      <span class=" d-flex justify-content-start">
                                        Tên khách hàng :{" "}
                                        {itemHoaDon &&
                                          itemHoaDon.thongTinNguoiMua &&
                                          itemHoaDon.thongTinNguoiMua
                                            .tenKhachHang}
                                      </span>
                                    </div>
                                  </li>
                                  <li>
                                    <div class="billed">
                                      <span class=" d-flex justify-content-start">
                                        số điện thoại :{" "}
                                        {itemHoaDon &&
                                          itemHoaDon.thongTinNguoiMua &&
                                          itemHoaDon.thongTinNguoiMua
                                            .soDienThoai}
                                      </span>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div class="col-md-6 text-right mt-5">
                                <h6 class="text-primary mb-0">Thông tin </h6>
                                <span className="custom-font-bienlai">
                                  Email:
                                </span>
                                <span> chaungoc@gmail.com</span>
                                <br></br>
                                <span className="custom-font-bienlai">
                                  Đ/C:
                                </span>
                                <span> h18/16 K96 Điện Biên Phủ</span>
                                <br></br>
                                <span className="custom-font-bienlai">
                                  SĐT:
                                </span>
                                <span> 0905315214</span>
                              </div>
                            </div>
                            <div class="mt-5">
                              <div class="table-responsive">
                                <table class="table">
                                  <thead>
                                    <tr>
                                      <th>STT</th>
                                      <th>Sản phẩm</th>
                                      <th>Số lượng</th>
                                      <th>Đơn giá</th>
                                      <th>Tổng cộng</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {itemHoaDon &&
                                      Array.isArray(itemHoaDon.sanPham) &&
                                      itemHoaDon.sanPham.length > 0 &&
                                      itemHoaDon.sanPham.map((item, index) => {
                                        return (
                                          <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.tenThuoc}</td>
                                            <td>
                                              {renderConvertSoLuongTheoDonVi(
                                                item.soLuongMua,
                                                item.donViTinh
                                              )}
                                            </td>
                                            <td>{renderTien(item.giaTien)}</td>
                                            <td>
                                              {renderTien(
                                                item.giaTien * item.soLuongMua
                                              )}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    <tr>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td>Thành tiền</td>
                                      <td>
                                        {renderTien(itemHoaDon.totalTien)}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            {account_current.quyen === "QuanTri" && (
                              <div class="text-right mb-3">
                                <a
                                  onClick={() => {
                                    onEdit(itemHoaDon && itemHoaDon.id);
                                  }}
                                >
                                  <i
                                    class="fa fa-pencil-square-o"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </div>
                            )}
                            <Divider orientation="center">
                              {" "}
                              <p
                                className="custom-text"
                                style={{ fontSize: "small" }}
                              >
                                Cảm ơn quý khách và hẹn gặp lại !
                              </p>
                            </Divider>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PDFPrint>
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

export default HoaDon;
