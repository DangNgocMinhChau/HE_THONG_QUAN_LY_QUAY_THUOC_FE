import React from "react";
import Home from "../components/Home";
import NotFound from "../pages/HomePage/404";
import PageNhapThuoc from "../pages/quanlykho/pageNhapThuoc";
import PageQuanLyTaiKhoan from "../pages/quanlytaikhoan/pageQuanLyTaiKhoan";
import PageQuanLyNhaCungCap from "../pages/quanlynhacungcap/pageQuanLyNhaCungCap";
import Login from "../pages/users/login";
import PageQuanLyBanHang from "../pages/quanlybanhang/pageQuanLyBanHang";
import PageQuanLyPhieuBanHang from "../pages/quanlyhoadon/phieubanhang/pageQuanLyPhieuBanHang";
import PageQuanLyFiles from "../pages/quanlyfile/pageQuanLyFiles";
import PageQuanLyBaoCao from "../pages/quanlybaocao/pageQuanLyBaoCao";
import PageQuanLyThongTinKhachHang from "../pages/quanlythongtinkhachhang/pageQuanLyThongTinKhachHang.js";
import PageQuanLyPhieuBanHangTheoKhachHang from "../pages/quanlythongtinkhachhang/pageQuanLyPhieuBanHangTheoKhachHang";
import PageDanhSachSanPham from "../pages/danhsachsanpham/pageDanhSachSanPham";
import PageQuanLyThungRacKhoThuoc from "../pages/quanlythungrac/thungrackhothuoc/pageQuanLyThungRacKhoThuoc";
import PageHoaDonNhapKhoGTGT from "../pages/quanlyhoadon/hoadonnhapkho/pageHoaDonNhapKhoGTGT";
import PageQuanLyThungRacHoaDonGTGT from "../pages/quanlythungrac/thungrachoadonGTGT/PageQuanLyThungRacHoaDonGTGT";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/khothuoc",
    exact: true,
    main: ({ match, location }) => (
      <PageNhapThuoc location={location} match={match} />
    ),
  },
  {
    path: "/quanlytaikhoan",
    exact: true,
    main: ({ match, location }) => (
      <PageQuanLyTaiKhoan location={location} match={match} />
    ),
  },

  {
    path: "/quanlynhacungcap",
    exact: true,
    main: ({ match, location }) => (
      <PageQuanLyNhaCungCap location={location} match={match} />
    ),
  },

  {
    path: "/login",
    exact: true,
    main: ({ match, location }) => <Login match={match} location={location} />,
  },

  {
    path: "/banhang",
    exact: true,
    main: ({ match, location }) => (
      <PageQuanLyBanHang location={location} match={match} />
    ),
  },

  {
    path: "/quanlyphieubanhang",
    exact: true,
    main: ({ match, location }) => (
      <PageQuanLyPhieuBanHang location={location} match={match} />
    ),
  },
  {
    path: "/hoadonnhaphang",
    exact: true,
    main: ({ match, location }) => (
      <PageHoaDonNhapKhoGTGT location={location} match={match} />
    ),
  },

  {
    path: "/files",
    exact: true,
    main: ({ match, location }) => (
      <PageQuanLyFiles location={location} match={match} />
    ),
  },
  {
    path: "/baocaotongquat",
    exact: true,
    main: ({ match, location }) => (
      <PageQuanLyBaoCao location={location} match={match} />
    ),
  },
  {
    path: "/quanlythongtinkhachhang",
    exact: true,
    main: ({ match, location }) => (
      <PageQuanLyThongTinKhachHang location={location} match={match} />
    ),
  },
  {
    path: "/danhsachsanpham",
    exact: true,
    main: ({ match, location, history }) => (
      <PageDanhSachSanPham
        location={location}
        match={match}
        history={history}
      />
    ),
  },
  {
    path: "/phieubanhangtheokhachhang/:id",
    exact: true,
    main: ({ match, location, history }) => (
      <PageQuanLyPhieuBanHangTheoKhachHang
        location={location}
        match={match}
        history={history}
      />
    ),
  },
  {
    path: "/thungrackhothuoc",
    exact: true,
    main: ({ match, location, history }) => (
      <PageQuanLyThungRacKhoThuoc
        location={location}
        match={match}
        history={history}
      />
    ),
  },
  {
    path: "/thungrachoadongtgt",
    exact: true,
    main: ({ match, location, history }) => (
      <PageQuanLyThungRacHoaDonGTGT
        location={location}
        match={match}
        history={history}
      />
    ),
  },

  {
    path: "",
    exact: true,
    main: () => <NotFound />,
  },
];

export default routes;
