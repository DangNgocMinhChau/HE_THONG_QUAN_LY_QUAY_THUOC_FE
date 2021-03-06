import React, { useState } from "react";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import * as Message from "../../constants/Message";
import CommonTable from "../../common/commonTable";

function TableNhaCungCap({ match, data, onDelete, onEdit, setIdXoa }) {
  const columns = [
    {
      title: "Tên nhà cung cấp",
      width: 200,
      dataIndex: "tenNhaCungCap",
    },
    {
      title: "Địa chỉ nhà cung cấp",
      dataIndex: "diaChiNhaCungCap",
      width: 200,
    },
    {
      title: "Mã số thuế",
      dataIndex: "mstNhaCungCap",
      width: 200,
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoaiNhaCungCap",
      width: 200,
    },
    {
      title: "Zalo",
      dataIndex: "zalo",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      fixed: "right",
      width: 100,
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
    );
  }
  var url = match.url;
  return (
    <div>
      <CommonTable columns={columns} dataSource={data} setIdXoa={setIdXoa} />
    </div>
  );
}

export default TableNhaCungCap;
