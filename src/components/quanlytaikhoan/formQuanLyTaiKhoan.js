import React, { useState } from "react";
import { Form, Divider } from "antd";
import { Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { thongBao } from "./../../common/renderThongBao/renderThongBaoCommon";
import * as message from "./../../constants/Message";
import * as noiDungThongBao from "./../../constants/noiDungThongBao";
import * as actDanhMuc from "./.././../actions/danhmuc/actQuanLyDanhMuc";
import * as actQuanLyTaiKhoan from "./.././../actions/quanlytaikhoan/actQuanLyTaiKhoan";
import {
  RenderInput,
  RenderInputDatePicker,
  RenderInputRadio,
  RenderInputSelect,
} from "./../../common/renderForm/inputForm";
import queryString from "query-string";
import {
  optionPhanQuyenAdmin,
  optionPhanQuyenNoAdmin,
  valueRadioGioiTinh,
} from "./../../common/data_options_select/optionSelect.js";

function FormQuanLyTaiKhoan({ onSave, form, initialValue, checkCMND }) {
  const item = useSelector((state) => state.quanlytaikhoan.item);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 50 },
    },
  };
  const onFinishFailed = (errorInfo) => {};
  const dispatch = useDispatch();
  const listCMND = useSelector((state) => state.quanly_cmnd.list);
  const account_current = useSelector(
    (state) => state.quanlylogin.account_current
  );

  const checkTaiKhoanTonTai = useSelector(
    (state) => state.quanlytaikhoan.check_taikhoan_tontai
  );

  const optionQuyen = useSelector((state) => state.danhmuc.quyen.list);

  const onChange = (e, value) => {
    let data = listCMND.filter((item) => item.cmnd === e.target.value);
    if (data.length > 0) {
      thongBao(message.THONG_BAO, noiDungThongBao.TRUNG_SO_CMND);
      checkCMND(true);
    } else {
      checkCMND(false);
    }
  };

  const checkTaiKhoan = (e, value) => {
    const queryStringParam = queryString.stringifyUrl({
      url: "quanlytaikhoan/findAccountByUser",
      query: { account: e.target.value },
    });
    dispatch(
      actQuanLyTaiKhoan.actCheckTaiKhoanTonTaiRequest(
        queryStringParam,
        checkTaiKhoanDangKy
      )
    );
  };

  const checkTaiKhoanDangKy = () => {
    thongBao(message.THONG_BAO, noiDungThongBao.TAIKHOAN_DA_TONTAI);
  };

  const onChangeAvatar = (e, value) => {
    setUrl(e.target.value);
  };
  const [checkInputImg, setCheckInputImg] = useState(false);
  const [url, setUrl] = useState(false);
  const upload = () => {
    setCheckInputImg(!checkInputImg);
  };

  useState(() => {
    dispatch(actDanhMuc.getAllDanhMucQuyenRequest(account_current));
  }, []);

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        name="basic"
        onFinish={onSave}
        onFinishFailed={onFinishFailed}
        className="test-alight"
      >
        <div className="row m-0 p-0">
          <div className="col-md-2 m-0 p-0">
            <Avatar
              onClick={() => upload()}
              size={64}
              src={url ? url : item?.img}
            />
          </div>
          <div className="col-md-10  m-0 p-0">
            {checkInputImg && (
              <RenderInput name="img" width="100%" onChange={onChangeAvatar} />
            )}
          </div>
        </div>

        <Divider plain>Tài khoản</Divider>
        <RenderInput label="id" name="id" hidden={true} />
        <RenderInput
          label="Tên người dùng"
          showLabel={true}
          name="tenNguoiDung"
          validate={true}
          textValidate="Vui lòng nhập"
        />
        <RenderInputDatePicker
          label="Ngày sinh"
          name="ngaySinh"
          showLabel={true}
          hasFeedback
          validateStatus="success"
          style={{ width: "100%" }}
        />
        <RenderInputRadio
          label="Giới tính"
          showLabel={true}
          name="gioiTinh"
          value={valueRadioGioiTinh}
        />

        <RenderInput showLabel={true} label="Facebook" name="facebook" />

        <RenderInput
          name="soDienThoai"
          label="Số điện thoại"
          showLabel={true}
          validate={true}
          addonBefore="+89"
          style={{ width: "100%" }}
        />

        <RenderInput
          label="CMND"
          name="cmnd"
          showLabel={true}
          validate={true}
          onChange={onChange}
        />

        <RenderInput
          showLabel={true}
          label="Tên đăng nhập"
          name="tenDangNhap"
          validate={true}
          onChange={checkTaiKhoan}
        />

        <RenderInput
          label="Mật khẩu"
          name="matKhau"
          validate={true}
          showLabel={true}
          password={true}
        />

        <RenderInput
          label="Xác nhận mật khẩu"
          name="xacNhanMatKhau"
          validate={true}
          showLabel={true}
          password={true}
        />

        {account_current && account_current.checkToken ? (
          <RenderInputSelect
            label="Quyền"
            name="quyenId"
            showLabel={true}
            options={optionQuyen}
          />
        ) : (
          <RenderInputSelect
            label="Quyền"
            name="quyenId"
            showLabel={true}
            options={optionQuyen}
          />
        )}
        <RenderInput name="ngayTaoBanGhi" hidden={true} />
      </Form>
    </>
  );
}

export default FormQuanLyTaiKhoan;
