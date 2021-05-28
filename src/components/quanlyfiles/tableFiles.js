import React, { useState } from "react";
import { Table, Divider, Radio, Popconfirm, message, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import * as Message from "../../constants/Message";

function TableNhaCungCap({ match, data, onDelete, onEdit }) {
  const [selectionType, setSelectionType] = useState();
  const columns = [
    {
      title: "File của ",
      width: 200,
      dataIndex: "tenThuoc",
    },
    {
      title: "Tên file",
      width: 200,
      dataIndex: "tenFile",
      render: (data, record) =>
        record &&
        record.fileDinhKem &&
        Array.isArray(record.fileDinhKem) &&
        record.fileDinhKem.map((item) => <div>{item.tenFile}</div>),
    },
    {
      title: "Link",
      dataIndex: "urlfiles",
      width: 200,
      render: (data, record) => renderLinkFile(record),
    },
    // {
    //   title: "Chức năng",
    //   dataIndex: "action",
    //   fixed: "right",
    //   width: 100,
    //   render: (data, record) => actionRender(record),
    // },
  ];

  const renderLinkFile = (record) => {
    if (record && record.fileDinhKem && Array.isArray(record.fileDinhKem)) {
      return record.fileDinhKem.map((item) => (
        <>
          <a href={item.urlfiles} target="_blank">
            <i
              class="fa fa-paperclip"
              style={{ color: "black" }}
              aria-hidden="true"
            ></i>{" "}
            {item.urlfiles}
          </a>
          <br />
        </>
      ));
    }
  };

  function renderDetail(record) {
    return (
      <NavLink to={`${url}/${record.id}`}>{record.thongTinNhaCungCap}</NavLink>
    );
  }

  function confirm(id) {
    onDelete(id);
    message.warning(Message.XOA_THANH_CONG);
  }

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
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {},
  };
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
        scroll={{ x: "calc(700px + 50%)", y: 240 }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      />
    </div>
  );
}

export default TableNhaCungCap;
