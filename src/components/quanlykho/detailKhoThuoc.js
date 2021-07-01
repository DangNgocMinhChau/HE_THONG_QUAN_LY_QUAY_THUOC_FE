import React, { useEffect, useState } from "react";
import { Descriptions, Divider, Image } from "antd";
import {
  renderTien,
  renderConverLoaiThanhToan,
  renderDate,
  renderConvertSoLuongTheoDonVi,
} from "./../../common/convert/renderConvert";
import { Tooltip } from "antd";
import moment from "moment";
function DetailKhoThuoc({
  match,
  history,
  itemKhoThuoc,
  handleBack,
  checkShowButtonBack,
}) {
  const renderDateHanSudung = (item) => {
    var timeNow = moment();
    var hsd = moment(item.hanSuDungThuoc);
    let khoangCachGiua2Ngay = hsd.diff(timeNow, "days");

    return (
      <span style={{ color: khoangCachGiua2Ngay < 30 ? "red" : "black" }}>
        {renderDate(item.hanSuDungThuoc)}
      </span>
    );
  };
  const renderFile = (value) => {
    if (value && Array.isArray(value)) {
      return value.map((item, index) => {
        if (item.type == "image/jpeg") {
          return (
            <>
              <div className="row">
                <div className="col-md-3">
                  <Image width={60} src={`/filedinhkem/${item.name}`} />
                </div>
                <div className="col-md-6">
                  <a href={item.url}>
                    {" "}
                    <i
                      className="fa fa-paperclip"
                      style={{ color: "black" }}
                      aria-hidden="true"
                    ></i>{" "}
                    {item.name}
                  </a>
                </div>
              </div>
              <br></br>
            </>
          );
        } else {
          return (
            <>
              <div className="row">
                <div className="col-md-3">
                  <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                </div>
                <div className="col-md-6">
                  <a href={item.url}>
                    {" "}
                    <i
                      className="fa fa-paperclip"
                      style={{ color: "black" }}
                      aria-hidden="true"
                    ></i>{" "}
                    {item.name}
                  </a>
                </div>
              </div>
              <br></br>
            </>
          );
        }
      });
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>
        <div className=" background-detail-custom  shadow ">
          {checkShowButtonBack && (
            <Tooltip placement="bottom" title="Quay lại" color="gray" key="red">
              <a
                onClick={() => {
                  handleBack();
                }}
              >
                <i
                  className="fa fa-angle-left  "
                  aria-hidden="true"
                  style={{
                    color: "green",
                    fontSize: "30px",
                    marginTop: "10px",
                  }}
                ></i>
              </a>
            </Tooltip>
          )}

          <Divider orientation="left">Nhà cung cấp</Divider>
          <Descriptions size="small" layout="horizontal" bordered>
            <Descriptions.Item label="Nhà cung cấp" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.quanLyNhaCungCap &&
                itemKhoThuoc.quanLyNhaCungCap.tenNhaCungCap}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.quanLyNhaCungCap &&
                itemKhoThuoc.quanLyNhaCungCap.diaChiNhaCungCap}
            </Descriptions.Item>
            <Descriptions.Item label="Mã số thuế" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.quanLyNhaCungCap &&
                itemKhoThuoc.quanLyNhaCungCap.mstNhaCungCap}
            </Descriptions.Item>

            <Descriptions.Item label="Số điện thoại" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.quanLyNhaCungCap &&
                itemKhoThuoc.quanLyNhaCungCap.soDienThoaiNhaCungCap}
            </Descriptions.Item>

            <Descriptions.Item label="Zalo" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.quanLyNhaCungCap &&
                itemKhoThuoc.quanLyNhaCungCap.zalo}
            </Descriptions.Item>

            <Descriptions.Item label="Email" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.quanLyNhaCungCap &&
                itemKhoThuoc.quanLyNhaCungCap.email}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">Hàng hóa</Divider>

          <Descriptions size="small" layout="horizontal" bordered>
            <Descriptions.Item label="Tên thuốc" span={2}>
              {itemKhoThuoc && itemKhoThuoc.tenThuoc}
            </Descriptions.Item>
            <Descriptions.Item label="Mã thuốc" span={2}>
              {itemKhoThuoc && itemKhoThuoc.ma}
            </Descriptions.Item>
            <Descriptions.Item label="Phân loại" span={2}>
              {itemKhoThuoc && itemKhoThuoc.phanLoaiThuoc}
            </Descriptions.Item>
            <Descriptions.Item label="Số lượng nhập" span={2}>
              {renderConvertSoLuongTheoDonVi(
                itemKhoThuoc && itemKhoThuoc.soLuongNhap,
                itemKhoThuoc.donViTinh
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Số lượng còn lại trong kho" span={2}>
              {renderConvertSoLuongTheoDonVi(
                itemKhoThuoc &&
                  itemKhoThuoc.soLuongNhap - itemKhoThuoc.soLuongDaBan,
                itemKhoThuoc.donViTinh
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Số lượng đã bán" span={2}>
              {renderConvertSoLuongTheoDonVi(
                itemKhoThuoc && itemKhoThuoc.soLuongDaBan,
                itemKhoThuoc.donViTinh
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Vị trí thuốc trong tủ" span={2}>
              {itemKhoThuoc && itemKhoThuoc.khuVuc}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền trước thuế" span={2}>
              {itemKhoThuoc && renderTien(itemKhoThuoc.tongTienTruocThue)}
            </Descriptions.Item>
            <Descriptions.Item label="Thuế" span={2}>
              {itemKhoThuoc && itemKhoThuoc.phanTramThue} %
            </Descriptions.Item>
            <Descriptions.Item label="Chiết khấu" span={2}>
              {itemKhoThuoc && renderTien(itemKhoThuoc.chietKhau)}
            </Descriptions.Item>
            <Descriptions.Item label="Giá bán (Đã bao gồm thuế VAT)" span={2}>
              {itemKhoThuoc && renderTien(itemKhoThuoc.giaTien)}
            </Descriptions.Item>
            <Descriptions.Item label="Loại thanh toán" span={2}>
              {itemKhoThuoc &&
                renderConverLoaiThanhToan(itemKhoThuoc.thanhToan)}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày nhập thuốc" span={3}>
              {itemKhoThuoc && itemKhoThuoc.ngayTaoBanGhi}
            </Descriptions.Item>
            <Descriptions.Item label="Hạn sử dụng" span={3}>
              {itemKhoThuoc && renderDateHanSudung(itemKhoThuoc)}
            </Descriptions.Item>
            <Descriptions.Item label="File đính kèm">
              {renderFile(itemKhoThuoc && itemKhoThuoc.fileDBArrayList)}
            </Descriptions.Item>
          </Descriptions>
          <Divider orientation="left">Thông tin người nhập hàng</Divider>
          <Descriptions size="small" layout="horizontal" bordered>
            <Descriptions.Item label="Tên người nhập" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.thongTinNguoiTao &&
                itemKhoThuoc.thongTinNguoiTao.tenNguoiDung}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày sinh" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.thongTinNguoiTao &&
                renderDate(itemKhoThuoc.thongTinNguoiTao.ngaySinh)}
            </Descriptions.Item>
            <Descriptions.Item label="Giới tính" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.thongTinNguoiTao &&
                itemKhoThuoc.thongTinNguoiTao.gioiTinh}
            </Descriptions.Item>
            <Descriptions.Item label="CMND" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.thongTinNguoiTao &&
                itemKhoThuoc.thongTinNguoiTao.cmnd}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.thongTinNguoiTao &&
                itemKhoThuoc.thongTinNguoiTao.soDienThoai}
            </Descriptions.Item>
            <Descriptions.Item label="Facebook" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.thongTinNguoiTao &&
                itemKhoThuoc.thongTinNguoiTao?.facebook}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </>
  );
}

export default DetailKhoThuoc;
