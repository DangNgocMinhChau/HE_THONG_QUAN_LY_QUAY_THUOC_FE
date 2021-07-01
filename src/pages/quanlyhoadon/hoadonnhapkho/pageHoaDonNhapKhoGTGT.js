import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import FormNhapHoaDonGTGT from "../../../components/quanlyhoadon/hoadonnhapkho/formNhapHoaDonGTGT";
import HoaDonGTGT from "../../../components/quanlyhoadon/hoadonnhapkho/hoaDonGTGT";
import * as actHoaDonGTGT from "../../../actions/quanly_hoadon/actHoaDonGTGT";
import { renderDateTheoHeThong } from "../../../common/convert/renderConvert";

export default function PageHoaDonNhapKhoGTGT({ match, location, history }) {
  const dispatch = useDispatch();
  const account_current = useSelector(
    (state) => state.quanlylogin.account_current
  );

  const listDanhSacHoaDonGTGT = useSelector(
    (state) => state.quanly_hoadon.hoadon_gtgt.list
  );

  const itemHoaDonGTGT = useSelector(
    (state) => state.quanly_hoadon.hoadon_gtgt.item
  );

  const [showDanhSach, setShowDanhSach] = useState(false);
  const [showFormNhap, setShowFormNhap] = useState(true);
  const [checkFormEdit, setCheckFormEdit] = useState(false);

  const onSave = (value) => {
    if (value.id) {
      let hangHoa = [];
      value.hangHoa.map((item, index) => {
        if (item.id) {
          item = { ...item };
          hangHoa.push(item);
        } else {
          item = { ...item, id: null };
          hangHoa.push(item);
        }
      });
      value = {
        ...value,
        ngayChinhSua: renderDateTheoHeThong(),
        hangHoa: hangHoa,
        nguoiTaoId: account_current.id,
      };
      dispatch(actHoaDonGTGT.actUpdateHoaDonGTGTRequest(value));
      setCheckFormEdit(false);
    } else {
      value = {
        ...value,
        ngayHoaDon: value.ngayHoaDon.format(),
        ngayKy: value.ngayKy.format(),
        nguoiTaoId: account_current.id,
      };
      dispatch(actHoaDonGTGT.actCreateHoaDonGTGTRequest(value));
    }
  };

  const openDanhSach = () => {
    setShowDanhSach(true);
    setShowFormNhap(false);
  };

  const handleBack = () => {
    setShowDanhSach(false);
    setShowFormNhap(true);
    setCheckFormEdit(false);
  };

  const handleBackForm = () => {
    setShowDanhSach(true);
    setShowFormNhap(false);
    setCheckFormEdit(false);
  };

  const handleEdit = (id) => {
    setCheckFormEdit(true);
    dispatch(actHoaDonGTGT.actGetHoaDonGTGTByIdRequest(id));
  };

  const handleDelete = (id) => {
    setCheckFormEdit(true);
    dispatch(actHoaDonGTGT.actDeleteHoaDonGTGTRequest(id));
  };
  return (
    <div className="container-fluid ">
      <div className="row">
        {/* <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow ">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between ">
              <h6 className="m-0 font-weight-bold">Hóa đơn GTGT</h6>
              {showFormNhap && (
                <a
                  onClick={() => openDanhSach()}
                  className="m-0 font-weight-bold "
                >
                  Danh sách
                </a>
              )}

              {showDanhSach && (
                <>
                  <a
                    onClick={() => handleBack()}
                    className="m-0 font-weight-bold "
                  >
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                  </a>
                </>
              )}
            </div>
            {showDanhSach && (
              <HoaDonGTGT
                listDanhSacHoaDonGTGT={listDanhSacHoaDonGTGT}
                checkFormEdit={checkFormEdit}
                handleEdit={handleEdit}
                handleBackForm={handleBackForm}
                onSave={onSave}
                setCheckFormEdit={setCheckFormEdit}
                handleDelete={handleDelete}
              />
            )}
            {showFormNhap && (
              <FormNhapHoaDonGTGT
                onSave={onSave}
                itemHoaDonGTGT={itemHoaDonGTGT}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
