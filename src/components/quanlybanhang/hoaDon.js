import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  renderConvertSoLuongTheoDonVi,
  renderTien,
} from "./../../common/convert/renderConvert";
import { Card, Divider } from "antd";
import PDFPrint from "./../../common/pdf_print";
function HoaDon({ onEdit, hoanTatThanhToan }) {
  const dataHoaDon = useSelector((state) => state.quanlybanhang.itemHoaDon);
  let totalTien = 0;
  dataHoaDon &&
    Array.isArray(dataHoaDon.sanPham) &&
    dataHoaDon.sanPham.length > 0 &&
    dataHoaDon.sanPham.map((item, index) => {
      totalTien += item.giaTien * item.soLuongMua;
    });
  return (
    <>
      <Card hoverable style={{ width: "55%", margin: "70px  20%" }}>
        <PDFPrint>
          <div class="container mt-5 m-0 p-0">
            <div class="d-flex justify-content-center row ">
              <div class="col-md-12">
                <div class="p-3 bg-white rounded">
                  <div class="row">
                    <div class="col-md-6">
                      <h1 class="text-uppercase text-danger">Ngọc Châu</h1>
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
                              {dataHoaDon &&
                                dataHoaDon?.thongTinNguoiBan?.tenNguoiDung}
                            </span>
                          </div>
                        </li>
                        <li>
                          <div class="billed">
                            <span class=" d-flex justify-content-start">
                              Thời gian:{" "}
                              {dataHoaDon && dataHoaDon?.ngayTaoBanGhi}
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
                              {dataHoaDon &&
                                dataHoaDon.thongTinNguoiMua &&
                                dataHoaDon.thongTinNguoiMua.tenKhachHang}
                            </span>
                          </div>
                        </li>
                        <li>
                          <div class="billed">
                            <span class=" d-flex justify-content-start">
                              số điện thoại :{" "}
                              {dataHoaDon &&
                                dataHoaDon.thongTinNguoiMua &&
                                dataHoaDon.thongTinNguoiMua.soDienThoai}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div class="col-md-6 text-right mt-5">
                      <h6 class="text-primary mb-0">Thông tin </h6>
                      <span className="custom-font-bienlai">Email:</span>
                      <span> chaungoc@gmail.com</span>
                      <br></br>
                      <span className="custom-font-bienlai">Đ/C:</span>
                      <span> h18/16 K96 Điện Biên Phủ</span>
                      <br></br>
                      <span className="custom-font-bienlai">SĐT:</span>
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
                          {dataHoaDon &&
                            Array.isArray(dataHoaDon.sanPham) &&
                            dataHoaDon.sanPham.length > 0 &&
                            dataHoaDon.sanPham.map((item, index) => {
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
                                    {renderTien(item.giaTien * item.soLuongMua)}
                                  </td>
                                </tr>
                              );
                            })}
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Thành tiền</td>
                            <td>{renderTien(totalTien)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {
                    dataHoaDon && Array.isArray(dataHoaDon.sanPham) && (
                      // dataHoaDon.sanPham.length > 0 && (
                      <div class="text-right mb-3">
                        <a
                          className="mr-3"
                          onClick={() => {
                            onEdit(dataHoaDon && dataHoaDon.id);
                          }}
                        >
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </a>
                        <a
                          className="mr-3 text-success"
                          onClick={() => {
                            hoanTatThanhToan(dataHoaDon.id);
                          }}
                        >
                          <i
                            class="fa fa-check-circle-o"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    )
                    // )
                  }
                </div>
              </div>
            </div>
            <Divider orientation="center">
              {" "}
              <p className="custom-text" style={{ fontSize: "small" }}>
                Cảm ơn quý khách và hẹn gặp lại !
              </p>
            </Divider>
          </div>
        </PDFPrint>
      </Card>
    </>
  );
}

export default HoaDon;
