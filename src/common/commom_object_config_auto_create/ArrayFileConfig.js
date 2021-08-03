import { configDanhMucLoaiThuoc } from "../../pages/autoCreateDanhMuc/config/configDanhMucLoaiThuoc.ts";
import { configDanhMucPhanQuyenUser } from "../../pages/autoCreateDanhMuc/config/configDanhMucPhanQuyenUser.ts";
import { configDanhMucKhuVucDeThuoc } from "../../pages/autoCreateDanhMuc/config/configDanhMucKhuVucDeThuoc.ts";
import { configDanhMucNhaCungCap } from "../../pages/autoCreateDanhMuc/config/configDanhMucNhaCungCap.ts";

export const arrayFileConfig = [
  configDanhMucPhanQuyenUser(),
  configDanhMucLoaiThuoc(),
  configDanhMucKhuVucDeThuoc(),
  configDanhMucNhaCungCap(),
];
