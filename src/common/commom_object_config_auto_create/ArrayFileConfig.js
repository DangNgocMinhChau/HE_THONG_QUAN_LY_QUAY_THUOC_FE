import { configDanhMucLoaiThuoc } from "../../pages/autoCreateDanhMuc/config/configDanhMucLoaiThuoc.ts";
import { configDanhMucPhanQuyenUser } from "../../pages/autoCreateDanhMuc/config/configDanhMucPhanQuyenUser.ts";
import { configDanhMucKhuVucDeThuoc } from "../../pages/autoCreateDanhMuc/config/configDanhMucKhuVucDeThuoc.ts";
import { configDanhMucNhaCungCap } from "../../pages/autoCreateDanhMuc/config/configDanhMucNhaCungCap.ts";
import { configDanhMucTagBaiViet } from "../../pages/autoCreateDanhMuc/config/configDanhMucTagBaiViet";
import { configTaoBaiViet } from "../../pages/autoCreateDanhMuc/config/configTaoBaiViet";
import { configQuanLyUser } from "../../pages/autoCreateDanhMuc/config/configQuanLyUser";

export const arrayFileConfig = [
  configDanhMucPhanQuyenUser(),
  configDanhMucLoaiThuoc(),
  configDanhMucKhuVucDeThuoc(),
  configDanhMucNhaCungCap(),
  configDanhMucTagBaiViet(),
  configTaoBaiViet(),
  configQuanLyUser(),
];
