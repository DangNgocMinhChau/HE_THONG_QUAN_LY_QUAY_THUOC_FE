import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Button, Tooltip, Alert } from "antd";
import * as actBanHang from "../../actions/quanlybanhang/actQuanLyBanHang";
import * as actNhapKho from "../../actions/quanlykho/actQuanLyKho";
import * as actHoaDonHoaDonDaHoanTat from "../../actions/quanly_hoadon_ban_thanhcong/actQuanLyHoaDonBanThanhCong";
import * as actQuanLyThongTinKhachHang from "../../actions/quanlythongtinkhachhang/actQuanLyThongTinKhachHang";
import FormBanHang from "../../components/quanlybanhang/formBanHang";
import HoaDon from "../../components/quanlybanhang/hoaDon";
import { renderDateTheoHeThong } from "./../../common/convert/renderConvert";
import ModalBanHang from "../../components/quanlybanhang/modalBanHang";
import FormThongTinKhachHang from "../../components/quanlythongtinkhachhang/formThongTinKhachHang";
function PageQuanLyBanHang({ match, location }) {
  const [checkFormThemMoi, setCheckFormThemMoi] = useState(false);
  const [checkDanhSach, setCheckDanhSach] = useState(true);
  const listThuoc = useSelector((state) => state.khothuoc.list);
  const account_current = useSelector(
    (state) => state.quanlylogin.account_current
  );
  const listHoaDonBanHangTam = useSelector((state) => state.quanlybanhang.list);
  const [checkEdit, setCheckEdit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [checkFormThemMoiKhachHang, setCheckFormThemMoiKhachHang] =
    useState(false);
  const dispatch = useDispatch();

  function cancel() {
    setCheckDanhSach(true);
    setCheckFormThemMoi(false);
    setIsVisible(false);
  }

  const cancelSauKhiThemThongTinKhachHang = () => {
    setCheckDanhSach(false);
    setCheckFormThemMoi(true);
    setIsVisible(false);
    setCheckFormThemMoiKhachHang(false);
  };
  const onClose = () => {
    setShowAlert(false);
  };
  function onSave(value) {
    if (value.id) {
      dispatch(actBanHang.actUpdateBanHangRequest(value));
    } else {
      value = {
        ...value,
        ngayTaoBanGhi: renderDateTheoHeThong(),
        nguoiTaoId: account_current.id,
      };
      dispatch(actBanHang.actCreateBanHangRequest(value));
    }
    cancel();
  }
  const handleHuyDonDatHangTam = () => {
    dispatch(actBanHang.actDeleteBanHangRequest(1));
  };
  function onSaveQuanLyThongTinKhachHang(value) {
    if (value.id) {
      value = {
        ...value,
        ten: value.soDienThoaiKhachHang,
        ngayChinhSua: renderDateTheoHeThong(),
      };
      dispatch(
        actQuanLyThongTinKhachHang.actUpdateThongTinKhachHangRequest(value)
      );
    } else {
      value = {
        ...value,
        ten: value.soDienThoaiKhachHang,
        ngayTaoBanGhi: renderDateTheoHeThong(),
      };
      dispatch(
        actQuanLyThongTinKhachHang.actCreateThongTinKhachHangRequest(value)
      );
    }
    cancelSauKhiThemThongTinKhachHang();
  }

  function onDelete(id) {
    dispatch(actBanHang.actDeleteBanHangRequest(id));
  }

  function onEdit(id) {
    dispatch(actBanHang.actGetBanHangByIdRequest(id));
    setCheckDanhSach(false);
    setCheckEdit(true);
    setIsVisible(true);
    setCheckDanhSach(true);
  }

  const onCancel = () => {
    setIsVisible(false);
    setCheckDanhSach(true);
  };

  function resetForm() {
    dispatch(actBanHang.actGetBanHangById(null));
  }

  function openForm() {
    // if (listHoaDonBanHangTam.length > 0) {
    //   setShowAlert(true);
    // } else {
    resetForm();
    setCheckFormThemMoi(true);
    setCheckDanhSach(false);
    setCheckEdit(false);
    setIsVisible(false);
    dispatch(actBanHang.actHoaDonBanHang(null));
    // }
  }
  const hoanTatThanhToan = (value) => {
    dispatch(
      actBanHang.actGetHoaDonSauKhiBanByIdRequest(
        value,
        capNhatLaiKhoThuocSauKhiBan,
        hoaDonDaHoanTat
      )
    );
  };

  const hoaDonDaHoanTat = (value) => {
    console.log(value);
    let idHoaDonBanHang = value.id;
    let totalTien = 0;
    let arraySanPham = [];
    // value.sanPham.map((item, index) => {
    //   totalTien += item.giaTien * item.soLuongMua;
    // });

    // value.sanPham.map((item, index) => {
    //   item = {
    //     id: item.id ? item.id : "",
    //     idThuoc: item.id ? item.id : "",
    //     tenThuoc: item.tenThuoc,
    //     ten: item.tenThuoc,
    //     ma: item.ma,
    //     donViTinh: item.donViTinh,
    //     tongTienTruocThue: parseFloat(item.tongTienTruocThue),
    //     phanTramThue: item.phanTramThue,
    //     chietKhau: item.chietKhau,
    //     giaTien: parseFloat(item.giaTien),
    //     thanhToan: item.thanhToan,
    //     soLuongNhap: item.soLuongNhap,
    //     ngayNhapThuoc: item.ngayNhapThuoc,
    //     idNhaCungCap: item.idNhaCungCap ? item.idNhaCungCap : "",
    //     ngayTaoBanGhi: item.ngayTaoBanGhi ? item.ngayTaoBanGhi : "",
    //     soLuongDaBan: item.soLuongDaBan + item.soLuongMua,
    //     soLuongMua: item.soLuongMua,
    //     fileDinhKem: item.fileDinhKem ? item.fileDinhKem : "",
    //     thongTinNguoiTao: item.thongTinNguoiTao ? item.thongTinNguoiTao : "",
    //     khuVuc: item.khuVuc,
    //     phanLoaiThuoc: item.phanLoaiThuoc,
    //   };
    //   arraySanPham.push(item);
    // });

    value = {
      sanPham: value.sanPham,
      idKhachHang: value.idKhachHang,
      soDienThoaiKhachHang: value.soDienThoaiKhachHang,
      tenKhachHang: value.tenKhachHang,
      nguoiTaoId: value.nguoiTaoId,
      ngayTaoBanGhi: renderDateTheoHeThong(),
    };
    dispatch(actHoaDonHoaDonDaHoanTat.actCreateHoaDonDaHoanTatRequest(value));
    dispatch(actBanHang.actDeleteBanHangRequest(value.id));
    dispatch(actBanHang.actHoaDonBanHang(null));
    onDelete(idHoaDonBanHang);
  };

  const capNhatLaiKhoThuocSauKhiBan = (value) => {
    value &&
      Array.isArray(value.sanPham) &&
      value.sanPham.length > 0 &&
      value.sanPham.map((item, index) => {
        item = {
          id: item.id ? item.id : "",
          tenThuoc: item.tenThuoc,
          ten: item.tenThuoc,
          ma: item.ma,
          donViTinh: item.donViTinh,
          tongTienTruocThue: parseFloat(item.tongTienTruocThue),
          phanTramThue: item.phanTramThue,
          chietKhau: item.chietKhau,
          giaTien: parseFloat(item.giaTien),
          thanhToan: item.thanhToan,
          soLuongNhap: item.soLuongNhap,
          ngayNhapThuoc: item.ngayNhapThuoc,
          idNhaCungCap: item.idNhaCungCap ? item.idNhaCungCap : "",
          ngayTaoBanGhi: item.ngayTaoBanGhi ? item.ngayTaoBanGhi : "",
          soLuongDaBan: item.soLuongDaBan + item.soLuongMua,
          soLuongMua: item.soLuongMua,
          fileDinhKem: item.fileDinhKem ? item.fileDinhKem : "",
          thongTinNguoiTao: item.thongTinNguoiTao ? item.thongTinNguoiTao : "",
          khuVuc: item.khuVuc,
          phanLoaiThuoc: item.phanLoaiThuoc,
        };
        dispatch(actNhapKho.actUpdateThuocRequest(item));
      });
  };
  const handleCreteKhachHang = (value) => {
    setCheckFormThemMoiKhachHang(value);
  };

  useEffect(() => {
    dispatch(actBanHang.actFetchBanHangRequest());
    if (listHoaDonBanHangTam.length > 0) {
      dispatch(actBanHang.actGetBanHangByIdRequest(1));
    }
    dispatch(actQuanLyThongTinKhachHang.actFetchThongTinKhachHangRequest());
  }, []);
  return (
    <div className="container-fluid ">
      {/* <!-- Page Heading --> */}
      {showAlert ? (
        <Alert
          message="Thông báo"
          description="Vui lòng xử lý đơn hàng !"
          type="error"
          closable
          onClose={onClose}
        />
      ) : (
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h5 className=" mb-0 text-gray-800">Bàn hàng</h5>
          <Button
            type="primary"
            onClick={() => {
              openForm();
            }}
          >
            Tạo phiếu ghi
          </Button>
        </div>
      )}

      <div className="row">
        {/* <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold ">Bán hàng</h6>
              {listHoaDonBanHangTam.length > 0 && (
                <Tooltip placement="bottom" title="Hủy" key="red">
                  <a
                    className="m-0 p-0 "
                    size="small"
                    onClick={() => {
                      handleHuyDonDatHangTam();
                    }}
                    type="dashed"
                    danger={true}
                  >
                    <i
                      class="fa fa-times-circle-o"
                      style={{ color: "red" }}
                      aria-hidden="true"
                    ></i>
                  </a>
                </Tooltip>
              )}
              {checkFormThemMoi && (
                <Tooltip
                  placement="bottom"
                  title="Tạo mới khách hàng"
                  key="red"
                >
                  <a
                    className="m-0 p-0 "
                    size="small"
                    onClick={() => {
                      handleCreteKhachHang(!checkFormThemMoiKhachHang);
                    }}
                    type="dashed"
                    danger={true}
                  >
                    <i
                      class="fa fa-address-card"
                      style={{ color: "indigo" }}
                      aria-hidden="true"
                    ></i>
                  </a>
                </Tooltip>
              )}
            </div>
            {checkFormThemMoi && (
              <FormBanHang
                onSave={onSave}
                cancel={cancel}
                checkEdit={checkEdit}
                checkFormThemMoiKhachHang={checkFormThemMoiKhachHang}
              />
            )}
            {/* {checkDanhSach && (
              <TableBanHang
                data={dataListBanHang}
                match={match}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            )} */}
            {checkDanhSach && (
              <HoaDon onEdit={onEdit} hoanTatThanhToan={hoanTatThanhToan} />
            )}
            <ModalBanHang
              isVisible={isVisible}
              onCancel={onCancel}
              onSave={onSave}
              checkEdit={checkEdit}
            />
            {checkFormThemMoiKhachHang && (
              <FormThongTinKhachHang
                onSave={onSaveQuanLyThongTinKhachHang}
                cancel={cancelSauKhiThemThongTinKhachHang}
                checkEdit={checkEdit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageQuanLyBanHang;
