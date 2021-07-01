import { combineReducers } from "redux";
import khothuoc from "./quanlykho";
import quanlytaikhoan from "./quanlytaikhoan";
import quanlylogin from "./quanlylogin";
import quanlythongbao from "./quanlythongbao";
import quanly_cmnd from "./quanly_cmnd";
import quanlynhacungcap from "./quanlynhacungcap";
import quanlybanhang from "./quanlybanhang";
import quanly_hoadon from "./quanly_hoadon";
import quanly_files from "./quanlyfiles";
import quanlythongtinkhachhang from "./quanlythongtinkhachhang";

const appReducers = combineReducers({
  khothuoc,
  quanlytaikhoan,
  quanlylogin,
  quanlythongbao,
  quanly_cmnd,
  quanlynhacungcap,
  quanlybanhang,
  quanly_hoadon,
  quanly_files,
  quanlythongtinkhachhang,
});

export default appReducers;
