import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Form, Divider, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";
import * as actNhaCungCap from "../../actions/quanlynhacungcap/actQuanLyNhaCungCap";
import {
  valueRadioDonViTinh,
  optionHinhThucThanhToan,
  optionPhanTramThue,
} from "./../../common/data_options_select/optionSelect";
import InputFormSelect from "../../common/renderForm/inputFormSelect";
import InputFormDefault from "../../common/renderForm/inputFormDefault";
import InputFormDatepiker from "../../common/renderForm/inputFormDatepiker";
import InputFormRadio from "../../common/renderForm/inputFormRadio";
function FormNhapThuoc({
  onSave,
  cancel,
  checkEdit,
  dataListNhaCungCap,
  setCheckEdit,
  recordTableThuoc,
}) {
  const [form] = useForm();
  const dispatch = useDispatch();
  const initialValue = useSelector((state) => state.khothuoc.item);
  const itemNhaCungCap = useSelector((state) => state.quanlynhacungcap.item);
  const dataListFile = useSelector((state) => state.quanly_files.list);
  const [checkIdNCC, setCheckIdNCC] = useState(false);
  const [valueForm, setValueForm] = useState({});
  const [checkInputNhaCungCapCoSan, setCheckInputNhaCungCapCoSan] =
    useState(true);

  if (initialValue !== null) {
    var dataInitialValue = {};
    if (initialValue) {
      let converFileDinhKemEdit = [];
      recordTableThuoc.fileDBArrayList.map((item, index) => {
        let itemFile = {
          ...item,
          idFile: item.id,
        };
        converFileDinhKemEdit.push(itemFile);
      });

      dataInitialValue = {
        ...initialValue,
        fileDinhKem: converFileDinhKemEdit,
        idNhaCungCap: checkIdNCC
          ? itemNhaCungCap && itemNhaCungCap.id
          : initialValue.idNhaCungCap,
        tenNhaCungCap: itemNhaCungCap && itemNhaCungCap.tenNhaCungCap,
        diaChiNhaCungCap: itemNhaCungCap && itemNhaCungCap.diaChiNhaCungCap,
        mstNhaCungCap: itemNhaCungCap && itemNhaCungCap.mstNhaCungCap,
        soDienThoaiNhaCungCap:
          itemNhaCungCap && itemNhaCungCap.soDienThoaiNhaCungCap,
        zalo: itemNhaCungCap && itemNhaCungCap.zalo,
        gmail: itemNhaCungCap && itemNhaCungCap.gmail,
        hanSuDungThuoc: moment(initialValue.hanSuDungThuoc),
      };
    } else {
      let converFileDinhKemEdit = [];
      recordTableThuoc.fileDBArrayList.map((item, index) => {
        let itemFile = {
          ...item,
          ten: item.name,
          value: item.id,
        };
        converFileDinhKemEdit.push(itemFile);
      });

      dataInitialValue = {
        ...initialValue,
        fileDinhKem: converFileDinhKemEdit,
      };
    }
  } else {
    dataInitialValue = {
      idNhaCungCap: itemNhaCungCap && itemNhaCungCap.id,
      tenNhaCungCap: itemNhaCungCap && itemNhaCungCap.tenNhaCungCap,
      diaChiNhaCungCap: itemNhaCungCap && itemNhaCungCap.diaChiNhaCungCap,
      mstNhaCungCap: itemNhaCungCap && itemNhaCungCap.mstNhaCungCap,
      soDienThoaiNhaCungCap:
        itemNhaCungCap && itemNhaCungCap.soDienThoaiNhaCungCap,
      zalo: itemNhaCungCap && itemNhaCungCap.zalo,
      gmail: itemNhaCungCap && itemNhaCungCap.gmail,
    };
  }

  useEffect(() => {
    form.setFieldsValue(dataInitialValue);
  }, [initialValue, form, itemNhaCungCap]);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  const onFinishFailed = (errorInfo) => {};

  const onFinish = (value) => {
    setValueForm(value);
    onSave(value);
  };

  const showFormNhaCungCap = () => {
    setCheckEdit(!checkEdit);
    setCheckInputNhaCungCapCoSan(false);
    dispatch(actNhaCungCap.actGetNhaCungCapById(null));
  };

  const onShowValue = (value) => {
    setCheckIdNCC(true);
    dispatch(actNhaCungCap.actGetNhaCungCapByIdRequest(value));
  };

  const FormXemChiTietNhaCungCap = () => {
    setCheckEdit(!checkEdit);
    setCheckInputNhaCungCapCoSan(true);
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
        <div className="row m-0 p-0 ">
          {checkEdit && (
            <div className="col-md-6">
              <Divider plain>Nhà cung cấp</Divider>
              <div className="row">
                <div className="col-md-2">
                  <p>Nhà cung cấp</p>
                </div>
                <div className="col-md-10">
                  <InputFormSelect
                    name="nhaCungCapId"
                    label="Nhà cung cấp"
                    validate
                    options={dataListNhaCungCap}
                    search={true}
                    valueId={true}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 d-flex  justify-content-start">
                  <Button
                    onClick={() => {
                      showFormNhaCungCap();
                    }}
                    className="ml-2"
                    type="seconed"
                    size="small"
                  >
                    Tạo nhà cung cấp mới
                  </Button>
                </div>
                <div className="col-md-6 d-flex  justify-content-end">
                  <Button
                    onClick={() => {
                      FormXemChiTietNhaCungCap();
                    }}
                    className="ml-2"
                    type="seconed"
                    size="small"
                  >
                    Xem
                  </Button>
                </div>
              </div>
            </div>
          )}
          {!checkEdit && (
            <div className="col-md-6 ">
              <Divider plain>Nhà cung cấp</Divider>
              {checkInputNhaCungCapCoSan && (
                <div className="row">
                  <div className="col-md-2">
                    <p>Nhà cung cấp có sẵn</p>
                  </div>
                  <div className="col-md-10">
                    <InputFormSelect
                      name="nhaCungCapId"
                      label="Nhà cung cấp"
                      validate
                      options={dataListNhaCungCap}
                      search={true}
                    />
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col-md-2">
                  <p>Tên nhà cung cấp</p>
                </div>
                <div className="col-md-10">
                  <InputFormDefault
                    showLabel={false}
                    label="Tên nhà cung cấp"
                    validate={true}
                    name="tenNhaCungCap"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <p>Địa chỉ</p>
                </div>
                <div className="col-md-10">
                  <InputFormDefault
                    showLabel={false}
                    label="Địa chỉ nhà cung cấp"
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
                  <InputFormDefault
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
                  <InputFormDefault
                    showLabel={false}
                    label="Số điện thoại"
                    validate={true}
                    name="soDienThoaiNhaCungCap"
                    addonBefore="+84"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <p>Zalo</p>
                </div>
                <div className="col-md-10">
                  <InputFormDefault
                    showLabel={false}
                    label="Zalo"
                    validate={true}
                    name="zalo"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <p>Gmail</p>
                </div>
                <div className="col-md-10">
                  <InputFormDefault
                    showLabel={false}
                    label="Email"
                    validate={true}
                    name="email"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="col-md-6 ">
            <Divider plain>Hàng hóa</Divider>

            <InputFormDefault name="id" hidden={true} />

            <div className="row">
              <div className="col-md-2">
                <p>Mã</p>
              </div>
              <div className="col-md-10">
                <InputFormDefault
                  showLabel={false}
                  label="Mã"
                  validate={true}
                  name="ma"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Tên hàng hóa</p>
              </div>
              <div className="col-md-10">
                <InputFormDefault
                  showLabel={false}
                  label="Tên thuốc"
                  validate={true}
                  name="tenThuoc"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Khu vực xếp thuốc</p>
              </div>
              <div className="col-md-10">
                <InputFormDefault
                  showLabel={false}
                  label="Khu vực"
                  validate={true}
                  name="khuVuc"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Phân loại thuốc</p>
              </div>
              <div className="col-md-10">
                <InputFormDefault
                  showLabel={false}
                  label="Phân loại thuốc"
                  validate={true}
                  name="phanLoaiThuoc"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <p>Số lượng nhập hàng </p>
                  </div>
                  <div className="col-md-8">
                    <InputFormDefault
                      name="soLuongNhap"
                      style={{ width: "250px" }}
                      inputNumber={true}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6  m-0 p-0">
                <div className="row  m-0 p-0">
                  <div className="col-md-4 m-0 p-0">
                    <p>Đơn vị tính</p>
                  </div>
                  <div className="col-md-8 m-0 p-0">
                    <InputFormRadio
                      name="donViTinh"
                      options={valueRadioDonViTinh}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Tổng tiền trước thuế (VNĐ)</p>
              </div>
              <div className="col-md-10">
                <InputFormDefault
                  label="Tổng tiền trước thuế"
                  name="tongTienTruocThue"
                  style={{ width: "650px" }}
                  inputNumber={true}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Thuế 5%</p>
              </div>
              <div className="col-md-10">
                <InputFormSelect
                  label="Thuế"
                  name="phanTramThue"
                  options={optionPhanTramThue}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Chiết khấu</p>
              </div>
              <div className="col-md-10">
                <InputFormDefault
                  label="Chiết khấu"
                  name="chietKhau"
                  style={{ width: "650px" }}
                  inputNumber={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-2">
                <p>Giá (Đã bao gồm VAT/VNĐ)</p>
              </div>
              <div className="col-md-10">
                <InputFormDefault
                  label="Giá tiền"
                  name="giaTien"
                  style={{ width: "650px" }}
                  inputNumber={true}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Thanh toán</p>
              </div>
              <div className="col-md-10">
                <InputFormSelect
                  allowClear={true}
                  name="thanhToan"
                  label="Thanh toán"
                  options={optionHinhThucThanhToan}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Ngày nhập thuốc</p>
              </div>
              <div className="col-md-10">
                <InputFormDatepiker
                  name="hanSuDungThuoc"
                  label="Hạn sử dụng"
                  hasFeedback
                  validateStatus="success"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>File</p>
              </div>
              <div className="col-md-10">
                <Form.List name="fileDinhKem">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Space
                          key={key}
                          style={{
                            display: "flex",
                            marginBottom: 8,
                          }}
                          align="baseline"
                        >
                          <div className="row">
                            <div className="col-md-10">
                              <InputFormSelect
                                {...restField}
                                label="File"
                                name={[name, "idFile"]}
                                fieldKey={[fieldKey, "idFile"]}
                                style={{ width: "630px" }}
                                //  onChange={onShowValue}
                                options={dataListFile}
                                validate={true}
                                search={true}
                              />
                            </div>
                          </div>

                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}

                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Thêm
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>
            </div>
            <InputFormDefault name="ngayTaoBanGhi" hidden={true} />
            <InputFormDefault name="soLuongDaBan" hidden={true} />
            <InputFormDefault name="soLuongMua" hidden={true} />
          </div>
        </div>
        <Form.Item>
          {!checkEdit && (
            <div className="row">
              <div className="col-md-12 d-flex  justify-content-start">
                <Button
                  onClick={() => {
                    showFormNhaCungCap();
                  }}
                  className="ml-2"
                  type="primary"
                  size="small"
                >
                  Chọn nhà cung cấp
                </Button>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-md-12  ">
              <div className="col-md-12 d-flex justify-content-end">
                <Button
                  className="ml-2"
                  type="primary "
                  size="small"
                  htmlType="submit"
                >
                  Thêm
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

export default FormNhapThuoc;
