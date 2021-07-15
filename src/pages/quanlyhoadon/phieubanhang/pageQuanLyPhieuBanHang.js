import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actNhapKho from "../../../actions/quanlykho/actQuanLyKho";
import * as actQuanLyBanHangThanhCong from "../../../actions/quanly_hoadon_ban_thanhcong/actQuanLyHoaDonBanThanhCong";
import PhieuBanHang from "../../../components/quanlyhoadon/phieubanhang/phieuBanHang";
import ModalDieuChinhPhieuBanHang from "../../../components/quanlyhoadon/phieubanhang/modalDieuChinhPhieuBanHang";
import ModalTraCuuLichSuDieuChinhPhieuBanHang from "../../../components/quanlyhoadon/phieubanhang/modalTraCuuLichSuDieuChinhPhieuBanHang";
import { thongBao } from "../../../common/renderThongBao/renderThongBaoCommon";
import { renderDateTheoHeThong } from "../../../common/convert/renderConvert";
import queryString from "query-string";

export default function PageQuanLyPhieuBanHang({ match, location }) {
  const [checkFormThemMoi, setCheckFormThemMoi] = useState(false);
  const [checkDanhSach, setCheckDanhSach] = useState(false);
  const [checkEdit, setCheckEdit] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleLichSuPhieuBanHang, setIsVisibleLichSuPhieuBanHang] =
    useState(false);
  const [checkSubmitForm, setCheckSubmitForm] = useState(false);
  const account_current = useSelector(
    (state) => state.quanlylogin.account_current
  );
  const dispatch = useDispatch();
  function cancel() {
    setCheckDanhSach(true);
    setCheckFormThemMoi(false);
    setIsVisible(false);
  }
  function onSave(value) {
    if (checkSubmitForm) {
      thongBao(
        "Thông báo",
        "phiếu bán chưa được tối ưu ! vui lòng kiểm tra lại"
      );
    } else {
      if (value.id) {
        let sanPham = [];
        value.sanPham.map((item, index) => {
          if (item.id) {
            item = { ...item };
            sanPham.push(item);
          } else {
            item = { ...item, id: null };
            sanPham.push(item);
          }
        });
        value = {
          ...value,
          ngayChinhSua: renderDateTheoHeThong(),
          sanPham: sanPham,
          nguoiTaoId: account_current.id,
        };
        dispatch(
          actQuanLyBanHangThanhCong.actUpdateHoaDonDaHoanTatRequest(value)
        );
        capNhatLaiKhoThuocSauKhiBan(value);
      }
      cancel();
    }
  }

  const capNhatLaiKhoThuocSauKhiBan = (value) => {
    value.sanPham.map((item, index) => {
      if (item.id) {
        dispatch(actNhapKho.actUpdateHoaDonKhiEditHoadonRequest(value, item));
      }
    });
  };

  function onEdit(id) {
    dispatch(actQuanLyBanHangThanhCong.actGetHoaDonDaHoanTatByIdRequest(id));
    setCheckEdit(true);
    setIsVisible(true);
    setCheckDanhSach(true);
  }

  const onCancel = () => {
    setIsVisible(false);
    setIsVisibleLichSuPhieuBanHang(false);
  };

  const handdleBack = () => {
    setCheckDanhSach(false);
  };
  return (
    <div className="container-fluid ">
      <div className="row">
        {/* <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-12">
          <div className="card-custom shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header-custom py-3 d-flex flex-row align-items-center justify-content-between ">
              <p className="text-card-header">
                <i
                  className="color-icon-header-danhsach fa fa-book"
                  aria-hidden="true"
                ></i>
                Thống kê phiếu bán hàng
              </p>
              {checkDanhSach && (
                <a onClick={handdleBack} className="m-0 font-weight-bold ">
                  <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </a>
              )}
            </div>
            <PhieuBanHang
              onEdit={onEdit}
              setIsVisibleLichSuPhieuBanHang={setIsVisibleLichSuPhieuBanHang}
            />

            <ModalDieuChinhPhieuBanHang
              isVisible={isVisible}
              onCancel={onCancel}
              onSave={onSave}
              checkEdit={checkEdit}
              setCheckSubmitForm={setCheckSubmitForm}
            />

            <ModalTraCuuLichSuDieuChinhPhieuBanHang
              isVisibleLichSuPhieuBanHang={isVisibleLichSuPhieuBanHang}
              onCancel={onCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
