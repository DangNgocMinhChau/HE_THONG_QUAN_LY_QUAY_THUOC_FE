import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import FormQuanLyTaiKhoan from "./formQuanLyTaiKhoan";
import { useForm } from "antd/lib/form/Form";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import * as actQuanLyCMND from "./../.././actions/quanly_cmnd/actQuanLyCMND";
function ModalQuanLyTaiKhoan({ isVisible, handleCancel, onSave, checkCMND })
{
  const [form] = useForm();
  const initialValue = useSelector((state) => state.quanlytaikhoan.item);
  const dispatch = useDispatch();

  if (initialValue !== null) {
    var dataInitialValue = {};
    if (initialValue) {
      dataInitialValue = {
        ...initialValue,
        ngaySinh: moment(initialValue.ngaySinh),
        matKhau: initialValue.matKhauGoc,
        xacNhanMatKhau: initialValue.matKhauGoc,
      };
    } else {
      dataInitialValue = initialValue;
    }
  }

  useEffect(() =>
  {
    form.resetFields();
    form.setFieldsValue(dataInitialValue);
  }, [isVisible, initialValue, form]);

  useEffect(() =>
  {
    dispatch(actQuanLyCMND.getAllCMNDRequest());
  }, []);
  return (
    <>
      <Modal
        title="Đăng ký tài khoản"
        visible={isVisible}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button onClick={handleCancel}>Hủy</Button>,
          <Button onClick={() => form.submit()}>OK</Button>,
        ]}
      >
        <div style={{ textAlign: "left" }}>
          <FormQuanLyTaiKhoan
            onSave={onSave}
            form={form}
            checkCMND={checkCMND}
          />
        </div>
      </Modal>
    </>
  );
}

export default ModalQuanLyTaiKhoan;
