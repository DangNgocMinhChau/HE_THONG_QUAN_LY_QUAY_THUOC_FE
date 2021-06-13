import React, { useState } from "react";
import { useSelector } from "react-redux";
import { renderTien } from "./../../common/convert/renderConvert";
import { Card, Divider } from "antd";
import PDFPrint from "./../../common/pdf_print";
import TableHoaDon from "./tableHoaDon";
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
      <PDFPrint>
        <Card hoverable>
          <div class="container">
            <div class="d-flex justify-content-center row ">
              <div class="col-md-12">
                <div class=" bg-white rounded">
                  <div class="row">
                    <div class="col-md-6">
                      <h5 class="text-uppercase text-danger">Ngọc Châu</h5>
                      <div class="billed">
                        <span class="font-weight-bold d-flex justify-content-start">
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
                              Tên :{" "}
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
                    <TableHoaDon
                      dataHoaDon={dataHoaDon && dataHoaDon.sanPham}
                    />
                    <span>Tổng tiền : {renderTien(totalTien)}</span>
                  </div>

                  {
                    dataHoaDon && Array.isArray(dataHoaDon.sanPham) && (
                      // dataHoaDon.sanPham.length > 0 && (
                      <div class="text-right mb-3">
                        {/* <a
                          className="mr-3"
                          onClick={() => {
                            onEdit(dataHoaDon && dataHoaDon.id);
                          }}
                        >
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </a> */}
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
        </Card>
      </PDFPrint>
    </>
  );
}

export default HoaDon;
