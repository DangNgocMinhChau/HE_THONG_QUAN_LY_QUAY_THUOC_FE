import React, { useState } from "react";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import * as Message from "../../constants/Message";
import {
  renderTien,
  renderDate,
  renderConverLoaiThanhToan,
  renderConvertSoLuongTheoDonVi,
} from "./../../common/convert/renderConvert";
import CommonTable from "../../common/commonTable";

function TableNhaCungCap({
  match,
  data,
  onDelete,
  onEdit,
  setIdXoa,
  onThongBaoHetHang,
  deleteFiles,
  onDetail,
  onHandleQRCode,
}) {
  const columns = [
    {
      title: "STT",
      key: "STT",
      width: 100,
      fixed: "left",
      render: (data, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Tên thuốc",
      dataIndex: "tenThuoc",
      key: "tenThuoc",
      width: 200,
      fixed: "left",
      render: (data, record) => renderDetail(record),
    },
    {
      title: "Thành phần",
      children: [
        {
          title: "Phân loại",
          dataIndex: "phanLoaiThuoc",
          key: "phanLoaiThuoc",
          width: 200,
        },
        {
          title: "Số lượng",
          dataIndex: "donVitinh",
          key: "donVitinh",
          width: 200,
          children: [
            {
              title: "Hộp",
              dataIndex: "soLuongNhap",
              key: "soLuongNhap",
              width: 100,
              render: (data, record) =>
                record.donViTinh === "Hop" ? `${record.soLuongNhap} /h` : "",
            },

            {
              title: "Viên",
              dataIndex: "soLuongNhap",
              key: "soLuongNhap",
              width: 100,
              render: (data, record) =>
                record.donViTinh === "Vien" ? `${record.soLuongNhap} /v` : "",
            },
            {
              title: "Tuýp",
              dataIndex: "soLuongNhap",
              key: "soLuongNhap",
              width: 100,
              render: (data, record) =>
                record.donViTinh === "Tuyp" ? `${record.soLuongNhap} /t` : "",
            },
          ],
        },
        {
          title: "Vị trí trên tủ",
          dataIndex: "khuVuc",
          key: "khuVuc",
          width: 150,
        },
        {
          title: "Số lượng còn trong kho",
          dataIndex: "soLuongBanDau",
          key: "soLuongBanDau",
          width: 150,
          render: (data, record) =>
            renderConvertSoLuongTheoDonVi(
              record.soLuongNhap - record.soLuongDaBan,
              record.donViTinh
            ),
        },
        {
          title: "Tổng tiền trước thuế",
          dataIndex: "tongTienTruocThue",
          key: "tongTienTruocThue",
          width: 200,
          render: (data, record) => renderTien(record.tongTienTruocThue),
        },
        {
          title: "Thuê(%)",
          dataIndex: "phanTramThue",
          key: "phanTramThue",
          width: 200,
        },
        {
          title: "Chiết khấu",
          dataIndex: "chietKhau",
          key: "chietKhau",
          width: 200,
        },
        {
          title: "Giá(VNĐ)",
          dataIndex: "giaTien",
          key: "giaTien",
          width: 200,
          render: (data, record) => renderTien(record.giaTien),
        },
        {
          title: "Loại thanh toán",
          dataIndex: "thanhToan",
          key: "thanhToan",
          width: 200,
          render: (data, record) => renderConverLoaiThanhToan(record.thanhToan),
        },
        {
          title: "Ngày nhập",
          dataIndex: "ngayNhapThuoc",
          key: "ngayNhapThuoc",
          width: 200,
          render: (data, record) => renderDate(record),
        },
        {
          title: "Tình trạng",
          dataIndex: "ngayNhapThuoc",
          key: "ngayNhapThuoc",
          width: 200,
          render: (data, record) => renderTinhTrang(record),
        },
        {
          title: "File đính kèm",
          dataIndex: "filedinhkem",
          width: 300,
          render: (data, record) => renderLinkFile(record),
        },
      ],
    },

    {
      title: "Nhà cung cấp",
      children: [
        {
          title: "Tên nhà cung cấp",
          dataIndex: "tenNhaCungCap",
          key: "tenNhaCungCap",
          width: 200,
        },
      ],
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      fixed: "right",
      width: 120,
      render: (data, record) => actionRender(record),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setIdXoa(selectedRowKeys);
    },
  };

  function renderDetail(record) {
    return (
      <a style={{ color: "Highlight" }} onClick={() => onDetail(record.id)}>
        {record.tenThuoc}
      </a>
    );
  }

  function confirm(id) {
    onDelete(id);
  }

  const renderLinkFile = (record) => {
    return (
      record.fileDBArrayList &&
      Array.isArray(record.fileDBArrayList) &&
      record.fileDBArrayList.map((item, index) => (
        <>
          <a href={item.url} target="_blank">
            <i
              class="fa fa-paperclip"
              style={{ color: "black" }}
              aria-hidden="true"
            ></i>{" "}
            {item.name}
          </a>
          <br />
        </>
      ))
    );
  };

  const renderTinhTrang = (record) => {
    if (record.soLuongNhap - record.soLuongDaBan > 10) {
      return <p style={{ color: "green" }}> Còn hàng</p>;
    } else if (record.soLuongNhap - record.soLuongDaBan < 10) {
      onThongBaoHetHang(record);
      return <p style={{ color: "blue" }}>Sắp hết hàng</p>;
    } else if (record.soLuongNhap - record.soLuongDaBan === 0) {
      return <p style={{ color: "red" }}>Hết hàng</p>;
    }
  };

  function actionRender(record) {
    return (
      <>
        <div className="row">
          <div className="col-md-2">
            <a>
              <i
                className="fa fa-pencil-square-o"
                style={{ color: "green", fontSize: "20px" }}
                onClick={() => {
                  onEdit(record);
                }}
              ></i>
            </a>
          </div>
          <div className="col-md-2">
            <a>
              <i
                className="fa fa-qrcode"
                aria-hidden="true"
                style={{ color: "black", fontSize: "20px" }}
                onClick={() => {
                  onHandleQRCode(record);
                }}
              ></i>
            </a>
          </div>
          <div className="col-md-2">
            <Popconfirm
              placement="topRight"
              title={Message.BAN_CO_MUON_XOA}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => confirm(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <a>
                <i
                  className="fa fa-trash-o"
                  style={{ color: "red", fontSize: "20px" }}
                ></i>
              </a>
            </Popconfirm>
          </div>
        </div>
      </>
    );
  }
  return (
    <div>
      <CommonTable columns={columns} dataSource={data} setIdXoa={setIdXoa} />
    </div>
  );
}

export default TableNhaCungCap;
