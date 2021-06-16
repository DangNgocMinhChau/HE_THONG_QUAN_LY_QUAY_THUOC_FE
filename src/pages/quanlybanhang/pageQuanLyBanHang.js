import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Button, Tooltip, Alert } from "antd";
import * as actBanHang from "../../actions/quanlybanhang/actQuanLyBanHang";
import * as actNhapKho from "../../actions/quanlykho/actQuanLyKho";
import * as actHoaDonHoaDonDaHoanTat from "../../actions/quanly_hoadon_ban_thanhcong/actQuanLyHoaDonBanThanhCong";
import * as actQuanLyThongTinKhachHang from "../../actions/quanlythongtinkhachhang/actQuanLyThongTinKhachHang";
import FormBanHang from "../../components/quanlybanhang/formBanHang";
import { renderDateTheoHeThong } from "./../../common/convert/renderConvert";
import ModalBanHang from "../../components/quanlybanhang/modalBanHang";
import FormThongTinKhachHang from "../../components/quanlythongtinkhachhang/formThongTinKhachHang";
function PageQuanLyBanHang({ match, location }) {
  const [checkFormThemMoi, setCheckFormThemMoi] = useState(false);
  const [checkDanhSach, setCheckDanhSach] = useState(true);
  const account_current = useSelector(
    (state) => state.quanlylogin.account_current
  );
  const listHoaDonBanHangTam = useSelector((state) => state.quanlybanhang.list);
  const itemHoaDon = useSelector((state) => state.quanlybanhang.itemHoaDon);
  const [checkEdit, setCheckEdit] = useState(false);
  const [checkSubmitHoanThanh, setCheckSubmitHoanThanh] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [checkSubmitForm, setCheckSubmitForm] = useState(false);
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
    // cancel();
  }

  const handleHuyDonDatHangTam = () => {
    dispatch(actBanHang.actDeleteBanHangRequest(itemHoaDon && itemHoaDon.id));
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
    resetForm();
    setCheckFormThemMoi(true);
    setCheckDanhSach(false);
    setCheckEdit(false);
    setIsVisible(false);
    dispatch(actBanHang.actHoaDonBanHang(null));
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
    let idHoaDonBanHang = value.id;
    value = {
      sanPham: value.sanPham,
      idKhachHang: value.idKhachHang,
      soDienThoaiKhachHang: value.soDienThoaiKhachHang,
      tenKhachHang: value.tenKhachHang,
      nguoiTaoId: value.nguoiTaoId,
      ngayTaoBanGhi: renderDateTheoHeThong(),
    };
    dispatch(actHoaDonHoaDonDaHoanTat.actCreateHoaDonDaHoanTatRequest(value));
    dispatch(actBanHang.actHoaDonBanHang({}));
    dispatch(actBanHang.actGetBanHangById({}));
    setCheckSubmitHoanThanh(true);
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
      dispatch(actBanHang.actGetBanHangByIdRequest(listHoaDonBanHangTam[0].id));
    }
    dispatch(actQuanLyThongTinKhachHang.actFetchThongTinKhachHangRequest());
  }, []);

  return (
    <div className="container-fluid ">
      <div className="row">
        {/* <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between pb-0 pt-0 ">
              <h6 className="m-0 font-weight-bold ">Bán hàng</h6>
              <div className=" d-flex flex-row align-items-center  ">
                {listHoaDonBanHangTam.length > 0 && (
                  <Tooltip placement="bottom" title="Hủy hoá đơn" key="red">
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

                {itemHoaDon && Array.isArray(itemHoaDon.sanPham) && (
                  <Tooltip
                    placement="bottom"
                    title="Hoàn tất hoá đơn"
                    key="red"
                  >
                    <a
                      className="ml-3 text-success"
                      onClick={() => {
                        hoanTatThanhToan(itemHoaDon.id);
                      }}
                    >
                      <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                    </a>
                  </Tooltip>
                )}

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
              </div>
            </div>
            {checkFormThemMoiKhachHang && (
              <FormThongTinKhachHang
                onSave={onSaveQuanLyThongTinKhachHang}
                cancel={cancelSauKhiThemThongTinKhachHang}
                checkEdit={checkEdit}
              />
            )}
            <FormBanHang
              onSave={onSave}
              cancel={cancel}
              checkEdit={checkEdit}
              checkFormThemMoiKhachHang={checkFormThemMoiKhachHang}
              setCheckSubmitForm={setCheckSubmitForm}
              onEdit={onEdit}
            />
            <ModalBanHang
              isVisible={isVisible}
              onCancel={onCancel}
              onSave={onSave}
              checkEdit={checkEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageQuanLyBanHang;
