import React from "react";
import Home from "../components/Home";
import NotFound from "../pages/HomePage/404";
import PageNhapThuoc from "../pages/quanlykho/pageNhapThuoc";
import PageQuanLyTaiKhoan from "../pages/quanlytaikhoan/pageQuanLyTaiKhoan";
import PageQuanLyNhaCungCap from "../pages/quanlynhacungcap/pageQuanLyNhaCungCap";
import Login from "../pages/users/login";
import PageQuanLyBanHang from "../pages/quanlybanhang/pageQuanLyBanHang";
import PageQuanLyHoaDon from "../pages/quanlyhoadon/pageQuanLyHoaDon";
import PageQuanLyFiles from "../pages/quanlyfile/pageQuanLyFiles";
import PageQuanLyBaoCao from "../pages/quanlybaocao/pageQuanLyBaoCao";
import PageQuanLyThongTinKhachHang from "../pages/quanlythongtinkhachhang/pageQuanLyThongTinKhachHang.js";
import PageQuanLyHoaDonTheoKhachHang from "../pages/quanlythongtinkhachhang/pageQuanLyHoaDonTheoKhachHang";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/nhapthuoc",
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
    path: "/quanlyhoadon",
    exact: true,
    main: ({ match, location }) => (
      <PageQuanLyHoaDon location={location} match={match} />
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
    path: "/hoadontheokhachhang/:id",
    exact: true,
    main: ({ match, location, history }) => (
      <PageQuanLyHoaDonTheoKhachHang
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
