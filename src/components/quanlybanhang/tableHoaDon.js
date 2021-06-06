import React from "react";
import { Table } from "antd";
import {
  renderConvertSoLuongTheoDonVi,
  renderTien,
} from "./../../common/convert/renderConvert";
function TableHoaDon({ dataHoaDon }) {
  const columns = [
    {
      title: "STT",
      dataIndex: "name",
      render: (data, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Sản phẩm",
      dataIndex: "tenThuoc",
    },
    {
      title: "Số lượng",
      dataIndex: "soLuongMua",
      render: (data, record) => (
        <span>
          {renderConvertSoLuongTheoDonVi(record.soLuongMua, record.donViTinh)}
        </span>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "giaTien",
      render: (data, record) => <span>{renderTien(record.giaTien)}</span>,
    },
    {
      title: "Tổng cộng",
      dataIndex: "address",
      render: (data, record) => renderTongTienThuoc(record),
    },
  ];

  const renderTongTienThuoc = (record) => {
    return <span> {renderTien(record.soLuongMua * record.giaTien)}</span>;
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataHoaDon}
        size="small"
        pagination={false}
      />
    </div>
  );
}

export default TableHoaDon;
