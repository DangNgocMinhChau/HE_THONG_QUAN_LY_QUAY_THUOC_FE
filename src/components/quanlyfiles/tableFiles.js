import React, { useEffect, useState } from "react";
import { Popconfirm, Tabs, Image } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import * as Message from "../../constants/Message";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actQuanLyFiles from "../../actions/quanlyfiles/actQuanLyFiles";
import CommonTable from "../../common/commonTable";

const { TabPane } = Tabs;

function TableNhaCungCap({ match, data, onDelete, onEdit, setIdXoa }) {
  const [checkType, setCheckType] = useState();
  const dataListFiles = useSelector((state) => state.quanly_files.list);
  const dispatch = useDispatch();
  let columns = [
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

  if (checkType == "img") {
    columns = [
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
        width: 100,
        render: (data, record) => renderImg(record),
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
  }

  function renderImg(record) {
    return <Image width={50} src={`/filedinhkem/${record.name}`} />;
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
              onConfirm={() => onDelete(record.id)}
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
    dispatch(actQuanLyFiles.actFetchfilesToTypeRequest("txt"));
  }, []);
  function callback(key) {
    setCheckType(key);
    dispatch(actQuanLyFiles.actFetchfilesToTypeRequest(key));
  }
  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="File Text" key="txt">
          <CommonTable
            columns={columns}
            dataSource={dataListFiles}
            setIdXoa={setIdXoa}
            checkRowSelection={false}
          />
        </TabPane>
        <TabPane tab="File ảnh" key="img">
          <CommonTable
            columns={columns}
            dataSource={dataListFiles}
            setIdXoa={setIdXoa}
            checkRowSelection={false}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default TableNhaCungCap;
