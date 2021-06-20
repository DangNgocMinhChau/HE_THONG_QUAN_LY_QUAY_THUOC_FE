import React, { useState } from "react";
import { Table, Divider, Radio, Popconfirm, message, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import * as Message from "../../constants/Message";

function TableThongTinKhachHang({
  match,
  data,
  onDelete,
  onEdit,
  setIdXoa,
  onHandleHoaDonCuaKhachHang,
}) {
  const [selectionType, setSelectionType] = useState();
  const columns = [
    {
      title: "STT",
      width: 20,
      render: (data, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Tên khách hàng",
      width: 200,
      dataIndex: "tenKhachHang",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      width: 200,
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      fixed: "right",
      width: 50,
      render: (data, record) => actionRender(record),
    },
  ];

  function renderDetail(record) {
    return (
      <NavLink to={`${url}/${record.id}`}>{record.thongTinNhaCungCap}</NavLink>
    );
  }

  function confirm(id) {
    onDelete(id);
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setIdXoa(selectedRowKeys);
    },
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
                  onEdit(record.id);
                }}
              ></i>
            </a>
          </div>

          <div className="col-md-2">
            <NavLink
              to={{
                pathname: `hoadontheokhachhang/${record.id}`,
                dataKhachHang: record,
              }}
            >
              <i
                className="fa fa-sticky-note-o"
                style={{ color: "gray", fontSize: "20px" }}
                // onClick={() => {
                //   onHandleHoaDonCuaKhachHang(record);
                // }}
              ></i>
            </NavLink>
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
  var url = match.url;
  return (
    <div>
      <Divider />
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: "calc(700px + 50%)", y: "100%" }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30", "40", "50", "60"],
        }}
      />
    </div>
  );
}

export default TableThongTinKhachHang;
