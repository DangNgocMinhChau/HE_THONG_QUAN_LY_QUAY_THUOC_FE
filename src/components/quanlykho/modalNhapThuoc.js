import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import FormKhoThuoc from "./form";
import { useForm } from "antd/lib/form/Form";
import { useSelector } from "react-redux";
import moment from "moment";

function ModalNhapThuoc({ isVisible, handleCancel, onSave }) {
  const [form] = useForm();
  const initialValue = useSelector((state) => state.khothuoc.item);
  if (initialValue !== null) {
    var dataInitialValue = {};
    if (initialValue) {
      dataInitialValue = {
        ...initialValue,
        ngayHoaDonNhaCungCap: moment(initialValue.ngayHoaDonNhaCungCap),
      };
    } else {
      dataInitialValue = initialValue;
    }
  }

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(dataInitialValue);
  }, [isVisible, initialValue, form]);

  return (
    <>
      <Modal
        title="Thêm mới"
        visible={isVisible}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button onClick={handleCancel}>Hủy</Button>,
          <Button onClick={() => form.submit()}>OK</Button>,
        ]}
      >
        <div style={{ textAlign: "left" }}>
          <FormKhoThuoc onSave={onSave} form={form} />
        </div>
      </Modal>
    </>
  );
}

export default ModalNhapThuoc;
