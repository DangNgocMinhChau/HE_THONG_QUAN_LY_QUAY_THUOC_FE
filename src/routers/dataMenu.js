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
            to: "/quanlytaikhoan",
            exact: true,
          },
        ],
      },
      {
        name: "Quản lý nhà thuốc",
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
            name: "Hoá đơn",
            to: "/quanlyhoadon",
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
    name: "Danh sách sản phẩm",
    to: "/danhsachsanpham",
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
  {
    name: "Thùng rác",
    to: "/thungrac",
    exact: true,
    children: [
      {
        name: "Kho thuốc",
        to: "/thungrackhothuoc",
        exact: true,
      },
    ],
  },
];

export const menusListUser = [
  {
    name: "Hệ thống",
    type: "Menu",
    children: [
      {
        name: "Quản lý nhà thuốc",
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
            name: "Hoá đơn",
            to: "/quanlyhoadon",
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
