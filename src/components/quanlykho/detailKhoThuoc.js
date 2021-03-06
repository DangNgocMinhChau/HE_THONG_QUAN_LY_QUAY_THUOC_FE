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
function DetailKhoThuoc({ itemKhoThuoc }) {
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
      <div className="container-fluid ">
        <div className=" background-detail-custom shadow ">
          <Divider orientation="left">Nh?? cung c???p</Divider>
          <Descriptions size="small" layout="horizontal" bordered>
            <Descriptions.Item label="Nh?? cung c???p" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.quanLyNhaCungCap &&
                itemKhoThuoc.quanLyNhaCungCap.tenNhaCungCap}
            </Descriptions.Item>
            <Descriptions.Item label="?????a ch???" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.quanLyNhaCungCap &&
                itemKhoThuoc.quanLyNhaCungCap.diaChiNhaCungCap}
            </Descriptions.Item>
            <Descriptions.Item label="M?? s??? thu???" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.quanLyNhaCungCap &&
                itemKhoThuoc.quanLyNhaCungCap.mstNhaCungCap}
            </Descriptions.Item>

            <Descriptions.Item label="S??? ??i???n tho???i" span={2}>
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

          <Divider orientation="left">H??ng h??a</Divider>

          <Descriptions size="small" layout="horizontal" bordered>
            <Descriptions.Item label="T??n thu???c" span={2}>
              {itemKhoThuoc && itemKhoThuoc.tenThuoc}
            </Descriptions.Item>
            <Descriptions.Item label="M?? thu???c" span={2}>
              {itemKhoThuoc && itemKhoThuoc.ma}
            </Descriptions.Item>
            <Descriptions.Item label="Ph??n lo???i" span={2}>
              {itemKhoThuoc && itemKhoThuoc.phanLoaiThuoc}
            </Descriptions.Item>
            <Descriptions.Item label="S??? l?????ng nh???p" span={2}>
              {renderConvertSoLuongTheoDonVi(
                itemKhoThuoc && itemKhoThuoc.soLuongNhap,
                itemKhoThuoc.donViTinh
              )}
            </Descriptions.Item>
            <Descriptions.Item label="S??? l?????ng c??n l???i trong kho" span={2}>
              {renderConvertSoLuongTheoDonVi(
                itemKhoThuoc &&
                  itemKhoThuoc.soLuongNhap - itemKhoThuoc.soLuongDaBan,
                itemKhoThuoc.donViTinh
              )}
            </Descriptions.Item>
            <Descriptions.Item label="S??? l?????ng ???? b??n" span={2}>
              {renderConvertSoLuongTheoDonVi(
                itemKhoThuoc && itemKhoThuoc.soLuongDaBan,
                itemKhoThuoc.donViTinh
              )}
            </Descriptions.Item>
            <Descriptions.Item label="V??? tr?? thu???c trong t???" span={2}>
              {itemKhoThuoc && itemKhoThuoc.khuVuc}
            </Descriptions.Item>
            <Descriptions.Item label="T???ng ti???n tr?????c thu???" span={2}>
              {itemKhoThuoc && renderTien(itemKhoThuoc.tongTienTruocThue)}
            </Descriptions.Item>
            <Descriptions.Item label="Thu???" span={2}>
              {itemKhoThuoc && itemKhoThuoc.phanTramThue} %
            </Descriptions.Item>
            <Descriptions.Item label="Chi???t kh???u" span={2}>
              {itemKhoThuoc && renderTien(itemKhoThuoc.chietKhau)}
            </Descriptions.Item>
            <Descriptions.Item label="Gi?? b??n (???? bao g???m thu??? VAT)" span={2}>
              {itemKhoThuoc && renderTien(itemKhoThuoc.giaTien)}
            </Descriptions.Item>
            <Descriptions.Item label="Lo???i thanh to??n" span={2}>
              {itemKhoThuoc &&
                renderConverLoaiThanhToan(itemKhoThuoc.thanhToan)}
            </Descriptions.Item>
            <Descriptions.Item label="Ng??y nh???p thu???c" span={3}>
              {itemKhoThuoc && itemKhoThuoc.ngayTaoBanGhi}
            </Descriptions.Item>
            <Descriptions.Item label="H???n s??? d???ng" span={3}>
              {itemKhoThuoc && renderDateHanSudung(itemKhoThuoc)}
            </Descriptions.Item>
            <Descriptions.Item label="File ????nh k??m">
              {renderFile(itemKhoThuoc && itemKhoThuoc.fileDBArrayList)}
            </Descriptions.Item>
          </Descriptions>
          <Divider orientation="left">Th??ng tin ng?????i nh???p h??ng</Divider>
          <Descriptions size="small" layout="horizontal" bordered>
            <Descriptions.Item label="T??n ng?????i nh???p" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.thongTinNguoiTao &&
                itemKhoThuoc.thongTinNguoiTao.tenNguoiDung}
            </Descriptions.Item>
            <Descriptions.Item label="Ng??y sinh" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.thongTinNguoiTao &&
                renderDate(itemKhoThuoc.thongTinNguoiTao.ngaySinh)}
            </Descriptions.Item>
            <Descriptions.Item label="Gi???i t??nh" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.thongTinNguoiTao &&
                itemKhoThuoc.thongTinNguoiTao.gioiTinh}
            </Descriptions.Item>
            <Descriptions.Item label="CMND" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.thongTinNguoiTao &&
                itemKhoThuoc.thongTinNguoiTao.cmnd}
            </Descriptions.Item>
            <Descriptions.Item label="S??? ??i???n tho???i" span={2}>
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
