import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import DanhSachSanPhamBanHang from "../../components/danhsachsanpham/danhSachSanPhamBanHang";
import * as actKhoThuoc from "./../../actions/quanlykho/actQuanLyKho";

export default function PageDanhSachSanPham({ history }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actKhoThuoc.actFetchKhoThuocRequest());
  }, []);

  return (
    <>
      <DanhSachSanPhamBanHang history={history} />
    </>
  );
}
