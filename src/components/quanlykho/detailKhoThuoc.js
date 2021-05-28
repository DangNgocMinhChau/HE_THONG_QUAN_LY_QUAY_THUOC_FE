import React, { useEffect, useState } from "react";
import { Descriptions, Button, Divider } from "antd";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actQuanLyNhaCungCap from "../../actions/quanlynhacungcap/actQuanLyNhaCungCap";
import {
  renderTien,
  renderDateTime,
  renderConverLoaiThanhToan,
  renderDate,
} from "./../../common/convert/renderConvert";
function DetailKhoThuoc({ match, history, itemKhoThuoc }) {
  const dispatch = useDispatch();
  const itemNhaCungCap = useSelector((state) => state.quanlynhacungcap.item);
  useEffect(() => {
    dispatch(
      actQuanLyNhaCungCap.actGetNhaCungCapByIdRequest(
        itemKhoThuoc && itemKhoThuoc.idNhaCungCap
      )
    );
  });

  const renderFile = (value) => {
    if (value && Array.isArray(value)) {
      return value.map((item, index) => {
        return (
          <a href={item.urlfiles} target="_blank">
            {" "}
            <i
              class="fa fa-paperclip"
              style={{ color: "black" }}
              aria-hidden="true"
            ></i>{" "}
            {item.tenFile}
          </a>
        );
      });
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>
        <div className=" background-detail-custom  shadow ">
          <Divider orientation="left">Nhà cung cấp</Divider>
          <Descriptions size="small" layout="horizontal" bordered>
            <Descriptions.Item label="Nhà cung cấp" span={2}>
              {itemNhaCungCap && itemNhaCungCap.tenNhaCungCap}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ" span={2}>
              {itemNhaCungCap && itemNhaCungCap.diaChiNhaCungCap}
            </Descriptions.Item>
            <Descriptions.Item label="Mã số thuế" span={2}>
              {itemNhaCungCap && itemNhaCungCap.mstNhaCungCap}
            </Descriptions.Item>

            <Descriptions.Item label="Số điện thoại" span={2}>
              {itemNhaCungCap && itemNhaCungCap.soDienThoaiNhaCungCap}
            </Descriptions.Item>

            <Descriptions.Item label="Zalo" span={2}>
              {itemNhaCungCap && itemNhaCungCap.zalo}
            </Descriptions.Item>

            <Descriptions.Item label="Email" span={2}>
              {itemNhaCungCap && itemNhaCungCap.email}
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
              {itemKhoThuoc &&
                itemKhoThuoc.soLuongNhap + "/" + itemKhoThuoc.donViTinh}
            </Descriptions.Item>
            <Descriptions.Item label="Số lượng còn lại trong kho" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.soLuongBanDau + "/" + itemKhoThuoc.donViTinh}
            </Descriptions.Item>
            <Descriptions.Item label="Số lượng đã bán" span={2}>
              {itemKhoThuoc &&
                itemKhoThuoc.soLuongDaBan + "/" + itemKhoThuoc.donViTinh}
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
              {itemKhoThuoc && renderDateTime(itemKhoThuoc.ngayNhapThuoc)}
            </Descriptions.Item>
            <Descriptions.Item label="File đính kèm">
              {renderFile(itemKhoThuoc && itemKhoThuoc.fileDinhKem)}
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
