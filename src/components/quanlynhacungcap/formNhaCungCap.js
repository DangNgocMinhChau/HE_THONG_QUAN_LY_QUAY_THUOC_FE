import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Divider, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { RenderInput } from "./../../common/renderForm/inputForm";

function FormNhaCungCap({ onSave, cancel, checkEdit }) {
  const [form] = useForm();
  const dispatch = useDispatch();
  const initialValue = useSelector((state) => state.quanlynhacungcap.item);
  if (initialValue !== null) {
    var dataInitialValue = {};
    if (initialValue) {
      dataInitialValue = {
        ...initialValue,
      };
    } else {
      dataInitialValue = initialValue;
    }
  }

  const onFinishFailed = (errorInfo) => {};

  const onFinish = (value) => {
    onSave(value);
  };

  useEffect(() => {
    form.setFieldsValue(dataInitialValue);
  }, [initialValue, form]);

  useEffect(() => {
    form.resetFields();
  }, [form]);
  return (
    <>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="test-alight"
      >
        <div className="row m-0 p-0 ">
          <div className="col-md-12 ">
            <Divider plain>Nhà cung cấp</Divider>

            <RenderInput label="id" name="id" hidden={true} />

            <div className="row">
              <div className="col-md-2">
                <p>Mã</p>
              </div>
              <div className="col-md-10">
                <RenderInput
                  showLabel={false}
                  label="Mã"
                  name="ma"
                  validate={true}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Tên nhà cung cấp</p>
              </div>
              <div className="col-md-10">
                <RenderInput
                  showLabel={false}
                  label="Tên nhà cung cấp"
                  name="tenNhaCungCap"
                  validate={true}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Địa chỉ</p>
              </div>
              <div className="col-md-10">
                <RenderInput
                  showLabel={false}
                  label="Địa chỉ"
                  validate={true}
                  name="diaChiNhaCungCap"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Mã số thuế</p>
              </div>
              <div className="col-md-10">
                <RenderInput
                  showLabel={false}
                  label="Mã số thuế"
                  validate={true}
                  name="mstNhaCungCap"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-2">
                <p>Số điện thoại nhà cung cấp (Nếu có)</p>
              </div>
              <div className="col-md-10">
                <RenderInput
                  showLabel={false}
                  label="Số điện thoại"
                  name="soDienThoaiNhaCungCap"
                  validate={true}
                  addonBefore="+84"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Zalo</p>
              </div>
              <div className="col-md-10">
                <RenderInput showLabel={false} label="Zalo" name="zalo" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Gmail</p>
              </div>
              <div className="col-md-10">
                <RenderInput showLabel={false} label="Email" name="email" />
              </div>
            </div>
          </div>
          <RenderInput name="ngayTaoBanGhi" hidden={true} />
        </div>
        <Form.Item>
          <div className="row">
            <div className="col-md-12  ">
              <div className="col-md-12 d-flex justify-content-end">
                <Button
                  className="ml-2"
                  type="primary "
                  size="small"
                  htmlType="submit"
                >
                  {checkEdit ? "Sửa" : "Thêm"}
                </Button>
                <Button
                  onClick={() => {
                    cancel();
                  }}
                  className="ml-2"
                  type="seconed"
                  size="small"
                >
                  Đóng
                </Button>
              </div>
            </div>
          </div>
        </Form.Item>
      </Form>
    </>
  );
}

export default FormNhaCungCap;
