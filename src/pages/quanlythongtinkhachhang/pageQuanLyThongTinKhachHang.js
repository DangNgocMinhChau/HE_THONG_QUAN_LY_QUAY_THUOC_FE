import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Button, Tooltip } from "antd";
import * as actQuanLyThongTinKhachHang from "../../actions/quanlythongtinkhachhang/actQuanLyThongTinKhachHang";
import * as actQuanLyBanHangThanhCong from "../../actions/quanly_hoadon_ban_thanhcong/actQuanLyHoaDonBanThanhCong";
import TableThongTinKhachHang from "../../components/quanlythongtinkhachhang/tableThongTinKhachHang";
import FormThongTinKhachHang from "../../components/quanlythongtinkhachhang/formThongTinKhachHang";
import HoaDonTheoKhachHang from "../../components/quanlythongtinkhachhang/hoaDonTheoKhachHang";
import { renderDateTheoHeThong } from "./../../common/convert/renderConvert";

function PageQuanLyThongTinKhachHang({ match, location }) {
  const [checkFormThemMoi, setCheckFormThemMoi] = useState(false);
  const [checkDanhSach, setCheckDanhSach] = useState(true);
  const [checkEdit, setCheckEdit] = useState(false);
  const [
    checkShowDanhSachHoaDonTheoKhachHang,
    setCheckShowDanhSachHoaDonTheoKhachHang,
  ] = useState(false);
  const [idXoa, setIdXoa] = useState([]);
  const { dataListThongTinKhachHang } = useSelector(
    (state) => ({
      dataListThongTinKhachHang: state.quanlythongtinkhachhang.list,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  function cancel() {
    setCheckDanhSach(true);
    setCheckFormThemMoi(false);
    setCheckShowDanhSachHoaDonTheoKhachHang(false);
  }

  function onSave(value) {
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
        ngayTaoBanGhi: renderDateTheoHeThong(),
      };
      dispatch(
        actQuanLyThongTinKhachHang.actCreateThongTinKhachHangRequest(value)
      );
    }
    cancel();
  }

  const onDelete = (id) => {
    dataListThongTinKhachHang.map((item, index) => {
      if (item.id === id) {
        item = {
          ...item,
          ngayXoaBanGhi: renderDateTheoHeThong(),
          flag: false,
        };
        dispatch(actQuanLyThongTinKhachHang.actUpdateSetFlagRequest(item));
      }
    });
    dispatch(actQuanLyThongTinKhachHang.actDeleteThongTinKhachHang(id));
  };

  function onEdit(id) {
    dispatch(actQuanLyThongTinKhachHang.actGetThongTinKhachHangByIdRequest(id));
    setCheckFormThemMoi(true);
    setCheckDanhSach(false);
    setCheckEdit(true);
  }

  function resetForm() {
    dispatch(actQuanLyThongTinKhachHang.actGetThongTinKhachHangById(null));
  }

  function openForm() {
    resetForm();
    setCheckFormThemMoi(true);
    setCheckDanhSach(false);
    setCheckEdit(false);
  }

  const handdleXoaNhieu = () => {
    idXoa.map((itemId, indexId) => {
      dataListThongTinKhachHang.map((item, index) => {
        if (item.id === itemId) {
          item = {
            ...item,
            ngayXoaBanGhi: renderDateTheoHeThong(),
            flag: false,
          };
          dispatch(actQuanLyThongTinKhachHang.actUpdateSetFlagRequest(item));
        }
      });
      dispatch(actQuanLyThongTinKhachHang.actDeleteThongTinKhachHang(itemId));
    });
  };

  const onHandleHoaDonCuaKhachHang = (value) => {
    dispatch(
      actQuanLyBanHangThanhCong.actGetHoaDonTheoKhachHangRequest(value.id)
    );
    setCheckShowDanhSachHoaDonTheoKhachHang(true);
    setCheckDanhSach(false);
  };

  useEffect(() => {
    dispatch(actQuanLyThongTinKhachHang.actFetchThongTinKhachHangRequest());
  }, []);

  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h5 className=" mb-0 text-gray-800">Thông tin khách hàng</h5>
        <div className="row">
          <Button
            size="small"
            className="m-2"
            onClick={() => {
              openForm();
            }}
            type="dashed"
          >
            <i class="fa fa-plus-square" aria-hidden="true"></i>
          </Button>

          <Tooltip placement="bottom" title="Xoá nhiều" color="red" key="red">
            <Button
              className="m-2 mr-5 "
              size="small"
              onClick={() => {
                handdleXoaNhieu();
              }}
              type="dashed"
              danger={true}
            >
              <i
                class="fa fa-trash-o"
                style={{ color: "red" }}
                aria-hidden="true"
              ></i>
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="row">
        {/* <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold ">
                Danh sách thông tin khách hàng
              </h6>
              {checkShowDanhSachHoaDonTheoKhachHang && (
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
              )}
            </div>
            {checkFormThemMoi && (
              <FormThongTinKhachHang
                onSave={onSave}
                cancel={cancel}
                checkEdit={checkEdit}
              />
            )}
            {checkDanhSach && (
              <TableThongTinKhachHang
                data={dataListThongTinKhachHang}
                match={match}
                onDelete={onDelete}
                onEdit={onEdit}
                setIdXoa={setIdXoa}
                onHandleHoaDonCuaKhachHang={onHandleHoaDonCuaKhachHang}
              />
            )}
            {checkShowDanhSachHoaDonTheoKhachHang && <HoaDonTheoKhachHang />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageQuanLyThongTinKhachHang;
