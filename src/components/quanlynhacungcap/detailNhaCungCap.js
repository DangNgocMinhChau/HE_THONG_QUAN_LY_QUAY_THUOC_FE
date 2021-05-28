import React, { useEffect, useState } from "react";
import { Descriptions, Button, Divider } from "antd";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as act from "../../actions/quanlykho/actQuanLyKho";
import moment from "moment";

function DetailNhaCungCap({ match, history }) {
  const { id } = match.params;
  const dispatch = useDispatch();
  const item = useSelector((state) => state.itemEditing);
  useEffect(() => {
    dispatch(act.actGetKhoThuocByIdRequest(id));
  }, [id]);
  function goBack() {
    history.goBack();
  }
  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h5 className=" mb-0 text-gray-800">{`Chi tiết  ${
            item.thongTinNhaCungCap !== null &&
            item.thongTinNhaCungCap !== undefined
              ? item.thongTinNhaCungCap
              : ""
          }`}</h5>
          <Button
            type="primary"
            onClick={() => {
              goBack();
            }}
          >
            Quay lại
          </Button>
        </div>
        <div className=" background-detail-custom  shadow ">
          <Descriptions size="small" layout="horizontal" bordered>
            <Descriptions.Item label="Thông tin" span={2}>
              {item.thongTinNhaCungCap}
            </Descriptions.Item>
            <Descriptions.Item label="Tên nhà cung cấp" span={2}>
              {item.tenNhaCungCap}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ nhà cung cấp" span={2}>
              {item.diaChiNhaCungCap && item.diaChiNhaCungCap}
            </Descriptions.Item>
            <Descriptions.Item label="Mã số thuế" span={2}>
              {item.mstNhaCungCap && item.mstNhaCungCap}
            </Descriptions.Item>

            <Descriptions.Item label="Thanh toán" span={2}>
              {item.thanhToanNhaCungCap && item.thanhToanNhaCungCap}
            </Descriptions.Item>

            <Descriptions.Item label="Ngày nhập hóa đơn" span={2}>
              {moment(
                item.ngayHoaDonNhaCungCap && item.ngayHoaDonNhaCungCap
              ).format("DD/MM/YYYY")}
            </Descriptions.Item>

            <Descriptions.Item label="Tên hàng hóa" span={2}>
              {item.tenHangHoa && item.tenHangHoa}
            </Descriptions.Item>

            <Descriptions.Item label="Đơn vị tính" span={2}>
              {item.donViTinh && item.donViTinh}
            </Descriptions.Item>

            <Descriptions.Item label="Tổng tiền trước thuế" span={2}>
              {item.tongTienTruocThue && item.tongTienTruocThue}
            </Descriptions.Item>

            <Descriptions.Item label="Thuế 5%" span={2}>
              {item.thue5 && item.thue5}
            </Descriptions.Item>

            <Descriptions.Item label="Chiết khấu" span={2}>
              {item.chietKhau && item.chietKhau}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </>
  );
}

export default DetailNhaCungCap;
