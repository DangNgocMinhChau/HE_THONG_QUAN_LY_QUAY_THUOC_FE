import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Tooltip } from "antd";
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
  const [checkCoDonHang, setCheckCoDonHang] = useState(false);
  const [checkSubmitForm, setCheckSubmitForm] = useState(false);
  const [checkMuaHangThanhCong, setCheckMuaHangThanhCong] = useState(false);
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
      value = {
        ...value,
        ngayChinhSua: renderDateTheoHeThong(),
      };
      dispatch(actBanHang.actUpdateBanHangRequest(value));
    } else {
      value = {
        ...value,
        ngayTaoBanGhi: renderDateTheoHeThong(),
        nguoiTaoId: account_current.id,
      };
      dispatch(actBanHang.actCreateBanHangRequest(value));
    }
    setCheckCoDonHang(true);
  }

  const handleHuyDonDatHangTam = () => {
    dispatch(actBanHang.actDeleteBanHangRequest(itemHoaDon && itemHoaDon.id));
  };

  const onSaveQuanLyThongTinKhachHang = (value) => {
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
        actQuanLyThongTinKhachHang.actCreateThongTinKhachHangRequest(
          value,
          callRequestThongTinKhachHang
        )
      );
    }
    cancelSauKhiThemThongTinKhachHang();
  };
  const callRequestThongTinKhachHang = () => {
    dispatch(actQuanLyThongTinKhachHang.actFetchThongTinKhachHangRequest());
  };
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

  const hoanTatThanhToan = (value) => {
    setCheckMuaHangThanhCong(true);
    dispatch(
      actBanHang.actGetHoaDonSauKhiBanByIdRequest(value, hoaDonDaHoanTat)
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
      tienNhan: value.tienNhan,
      ngayTaoBanGhi: renderDateTheoHeThong(),
    };
    dispatch(actHoaDonHoaDonDaHoanTat.actCreateHoaDonDaHoanTatRequest(value));
    dispatch(actBanHang.actHoaDonBanHang({}));
    dispatch(actBanHang.actGetBanHangById({}));
    setCheckSubmitHoanThanh(true);
    onDelete(idHoaDonBanHang);
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
                <Tooltip
                  placement="bottom"
                  title="Tạo mới khách hàng"
                  key="red"
                >
                  <a
                    className="m-0 p-0 ml-3"
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
              listHoaDonBanHangTam={listHoaDonBanHangTam}
              handleHuyDonDatHangTam={handleHuyDonDatHangTam}
              itemHoaDon={itemHoaDon}
              hoanTatThanhToan={hoanTatThanhToan}
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
