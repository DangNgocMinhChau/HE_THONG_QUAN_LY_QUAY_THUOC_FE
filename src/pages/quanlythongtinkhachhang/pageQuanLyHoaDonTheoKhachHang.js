import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actQuanLyBanHangThanhCong from "../../actions/quanly_hoadon_ban_thanhcong/actQuanLyHoaDonBanThanhCong";
import HoaDonTheoKhachHang from "../../components/quanlythongtinkhachhang/hoaDonTheoKhachHang";
import { Tooltip } from "antd";

function PageQuanLyHoaDonTheoKhachHang({ match, location, history }) {
  const id = match.params.id;
  // const { dataListThongTinKhachHang } = useSelector(
  //   (state) => ({
  //     dataListThongTinKhachHang: state.quanlythongtinkhachhang.list,
  //   }),
  //   shallowEqual
  // );
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(actQuanLyBanHangThanhCong.actGetHoaDonTheoKhachHangRequest(id));
    }
  }, []);

  const cancel = () => {
    dispatch(actQuanLyBanHangThanhCong.actGetHoaDonTheoKhachHang([]));
    history.goBack();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 ">
                Khách hàng:{" "}
                {`${
                  location.dataKhachHang
                    ? location.dataKhachHang.tenKhachHang
                      ? location.dataKhachHang.tenKhachHang
                      : ""
                    : ""
                }  /
                  ${
                    location.dataKhachHang
                      ? location.dataKhachHang.soDienThoai
                        ? location.dataKhachHang.soDienThoai
                        : ""
                      : ""
                  }`}{" "}
              </h6>
              <Tooltip
                placement="bottom"
                title="Quay lại"
                color="gray"
                key="red"
              >
                <a
                  onClick={() => {
                    cancel();
                  }}
                >
                  <i class="fa fa-angle-left" aria-hidden="true"></i>
                </a>
              </Tooltip>
            </div>
            <HoaDonTheoKhachHang />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageQuanLyHoaDonTheoKhachHang;
