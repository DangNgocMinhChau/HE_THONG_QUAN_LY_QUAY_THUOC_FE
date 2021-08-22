import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Divider, Modal, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import InputEditor from "../../common/renderForm/inputEditor";
import InputFormSelect from "../../common/renderForm/inputFormSelect";
import InputFormSelectSearch from "../../common/renderForm/inputFormSelectSearch";
import InputFormDefault from "../../common/renderForm/inputFormDefault";
import InputFormTextArea from "../../common/renderForm/inputFormTextArea";
import InputFormDatepiker from "../../common/renderForm/inputFormDatepiker";
import InputFormRadio from "../../common/renderForm/inputFormRadio";
export default function FormConfigCRUD({
  onSave,
  cancel,
  checkEdit,
  propsDefineObject,
  checkThemMoi,
  isVisible,
}) {
  const [form] = useForm();
  const [dataEditor, setDataEditor] = useState();
  const [contentEditor, setContentEditor] = useState({});

  const dispatch = useDispatch();
  const initialValue = useSelector((state) => state.config_crud_auto.item);
  if (initialValue !== null) {
    var dataInitialValue = {};
    if (initialValue) {
      if (propsDefineObject.checkOnSaveBaiViet) {
        let pFeildTag = propsDefineObject.checkOnSaveBaiViet.split(",")[0];
        let pFeildFile = propsDefineObject.checkOnSaveBaiViet.split(",")[1];
        dataInitialValue = {
          ...initialValue,
          [pFeildTag]:
            initialValue &&
            initialValue[pFeildTag] &&
            initialValue[pFeildTag].split(","),
          [pFeildFile]:
            initialValue &&
            initialValue[pFeildFile] &&
            initialValue[pFeildFile].split(","),
        };
      } else {
        dataInitialValue = {
          ...initialValue,
        };
      }
    } else {
      dataInitialValue = initialValue;
    }
  }
  const funcCustomEditor = (e, nameField) => {
    let name = nameField;
    let content = {
      [name]: e,
    };
    setDataEditor(e);
    setContentEditor(content);
  };

  const onFinishFailed = (errorInfo) => {};
  const onFinish = (value) => {
    if (propsDefineObject.checkOnSaveBaiViet) {
      let pFeildTag = propsDefineObject.checkOnSaveBaiViet.split(",")[0];
      let pFeildFile = propsDefineObject.checkOnSaveBaiViet.split(",")[1];
      if (dataEditor) {
        value = {
          ...value,
          ...contentEditor,
          [pFeildTag]: value[pFeildTag] && value[pFeildTag].toString(),
          [pFeildFile]: value[pFeildFile] && value[pFeildFile].toString(),
        };
        onSave(value);
      } else {
        onSave(value);
      }
    } else {
      if (dataEditor) {
        value = {
          ...value,
          ...contentEditor,
        };
        onSave(value);
      } else {
        onSave(value);
      }
    }
  };
  useEffect(() => {
    form.setFieldsValue(dataInitialValue);
    setDataEditor(dataInitialValue);
  }, [initialValue, form]);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  useEffect(() => {
    if (checkThemMoi && !checkEdit) {
      setDataEditor("");
    }
  }, []);

  const commonForm = () => {
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
                      <InputFormDefault
                        showLabel={false}
                        label={itemInputForm.text}
                        name={itemInputForm.dataField}
                        validate={itemInputForm.validate}
                        hidden={itemInputForm.hidden}
                        inputNumber={itemInputForm.inputNumber}
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
                      <InputFormDatepiker
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
                      <InputFormDefault
                        showLabel={false}
                        label={itemInputForm.text}
                        name={itemInputForm.dataField}
                        validate={itemInputForm.validate}
                        hidden={itemInputForm.hidden}
                        inputNumber={true}
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
                      <InputFormRadio
                        showLabel={false}
                        label={itemInputForm.text}
                        name={itemInputForm.dataField}
                        validate={itemInputForm.validate}
                        hidden={itemInputForm.hidden}
                        value={itemInputForm.dataOption}
                        api={itemInputForm.apiSelect}
                        valueId={itemInputForm.valueId}
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
                      <InputFormSelectSearch
                        showLabel={false}
                        label={itemInputForm.text}
                        name={itemInputForm.dataField}
                        validate={itemInputForm.validate}
                        hidden={itemInputForm.hidden}
                        api={itemInputForm.apiSelect}
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
                      <InputFormTextArea
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

              if (itemInputForm.renderField === "InputEditor") {
                return (
                  <div className="row">
                    <div className="col-md-2">
                      <p>{!itemInputForm.hidden && itemInputForm.text}</p>
                    </div>
                    <div className="col-md-10">
                      <InputEditor
                        name={itemInputForm.dataField}
                        dataEditor={dataEditor}
                        setDataEditor={setDataEditor}
                        funcCustomEditor={funcCustomEditor}
                      />
                    </div>
                  </div>
                );
              }
              if (itemInputForm.renderField === "Select") {
                return (
                  <div className="row">
                    <div className="col-md-2">
                      <p>{!itemInputForm.hidden && itemInputForm.text}</p>
                    </div>
                    <div className="col-md-10">
                      <InputFormSelect
                        showLabel={false}
                        label={itemInputForm.text}
                        name={itemInputForm.dataField}
                        validate={itemInputForm.validate}
                        hidden={itemInputForm.hidden}
                        api={itemInputForm.apiSelect}
                        defaultValue={itemInputForm.defaultValue}
                        search={itemInputForm.selectSearch}
                        valueId={itemInputForm.valueId}
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

  const renderForm = () => {
    return commonForm();
  };

  const renderModalFrom = () => {
    return (
      <Modal
        title={propsDefineObject.name}
        visible={isVisible}
        onCancel={cancel}
        width={1000}
        footer={[
          <Button onClick={() => cancel()}>Hủy</Button>,
          <Button onClick={() => form.submit()}>OK</Button>,
        ]}
      >
        {commonForm()}
      </Modal>
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
        {propsDefineObject.buildModalPage ? renderModalFrom() : renderForm()}
        {propsDefineObject.buildModalPage ? (
          ""
        ) : (
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
        )}
      </Form>
    </>
  );
}
