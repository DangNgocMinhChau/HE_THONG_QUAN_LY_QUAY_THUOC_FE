import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Tooltip } from "antd";
import * as actBanHang from "../../actions/quanlybanhang/actQuanLyBanHang";
import * as actQuanLyBanHangThanhCong from "../../actions/quanly_hoadon_ban_thanhcong/actQuanLyHoaDonBanThanhCong";
import * as actQuanLyThongTinKhachHang from "../../actions/quanlythongtinkhachhang/actQuanLyThongTinKhachHang";
import FormBanHang from "../../components/quanlybanhang/formBanHang";
import { renderDateTheoHeThong } from "./../../common/convert/renderConvert";
import ModalBanHang from "../../components/quanlybanhang/modalBanHang";
import FormThongTinKhachHang from "../../components/quanlythongtinkhachhang/formThongTinKhachHang";
export default function PageQuanLyBanHang({ match, location }) {
  const account_current = useSelector(
    (state) => state.quanlylogin.account_current
  );
  const listHoaDonBanHangTam = useSelector((state) => state.quanlybanhang.list);
  const itemHoaDon = useSelector((state) => state.quanlybanhang.itemHoaDon);
  const [checkEdit, setCheckEdit] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [checkFormThemMoiKhachHang, setCheckFormThemMoiKhachHang] =
    useState(false);

  const dispatch = useDispatch();

  function cancel() {
    setIsVisible(false);
  }

  const cancelSauKhiThemThongTinKhachHang = () => {
    setIsVisible(false);
    setCheckFormThemMoiKhachHang(false);
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
    setCheckEdit(true);
    setIsVisible(true);
  }

  const onCancel = () => {
    setIsVisible(false);
  };

  const hoanTatThanhToan = (value) => {
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
    dispatch(actQuanLyBanHangThanhCong.actCreateHoaDonDaHoanTatRequest(value));
    dispatch(actBanHang.actHoaDonBanHang({}));
    dispatch(actBanHang.actGetBanHangById({}));
    onDelete(idHoaDonBanHang);
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
          <div className="card-custom shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header-custom py-2 d-flex flex-row align-items-center justify-content-between ">
              <p className="text-card-header">
                <i
                  className="color-icon-header-remove fa fa-cart-arrow-down"
                  aria-hidden="true"
                ></i>
                Bán hàng
              </p>
              {/* <div className=" d-flex flex-row align-items-center  ">
                <Tooltip
                  placement="bottom"
                  title="Tạo mới khách hàng"
                  key="red"
                >
                  <i
                    className="fa fa-address-card"
                    style={{ color: "indigo", cursor: "pointer" }}
                    aria-hidden="true"
                    onClick={() => {
                      setCheckFormThemMoiKhachHang(!checkFormThemMoiKhachHang);
                    }}
                  ></i>
                </Tooltip>
              </div> */}
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
