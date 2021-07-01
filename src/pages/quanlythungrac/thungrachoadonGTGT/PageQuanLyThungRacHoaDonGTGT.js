import React, { useEffect } from "react";
import HoaDonGTGT from "../../../components/quanlythungrac/thungrachoadon/thungrachoadongtgt/hoaDonGTGT";
import * as actHoaDonGTGT from "../../../actions/quanly_hoadon/actHoaDonGTGT";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

function PageQuanLyThungRacHoaDonGTGT({ match, location, history }) {
  const dispatch = useDispatch();

  const listDanhSacHoaDonGTGT = useSelector(
    (state) => state.quanly_hoadon.hoadon_gtgt.list
  );

  useEffect(() => {
    dispatch(actHoaDonGTGT.actFetchHoaDonGTGTDaXoaRequest());
  }, []);

  const handleRecovery = (id) => {
    dispatch(actHoaDonGTGT.actRecoveryHanghoaTrongHoaDonGTGTRequest(id));
  };
  return (
    <>
      <HoaDonGTGT
        listDanhSacHoaDonGTGT={listDanhSacHoaDonGTGT}
        handleRecovery={handleRecovery}
      />
    </>
  );
}

export default PageQuanLyThungRacHoaDonGTGT;
