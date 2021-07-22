import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Divider, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import {
  RenderInput,
  RenderInputSelect,
  RenderInputDatePicker,
  RenderInputNumber,
  RenderInputRadio,
  RenderInputSelectSearch,
  RenderInputTextArea,
} from "../../common/renderForm/inputForm";

export default function FormConfigCRUD({
  onSave,
  cancel,
  checkEdit,
  propsDefineObject,
}) {
  const [form] = useForm();
  const dispatch = useDispatch();
  const initialValue = useSelector((state) => state.config_crud_auto.item);
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

  const renderForm = () => {
    return (
      <div className="row m-0 p-0 ">
        <div className="col-md-12 ">
          <Divider plain>{propsDefineObject.name}</Divider>
          {/* <RenderInput name="id" hidden={true} /> */}
          {propsDefineObject.defineObjectFormProps.map(
            (itemInputForm, indexInputForm) => {
              if (itemInputForm.renderField === "Input") {
                return (
                  <div className="row">
                    <div className="col-md-2">
                      <p>{!itemInputForm.hidden && itemInputForm.text}</p>
                    </div>
                    <div className="col-md-10">
                      <RenderInput
                        showLabel={false}
                        label={itemInputForm.text}
                        name={itemInputForm.dataField}
                        validate={itemInputForm.validate}
                        hidden={itemInputForm.hidden}
                      />
                    </div>
                  </div>
                );
              }

              if (itemInputForm.renderField === "InputSelect") {
                return (
                  <div className="row">
                    <div className="col-md-2">
                      <p>{!itemInputForm.hidden && itemInputForm.text}</p>
                    </div>
                    <div className="col-md-10">
                      <RenderInputSelect
                        showLabel={false}
                        label={itemInputForm.text}
                        name={itemInputForm.dataField}
                        validate={itemInputForm.validate}
                        hidden={itemInputForm.hidden}
                      />
                    </div>
                  </div>
                );
              }

              if (itemInputForm.renderField === "InputDatePicker") {
                return (
                  <div className="row">
                    <div className="col-md-2">
                      <p>{!itemInputForm.hidden && itemInputForm.text}</p>
                    </div>
                    <div className="col-md-10">
                      <RenderInputDatePicker
                        showLabel={false}
                        label={itemInputForm.text}
                        name={itemInputForm.dataField}
                        validate={itemInputForm.validate}
                        hidden={itemInputForm.hidden}
                      />
                    </div>
                  </div>
                );
              }

              if (itemInputForm.renderField === "InputNumber") {
                return (
                  <div className="row">
                    <div className="col-md-2">
                      <p>{!itemInputForm.hidden && itemInputForm.text}</p>
                    </div>
                    <div className="col-md-10">
                      <RenderInputNumber
                        showLabel={false}
                        label={itemInputForm.text}
                        name={itemInputForm.dataField}
                        validate={itemInputForm.validate}
                        hidden={itemInputForm.hidden}
                      />
                    </div>
                  </div>
                );
              }

              if (itemInputForm.renderField === "InputRadio") {
                return (
                  <div className="row">
                    <div className="col-md-2">
                      <p>{!itemInputForm.hidden && itemInputForm.text}</p>
                    </div>
                    <div className="col-md-10">
                      <RenderInputRadio
                        showLabel={false}
                        label={itemInputForm.text}
                        name={itemInputForm.dataField}
                        validate={itemInputForm.validate}
                        hidden={itemInputForm.hidden}
                      />
                    </div>
                  </div>
                );
              }

              if (itemInputForm.renderField === "InputSelectSearch") {
                return (
                  <div className="row">
                    <div className="col-md-2">
                      <p>{!itemInputForm.hidden && itemInputForm.text}</p>
                    </div>
                    <div className="col-md-10">
                      <RenderInputSelectSearch
                        showLabel={false}
                        label={itemInputForm.text}
                        name={itemInputForm.dataField}
                        validate={itemInputForm.validate}
                        hidden={itemInputForm.hidden}
                      />
                    </div>
                  </div>
                );
              }

              if (itemInputForm.renderField === "InputTextArea") {
                return (
                  <div className="row">
                    <div className="col-md-2">
                      <p>{!itemInputForm.hidden && itemInputForm.text}</p>
                    </div>
                    <div className="col-md-10">
                      <RenderInputTextArea
                        showLabel={false}
                        label={itemInputForm.text}
                        name={itemInputForm.dataField}
                        validate={itemInputForm.validate}
                        hidden={itemInputForm.hidden}
                      />
                    </div>
                  </div>
                );
              }
            }
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="test-alight"
      >
        {renderForm()}
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
