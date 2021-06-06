import React, { useEffect, useState } from "react";
import { Table, Divider, Radio, Popconfirm, message, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import * as Message from "../../constants/Message";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actQuanLyFiles from "../../actions/quanlyfiles/actQuanLyFiles";
function TableNhaCungCap({ match, data, onDelete, onEdit }) {
  const [selectionType, setSelectionType] = useState();
  const dataListFiles = useSelector((state) => state.quanly_files.list);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "STT",
      width: 50,
      dataIndex: "STT",
      render: (data, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Tên file",
      width: 250,
      dataIndex: "tenFile",
      render: (data, record) => <a href={record.url}>{record.name}</a>,
    },
    {
      title: "Type",
      dataIndex: "type",
      width: 200,
    },
    {
      title: "Size",
      dataIndex: "size",
      width: 200,
    },
    {
      // title: "Chức năng",
      dataIndex: "action",
      fixed: "right",
      width: 30,
      render: (data, record) => actionRender(record),
    },
  ];

  function confirm(id) {
    onDelete(id);
    // message.warning(Message.XOA_THANH_CONG);
  }

  function actionRender(record) {
    return (
      <>
        <div className="row">
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
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {},
  };

  useEffect(() => {
    dispatch(actQuanLyFiles.actFetchfilesRequest());
  }, []);

  return (
    <div>
      <Divider />
      <Table
        // rowSelection={{
        //   type: selectionType,
        //   ...rowSelection,
        // }}
        columns={columns}
        dataSource={dataListFiles}
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
