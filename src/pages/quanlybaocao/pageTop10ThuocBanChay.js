import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import DarbordTop10ThuocBanChay from "../../components/quanlybaocao/darbordTop10ThuocBanChay";
import * as actKhoThuoc from "./../../actions/quanlykho/actQuanLyKho";

export default function PageTop10ThuocBanChay({}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actKhoThuoc.actFetchTop10ThuocBanChayRequest());
  }, []);
  return (
    <div>
      <DarbordTop10ThuocBanChay />
    </div>
  );
}
