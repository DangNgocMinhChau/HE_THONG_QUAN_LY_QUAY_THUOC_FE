import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actNhapKho from "../../actions/quanlykho/actQuanLyKho";
import * as actHoaDonHoaDonDaHoanTat from "../../actions/quanly_hoadon_ban_thanhcong/actQuanLyHoaDonBanThanhCong";
import HoaDon from "../../components/quanlyhoadon/hoaDon";
import ModalDieuChinhHoaDon from "./../../components/quanlyhoadon/modalDieuChinhHoaDon";
import { thongBao } from "../../common/renderThongBao/renderThongBaoCommon";

function PageQuanLyHoaDon({ match, location }) {
  const [checkFormThemMoi, setCheckFormThemMoi] = useState(false);
  const [checkDanhSach, setCheckDanhSach] = useState(false);
  const [checkEdit, setCheckEdit] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [checkSubmitForm, setCheckSubmitForm] = useState(false);
  const dispatch = useDispatch();
  function cancel() {
    setCheckDanhSach(true);
    setCheckFormThemMoi(false);
    setIsVisible(false);
  }
  function onSave(value) {
    if (checkSubmitForm) {
      thongBao("Thông báo", "Hoá đơn chưa được tối ưu ! vui lòng kiểm tra lại");
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
          sanPham: sanPham,
        };
        dispatch(
          actHoaDonHoaDonDaHoanTat.actUpdateHoaDonDaHoanTatRequest(value)
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
    dispatch(actHoaDonHoaDonDaHoanTat.actGetHoaDonDaHoanTatByIdRequest(id));
    setCheckEdit(true);
    setIsVisible(true);
    setCheckDanhSach(true);
  }

  const onCancel = () => {
    setIsVisible(false);
  };

  const handdleBack = () => {
    setCheckDanhSach(false);
  };
  return (
    <div className="container-fluid ">
      <div className="row">
        {/* <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold ">Hoá đơn</h6>
              {checkDanhSach && (
                <a onClick={handdleBack} className="m-0 font-weight-bold ">
                  <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </a>
              )}
            </div>
            <HoaDon onEdit={onEdit} />

            <ModalDieuChinhHoaDon
              isVisible={isVisible}
              onCancel={onCancel}
              onSave={onSave}
              checkEdit={checkEdit}
              setCheckSubmitForm={setCheckSubmitForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageQuanLyHoaDon;
