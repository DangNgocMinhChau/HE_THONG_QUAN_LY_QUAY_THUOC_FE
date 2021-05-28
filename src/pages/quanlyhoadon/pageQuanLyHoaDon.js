import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actBanHang from "../../actions/quanlybanhang/actQuanLyBanHang";
import * as actNhapKho from "../../actions/quanlykho/actQuanLyKho";
import * as actHoaDonHoaDonDaHoanTat from "../../actions/quanly_hoadon_ban_thanhcong/actQuanLyHoaDonBanThanhCong";
import { renderDateTheoHeThong } from "../../common/convert/renderConvert";
import HoaDon from "../../components/quanlyhoadon/hoaDon";
import ModalDieuChinhHoaDon from "./../../components/quanlyhoadon/modalDieuChinhHoaDon";
import CalendarHoaDon from "../../components/quanlyhoadon/calendarHoaDon";
function PageQuanLyHoaDon({ match, location }) {
  const [checkFormThemMoi, setCheckFormThemMoi] = useState(false);
  const [checkDanhSach, setCheckDanhSach] = useState(false);
  const listThuoc = useSelector((state) => state.khothuoc.list);
  const [valueDate, setValueDate] = useState();
  const [checkEdit, setCheckEdit] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  function cancel() {
    setCheckDanhSach(true);
    setCheckFormThemMoi(false);
    setIsVisible(false);
  }
  function onSave(value) {
    if (value.id) {
      let sanPham = [];
      let totalTien = 0;
      value.sanPham.map((item, index) => {
        // if (item.tenThuoc) {
        //   sanPham.push(item);
        //   console.log("vaoday");
        // } else {
        if (
          Array.isArray(
            listThuoc.filter((itemThuoc) => itemThuoc.id === item.idThuoc)
          ) &&
          listThuoc.filter((itemThuoc) => itemThuoc.id === item.idThuoc)
            .length >= 1 &&
          listThuoc.filter((itemThuoc) => itemThuoc.id === item.idThuoc)
        ) {
          let sanPhamItem = {
            ...listThuoc.filter(
              (itemThuoc) => itemThuoc.id === item.idThuoc
            )[0],
            soLuongMua2: item.soLuongMua2,
            soLuongMua: item.soLuongMua2,
            soLuongMuaBanDau: item.soLuongMua,
            idThuoc: item.id,
          };
          sanPham.push(sanPhamItem);
        }
      });
      sanPham.map((item, index) => {
        totalTien += item.giaTien * item.soLuongMua;
      });
      value = {
        ...value,
        sanPham: sanPham,
        tongTien: totalTien,
        ngayChinhSua: renderDateTheoHeThong(),
      };
      dispatch(actHoaDonHoaDonDaHoanTat.actUpdateHoaDonDaHoanTatRequest(value));
      capNhatLaiKhoThuocSauKhiBan(value);
    }
    cancel();
  }

  const capNhatLaiKhoThuocSauKhiBan = (value) => {
    let soLuongDaBanSauKhiTinhToan = 0;
    value &&
      Array.isArray(value.sanPham) &&
      value.sanPham.length > 0 &&
      value.sanPham.map((item, index) => {
        if (item.soLuongMua2 > item.soLuongMuaBanDau) {
          soLuongDaBanSauKhiTinhToan =
            item.soLuongDaBan + (item.soLuongMua2 - item.soLuongMuaBanDau);
        } else if (item.soLuongMua2 < item.soLuongMuaBanDau) {
          soLuongDaBanSauKhiTinhToan =
            item.soLuongDaBan + (item.soLuongMua2 - item.soLuongMuaBanDau);
        }
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
          soLuongDaBan: soLuongDaBanSauKhiTinhToan,
          fileDinhKem: item.fileDinhKem ? item.fileDinhKem : "",
          thongTinNguoiTao: item.thongTinNguoiTao ? item.thongTinNguoiTao : "",
          khuVuc: item.khuVuc,
          phanLoaiThuoc: item.phanLoaiThuoc,
        };
        dispatch(actNhapKho.actUpdateThuocRequest(item));
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
      {/* <!-- Page Heading --> */}
      {/* <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h5 className=" mb-0 text-gray-800">Hoá đơn</h5>
        <Button
          type="primary"
          onClick={() => {
            openForm();
          }}
        >
          Lập hoá đơn
        </Button>
      </div> */}

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
            {checkDanhSach && <HoaDon onEdit={onEdit} valueDate={valueDate} />}

            <ModalDieuChinhHoaDon
              isVisible={isVisible}
              onCancel={onCancel}
              onSave={onSave}
              checkEdit={checkEdit}
            />
            {!checkDanhSach && (
              <div className="custom-calendar">
                <CalendarHoaDon
                  setCheckDanhSach={setCheckDanhSach}
                  setValueDate={setValueDate}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageQuanLyHoaDon;
