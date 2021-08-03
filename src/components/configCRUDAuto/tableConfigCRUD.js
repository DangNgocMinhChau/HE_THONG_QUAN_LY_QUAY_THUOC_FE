import React, { useState } from "react";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import * as Message from "../../constants/Message";
import CommonTable from "../../common/commonTable";

export default function TableConfigCRUD({
  match,
  onDelete,
  onEdit,
  setIdXoa,
  propsDefineObject,
  data,
}) {
  const renderConfig = (data, record, itemTable) => {
    return (
      <a onClick={() => alert(record[itemTable.dataField])}>
        {record[itemTable.dataField]}
      </a>
    );
  };
  const renderTable = () => {
    const columns = [
      {
        title: "Chức năng",
        dataIndex: "action",
        fixed: "right",
        width: 150,
        render: (data, record) => actionRender(record),
      },
    ];

    propsDefineObject.defineObjectFormProps.map((itemTable, indexTable) => {
      if (itemTable.isShow) {
        if (itemTable.render) {
          columns.unshift({
            title: itemTable.text,
            width: itemTable.width,
            dataIndex: itemTable.dataField,
            render: (data, record) =>
              itemTable.render && renderConfig(data, record, itemTable),
          });
        } else {
          columns.unshift({
            title: itemTable.text,
            width: itemTable.width,
            dataIndex: itemTable.dataField,
          });
        }
      }
    });
    columns.unshift({
      title: "STT",
      width: 60,
      render: (data, record, index) => <span>{index + 1}</span>,
    });
    return columns;
  };

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
  return (
    <div>
      <CommonTable
        columns={renderTable()}
        dataSource={data}
        setIdXoa={setIdXoa}
      />
    </div>
  );
}
