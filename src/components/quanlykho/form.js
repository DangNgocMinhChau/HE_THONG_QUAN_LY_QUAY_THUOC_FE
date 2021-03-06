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
              <Divider plain>Nh?? cung c???p</Divider>
              <div className="row">
                <div className="col-md-2">
                  <p>Nh?? cung c???p</p>
                </div>
                <div className="col-md-10">
                  <InputFormSelect
                    name="nhaCungCapId"
                    label="Nh?? cung c???p"
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
                    T???o nh?? cung c???p m???i
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
              <Divider plain>Nh?? cung c???p</Divider>
              {checkInputNhaCungCapCoSan && (
                <div className="row">
                  <div className="col-md-2">
                    <p>Nh?? cung c???p c?? s???n</p>
                  </div>
                  <div className="col-md-10">
                    <InputFormSelect
                      name="nhaCungCapId"
                      label="Nh?? cung c???p"
                      validate
                      options={dataListNhaCungCap}
                      search={true}
                    />
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col-md-2">
                  <p>T??n nh?? cung c???p</p>
                </div>
                <div className="col-md-10">
                  <InputFormDefault
                    showLabel={false}
                    label="T??n nh?? cung c???p"
                    validate={true}
                    name="tenNhaCungCap"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <p>?????a ch???</p>
                </div>
                <div className="col-md-10">
                  <InputFormDefault
                    showLabel={false}
                    label="?????a ch??? nh?? cung c???p"
                    validate={true}
                    name="diaChiNhaCungCap"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <p>M?? s??? thu???</p>
                </div>
                <div className="col-md-10">
                  <InputFormDefault
                    showLabel={false}
                    label="M?? s??? thu???"
                    validate={true}
                    name="mstNhaCungCap"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  <p>S??? ??i???n tho???i nh?? cung c???p (N???u c??)</p>
                </div>
                <div className="col-md-10">
                  <InputFormDefault
                    showLabel={false}
                    label="S??? ??i???n tho???i"
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
            <Divider plain>H??ng h??a</Divider>

            <InputFormDefault name="id" hidden={true} />

            <div className="row">
              <div className="col-md-2">
                <p>M??</p>
              </div>
              <div className="col-md-10">
                <InputFormDefault
                  showLabel={false}
                  label="M??"
                  validate={true}
                  name="ma"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>T??n h??ng h??a</p>
              </div>
              <div className="col-md-10">
                <InputFormDefault
                  showLabel={false}
                  label="T??n thu???c"
                  validate={true}
                  name="tenThuoc"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Khu v???c x???p thu???c</p>
              </div>
              <div className="col-md-10">
                <InputFormDefault
                  showLabel={false}
                  label="Khu v???c"
                  validate={true}
                  name="khuVuc"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Ph??n lo???i thu???c</p>
              </div>
              <div className="col-md-10">
                <InputFormDefault
                  showLabel={false}
                  label="Ph??n lo???i thu???c"
                  validate={true}
                  name="phanLoaiThuoc"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <p>S??? l?????ng nh???p h??ng </p>
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
                    <p>????n v??? t??nh</p>
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
                <p>T???ng ti???n tr?????c thu??? (VN??)</p>
              </div>
              <div className="col-md-10">
                <InputFormDefault
                  label="T???ng ti???n tr?????c thu???"
                  name="tongTienTruocThue"
                  style={{ width: "650px" }}
                  inputNumber={true}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Thu??? 5%</p>
              </div>
              <div className="col-md-10">
                <InputFormSelect
                  label="Thu???"
                  name="phanTramThue"
                  options={optionPhanTramThue}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Chi???t kh???u</p>
              </div>
              <div className="col-md-10">
                <InputFormDefault
                  label="Chi???t kh???u"
                  name="chietKhau"
                  style={{ width: "650px" }}
                  inputNumber={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-2">
                <p>Gi?? (???? bao g???m VAT/VN??)</p>
              </div>
              <div className="col-md-10">
                <InputFormDefault
                  label="Gi?? ti???n"
                  name="giaTien"
                  style={{ width: "650px" }}
                  inputNumber={true}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Thanh to??n</p>
              </div>
              <div className="col-md-10">
                <InputFormSelect
                  allowClear={true}
                  name="thanhToan"
                  label="Thanh to??n"
                  options={optionHinhThucThanhToan}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Ng??y nh???p thu???c</p>
              </div>
              <div className="col-md-10">
                <InputFormDatepiker
                  name="hanSuDungThuoc"
                  label="H???n s??? d???ng"
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
                          Th??m
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
                  Ch???n nh?? cung c???p
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
                  Th??m
                </Button>
                <Button
                  onClick={() => {
                    cancel();
                  }}
                  className="ml-2"
                  type="seconed"
                  size="small"
                >
                  ????ng
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
