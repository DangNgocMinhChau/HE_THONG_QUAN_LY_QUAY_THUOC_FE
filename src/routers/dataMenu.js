import { arrayFileConfig } from "./../common/commom_object_config_auto_create/ArrayFileConfig";

const renderRouterDanhMuc = () => {
  const listData = [];
  arrayFileConfig.map((item, index) => {
    if (!item.routerDynamic) {
      listData.push({
        name: item.name,
        to: `/quanly${item.linkUrl}`,
        exact: true,
      });
    }
  });
  return listData;
};

export const menusListQuanTri = [
  {
    name: "Hệ thống",
    type: "Menu",
    children: [
      {
        name: "Quản lý tài khoản",
        children: [
          {
            name: "Tài khoản",
            to: "/quanly/quanlytaikhoan",
            exact: true,
          },
          {
            name: "Phân quyền",
            to: "/quanly/danhmuc/phanquyen",
            exact: true,
          },
        ],
      },
      {
        name: "Quản lý kho",
        children: [
          {
            name: "Kho thuốc",
            to: "/quanly/khothuoc",
            exact: true,
          },
        ],
      },
      {
        name: "Quản lý thông tin khách hàng",
        children: [
          {
            name: "Thông tin khách hàng",
            to: "/quanly/quanlythongtinkhachhang",
            exact: true,
          },
        ],
      },
      {
        name: "Quản lý hoá đơn",
        children: [
          {
            name: "Phiếu bán hàng",
            to: "/quanly/quanlyphieubanhang",
            exact: true,
          },
          {
            name: "Hoá đơn nhập hàng",
            to: "/quanly/hoadonnhaphang",
            exact: true,
          },
        ],
      },
      {
        name: "Quản lý File",
        children: [
          {
            name: "File",
            to: "/quanly/files",
            exact: true,
          },
        ],
      },
    ],
  },

  {
    name: "Tạo phiếu bán hàng",
    to: "/quanly/banhang",
    exact: true,
  },
  {
    name: "Danh sách sản phẩm",
    to: "/quanly/danhsachsanpham",
    exact: true,
  },

  {
    name: "Báo cáo tổng quát",
    to: "/quanly/baocaotongquat",
    exact: true,
    children: [
      {
        name: "Top 10 thuốc bán chạy",
        to: "/quanly/topthuocbanchay",
        exact: true,
      },
    ],
  },
  {
    name: "Xem dánh sách",
    to: "/quanly/xemdanhsach",
    exact: true,
  },
  {
    name: "Bài viết tin tức",
    to: "/quanly/taobaiviet",
    exact: true,
  },

  {
    name: "Mục lục",
    to: "/quanly/mucluc",
    exact: true,
  },
  {
    name: "Thùng rác",
    to: "/quanly/thungrac",
    exact: true,
    children: [
      {
        name: "Kho thuốc",
        to: "/quanly/thungrackhothuoc",
        exact: true,
      },
      {
        name: "Hóa đơn GTGT",
        to: "/quanly/thungrachoadongtgt",
        exact: true,
      },
    ],
  },
  {
    name: "Danh mục",
    to: "mucluc",
    exact: true,
    children: renderRouterDanhMuc(),
  },
];

export const menusListUser = [
  {
    name: "Hệ thống",
    type: "Menu",
    children: [
      {
        name: "Quản lý kho",
        children: [
          {
            name: "Kho thuốc",
            to: "/khothuoc",
            exact: true,
          },
        ],
      },
      {
        name: "Quản lý nhà cung cấp",
        children: [
          {
            name: "Nhà cung cấp",
            to: "/quanlynhacungcap",
            exact: true,
          },
        ],
      },
      {
        name: "Quản lý thông tin khách hàng",
        children: [
          {
            name: "Thông tin khách hàng",
            to: "/quanlythongtinkhachhang",
            exact: true,
          },
        ],
      },
      {
        name: "Quản lý hoá đơn",
        children: [
          {
            name: "Phiếu bán hàng",
            to: "/quanlyphieubanhang",
            exact: true,
          },
        ],
      },
      {
        name: "Quản lý File",
        children: [
          {
            name: "File",
            to: "/files",
            exact: true,
          },
        ],
      },
    ],
  },
  {
    name: "Tạo phiếu bán hàng",
    to: "/banhang",
    exact: true,
  },

  {
    name: "Báo cáo tổng quát",
    to: "/baocaotongquat",
    exact: true,
  },
  {
    name: "Xem dánh sách",
    to: "/xemdanhsach",
    exact: true,
  },
  {
    name: "Mục lục",
    to: "/mucluc",
    exact: true,
  },
];
