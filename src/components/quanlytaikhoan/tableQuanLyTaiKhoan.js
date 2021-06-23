import React, { useState } from "react";
import { Table, Divider, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import * as Message from "../../constants/Message";
import { useSelector } from "react-redux";
import { renderDate } from "./../../common/convert/renderConvert";
import CommonTable from "../../common/commonTable";

function TableManagementHotel({
  match,
  data,
  onDelete,
  onEdit,
  onUnlock,
  onLock,
  setIdXoa,
  handdelShowDetail,
}) {
  const [selectionType, setSelectionType] = useState();
  const account_current = useSelector(
    (state) => state.quanlylogin.account_current
  );

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "tenNguoiDung",
      width: 150,
      fixed: "left",
      render: (data, record) => renderDetail(record),
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      render: (data, record) => renderDate(record),
    },
    {
      title: "Giới tính",
      width: 100,
      dataIndex: "gioiTinh",
    },
    {
      title: "Facebook",
      dataIndex: "facebook",
    },
    {
      title: "số điện thoại",
      dataIndex: "soDienThoai",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "tenDangNhap",
    },

    {
      title: "Mật Khẩu",
      dataIndex: "matKhau",
    },
    {
      title: "Mật Khẩu gốc",
      dataIndex: "matKhauGoc",
      render: (data, record) =>
        account_current.quyen === "QuanTri"
          ? actionRenderMKGoc(record)
          : "Không có quyền",
    },
    {
      title: "Trạng thái",
      dataIndex: "action",
      render: (data, record) => actionRenderLockUser(record),
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      fixed: "right",
      render: (data, record) => actionRender(record),
    },
  ];

  const actionRenderMKGoc = (record) => {
    if (record) {
      return <>{record.matKhauGoc}</>;
    }
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setIdXoa(selectedRowKeys);
    },
  };

  function renderDetail(record) {
    return (
      <a onClick={() => handdelShowDetail(record.id)}>{record.tenNguoiDung}</a>
    );
  }

  function onDeleteRequest(id) {
    onDelete(id);
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
              onConfirm={() => onDeleteRequest(record.id)}
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

  function actionRenderLockUser(record) {
    return (
      <>
        {record.lockUser === true ? (
          <div className="row">
            <div className="col-md-2">
              <Popconfirm
                placement="topRight"
                title={Message.BAN_CO_MUON_MO_KHOA}
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => onUnlock(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <a>
                  <i
                    className="fa fa-lock"
                    style={{ color: "gray", fontSize: "20px" }}
                  ></i>
                </a>
              </Popconfirm>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-2">
              <Popconfirm
                placement="topRight"
                title={Message.BAN_CO_MUON_MO_KHOA}
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => onLock(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <a>
                  <i
                    className="fa fa-unlock-alt"
                    style={{ color: "gray", fontSize: "20px" }}
                  ></i>
                </a>
              </Popconfirm>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div>
      <br></br>
      <CommonTable columns={columns} dataSource={data} setIdXoa={setIdXoa} />
    </div>
  );
}

export default TableManagementHotel;
