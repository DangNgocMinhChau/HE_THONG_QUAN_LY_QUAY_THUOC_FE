import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actBanHang from "../../actions/quanlybanhang/actQuanLyBanHang";
import * as actNhapKho from "../../actions/quanlykho/actQuanLyKho";
import * as actHoaDonHoaDonDaHoanTat from "../../actions/quanly_hoadon_ban_thanhcong/actQuanLyHoaDonBanThanhCong";
import HoaDon from "../../components/quanlyhoadon/hoaDon";
import ModalDieuChinhHoaDon from "./../../components/quanlyhoadon/modalDieuChinhHoaDon";
import CalendarHoaDon from "../../components/quanlyhoadon/calendarHoaDon";
import { thongBao } from "../../constants/message/thongBao";

function PageQuanLyHoaDon({ match, location }) {
  const [checkFormThemMoi, setCheckFormThemMoi] = useState(false);
  const [checkDanhSach, setCheckDanhSach] = useState(false);
  const listThuoc = useSelector((state) => state.khothuoc.list);
  const [valueDate, setValueDate] = useState();
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
        dispatch(
          actHoaDonHoaDonDaHoanTat.actUpdateHoaDonDaHoanTatRequest(value)
        );
        capNhatLaiKhoThuocSauKhiBan(value);
      }
      cancel();
    }
  }

  const capNhatLaiKhoThuocSauKhiBan = (value) => {
    value &&
      Array.isArray(value.sanPham) &&
      value.sanPham.length > 0 &&
      value.sanPham.map((item, index) => {
        let soLuongDaBanSauKhiTinhToan = 0;
        if (item.soLuongMua2 > item.soLuongMuaBanDau) {
          soLuongDaBanSauKhiTinhToan =
            item.soLuongDaBan + (item.soLuongMua2 - item.soLuongMuaBanDau);
        } else if (item.soLuongMua2 < item.soLuongMuaBanDau) {
          soLuongDaBanSauKhiTinhToan =
            item.soLuongDaBan + (item.soLuongMua2 - item.soLuongMuaBanDau);
        } else if ((item.soLuongMua2 = item.soLuongMuaBanDau)) {
          soLuongDaBanSauKhiTinhToan = item.soLuongMua2;
        }
        if (item.soLuongMuaBanDau == undefined) {
          soLuongDaBanSauKhiTinhToan = item.soLuongDaBan + item.soLuongMua;
        }
        if (item.id) {
          item = {
            id: item.id ? item.idThuoc : "",
            tenThuoc: item.tenThuoc,
            ma: item.ma,
            donViTinh: item.donViTinh,
            tongTienTruocThue: parseFloat(item.tongTienTruocThue),
            phanTramThue: item.phanTramThue,
            chietKhau: item.chietKhau,
            giaTien: parseFloat(item.giaTien),
            thanhToan: item.thanhToan,
            soLuongNhap: item.soLuongNhap,
            ngayNhapThuoc: item.ngayNhapThuoc,
            nhaCungCapId: item.nhaCungCapId ? item.nhaCungCapId : "",
            ngayTaoBanGhi: item.ngayTaoBanGhi ? item.ngayTaoBanGhi : "",
            soLuongDaBan: soLuongDaBanSauKhiTinhToan,
            soLuongMua: item.soLuongMua2,
            hanSuDungThuoc: item.hanSuDungThuoc,
            // fileDinhKem: item.fileDinhKem ? item.fileDinhKem : "",
            nguoiTaoId: item.nguoiTaoId ? item.nguoiTaoId : "",
            khuVuc: item.khuVuc,
            phanLoaiThuoc: item.phanLoaiThuoc,
          };
          dispatch(actNhapKho.actUpdateThuocRequest(item));
        } else {
          let itemDetailThuoc = listThuoc.filter(
            (itemThuoc) => itemThuoc.id === item.idThuoc
          )[0];
          item = {
            id: itemDetailThuoc.id,
            tenThuoc: itemDetailThuoc.tenThuoc,
            ma: itemDetailThuoc.ma,
            donViTinh: itemDetailThuoc.donViTinh,
            tongTienTruocThue: parseFloat(itemDetailThuoc.tongTienTruocThue),
            phanTramThue: itemDetailThuoc.phanTramThue,
            chietKhau: itemDetailThuoc.chietKhau,
            giaTien: parseFloat(itemDetailThuoc.giaTien),
            thanhToan: itemDetailThuoc.thanhToan,
            soLuongNhap: itemDetailThuoc.soLuongNhap,
            ngayNhapThuoc: itemDetailThuoc.ngayNhapThuoc,
            nhaCungCapId: itemDetailThuoc.nhaCungCapId
              ? itemDetailThuoc.nhaCungCapId
              : "",
            ngayTaoBanGhi: itemDetailThuoc.ngayTaoBanGhi
              ? itemDetailThuoc.ngayTaoBanGhi
              : "",
            soLuongDaBan: soLuongDaBanSauKhiTinhToan,
            soLuongMua: item.soLuongMua,
            hanSuDungThuoc: itemDetailThuoc.hanSuDungThuoc,
            // fileDinhKem: item.fileDinhKem ? item.fileDinhKem : "",
            nguoiTaoId: itemDetailThuoc.thongTinNguoiTao.id,
            khuVuc: itemDetailThuoc.khuVuc,
            phanLoaiThuoc: itemDetailThuoc.phanLoaiThuoc,
          };
          dispatch(actNhapKho.actUpdateThuocRequest(item));
        }
      });
  };

  function onDelete(id) {
    // dataListBanHang.map((item, index) => {
    //   if (item.id === id) {
    //     item = {
    //       ...item,
    //       ngayXoaBanGhi: moment().format("DD/MM/yyyy HH:mm:ss "),
    //       flag: false,
    //     };
    //     dispatch(actBanHang.actUpdateSetFlagRequest(item));
    //   }
    // });
    // dispatch(actBanHang.actDeleteBanHang(id));
  }
  function onEdit(id) {
    dispatch(actHoaDonHoaDonDaHoanTat.actGetHoaDonDaHoanTatByIdRequest(id));
    setCheckEdit(true);
    setIsVisible(true);
    setCheckDanhSach(true);
  }

  const onCancel = () => {
    setIsVisible(false);
  };

  function resetForm() {
    dispatch(actBanHang.actGetBanHangById(null));
  }

  const handdleBack = () => {
    setCheckDanhSach(false);
  };
  useEffect(() => {
    dispatch(actHoaDonHoaDonDaHoanTat.actFetchHoaDonDaHoanTatRequest());
  }, []);
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
            <HoaDon
              onEdit={onEdit}
              valueDate={valueDate}
              setValueDate={setValueDate}
            />

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
