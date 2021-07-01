import React, { useState, useEffect, useRef } from "react";
import {
  RenderInput,
  RenderInputDatePicker,
  RenderInputRadio,
  RenderInputSelect,
  RenderInputNumber,
  RenderInputSelectSearch,
} from "./../../../common/renderForm/inputForm";
import {
  valueRadioDonViTinh,
  optionHinhThucThanhToan,
  optionPhanTramThue,
} from "./../../../common/data_options_select/optionSelect";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Divider, Button, Space, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import * as acthoadonGTGT from "../../../actions/quanly_hoadon/actHoaDonGTGT";

export default function FormNhapHoaDonGTGT({
  onSave,
  itemHoaDonGTGT,
  handleBack,
  checkEdit,
}) {
  const formRef = useRef();
  const [form] = useForm();
  const dispatch = useDispatch();
  const initialValue = useSelector(
    (state) => state.quanly_hoadon.hoadon_gtgt.item
  );

  let dataInitialValue = {};
  if (initialValue !== null) {
    dataInitialValue = {
      ...initialValue,
      ngayKy: moment(initialValue.ngayKy),
      ngayHoaDon: moment(initialValue.ngayHoaDon),
    };
  }

  useEffect(() => {
    form.setFieldsValue(dataInitialValue);
  }, [dataInitialValue, form]);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  const onFinish = (value) => {
    if (value.id) {
      let idXoa = [];
      let idHanghoaDangCo = [];
      initialValue.hangHoa.map((item) => {
        idXoa.push(item.id);
      });
      value.hangHoa.map((item, index) => {
        idHanghoaDangCo.push(item.id);
      });

      for (let i = 0; i < idXoa.length; i++) {
        if (!idHanghoaDangCo.includes(idXoa[i])) {
          dispatch(
            acthoadonGTGT.actDeleteHanghoaTrongHoaDonGTGTRequest(idXoa[i])
          );
        } else {
        }
      }
      onSave(value);
    } else {
      onSave(value);
    }
  };

  const valueOnChange = (e) => {
    console.log(e.format());
  };

  return (
    <Form
      form={form}
      name="basic"
      onFinish={onFinish}
      ref={formRef}
      className="test-alight"
    >
      <div className="bg-hoadongtgt m-5">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-10">
            <div className="row m-0">
              <div className="col-md-2"></div>
              <div className="col-md-6 mt-5 ">
                <h1>HÓA ĐƠN GIÁ TRỊ GIA TĂNG</h1>
                <h6>(Bản thể hiện của hóa đơn điện tử)</h6>
                <h6>
                  <RenderInputDatePicker
                    showLabel={false}
                    label="Ngày tháng năm"
                    validate={false}
                    name="ngayHoaDon"
                    onChange={(e) => valueOnChange(e)}
                  />
                </h6>
              </div>
              <div className="col-md-2 mt-5">
                <h6 className="font-size-custom text-justify">
                  <RenderInput
                    showLabel={true}
                    label="Mẫu số"
                    validate={false}
                    name="mauSo"
                  />
                </h6>
                <h6 className="font-size-custom text-justify">
                  <RenderInput
                    showLabel={true}
                    label="Ký hiệu"
                    validate={false}
                    name="kyHieu"
                  />
                </h6>
                <h6 className="font-size-custom text-justify">
                  <RenderInput
                    showLabel={true}
                    label="Số"
                    validate={false}
                    name="so"
                  />
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-0">
          <div className="col-md-12 text-justify">
            <RenderInput
              showLabel={true}
              label="Họ tên người mua"
              validate={false}
              name="hoTenNguoiMua"
            />
          </div>
          <div className="col-md-12 text-justify">
            <RenderInput
              showLabel={true}
              label="Tên đơn vị"
              validate={false}
              name="tenDonVi"
            />
          </div>
          <div className="col-md-12 text-justify">
            <RenderInput
              showLabel={true}
              label="Mã số thuế"
              validate={false}
              name="maSoThue"
            />
          </div>
          <div className="col-md-12 text-justify">
            <RenderInput
              showLabel={true}
              label="Địa chỉ"
              validate={false}
              name="diaChi"
            />
          </div>
          <div className="col-md-6 text-justify">
            <RenderInputSelect
              allowClear={true}
              showLabel={true}
              validate={false}
              name="thanhToan"
              label="Thanh toán"
              options={optionHinhThucThanhToan}
            />
          </div>
          <div className="col-md-6 text-justify">
            <RenderInput
              showLabel={true}
              label="Số tài khoản"
              validate={false}
              name="soTK"
            />
          </div>
          <div className="row"></div>
          <div className="col-md-12 mt-2">
            <table className="customtable center">
              <tr>
                <th width="10">STT</th>
                <th>Tên hàng hoá,dịch vụ</th>
                <th>Số lô</th>
                <th>Hạn dùng</th>
                <th width="70">ĐVT</th>
                <th width="70">Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
              <tr className="inDam">
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8=6x7</td>
              </tr>

              <tr>
                <td colSpan={8}>
                  <Form.List name="hangHoa">
                    {(fields, { add, remove, move }) => (
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
                            <p>{key + 1}</p>
                            <RenderInput
                              showLabel={false}
                              label="Tên hàng hoá"
                              validate={false}
                              name={[name, "tenHangHoa"]}
                              fieldKey={[fieldKey, "tenHangHoa"]}
                              // style={{
                              //   width: "240px",
                              //   marginLeft: "15px",
                              // }}
                            />

                            <RenderInput
                              showLabel={false}
                              label="Số lô"
                              validate={false}
                              name={[name, "soLo"]}
                              fieldKey={[fieldKey, "soLo"]}
                              // style={{
                              //   width: "150px",
                              //   marginLeft: "15px",
                              // }}
                            />
                            <RenderInput
                              showLabel={false}
                              label="Hạn dùng"
                              validate={false}
                              name={[name, "hanDung"]}
                              fieldKey={[fieldKey, "hanDung"]}
                              // style={{
                              //   width: "300px",
                              //   marginLeft: "20px",
                              // }}
                            />

                            <RenderInput
                              showLabel={false}
                              label="Đơn vị tính"
                              validate={false}
                              name={[name, "donViTinh"]}
                              fieldKey={[fieldKey, "donViTinh"]}
                              // style={{
                              //   width: "50px",
                              //   marginLeft: "15px",
                              // }}
                            />
                            <RenderInput
                              showLabel={false}
                              label="Số lượng"
                              validate={false}
                              name={[name, "soLuong"]}
                              fieldKey={[fieldKey, "soLuong"]}
                              // style={{
                              //   width: "50px",
                              //   marginLeft: "15px",
                              // }}
                            />
                            <RenderInputNumber
                              showLabel={false}
                              label="Đơn giá"
                              validate={false}
                              name={[name, "donGia"]}
                              fieldKey={[fieldKey, "donGia"]}
                              // style={{
                              //   width: "240px",
                              //   marginLeft: "15px",
                              // }}
                            />
                            <RenderInputNumber
                              showLabel={false}
                              label="Thành tiền"
                              validate={false}
                              name={[name, "thanhTien"]}
                              fieldKey={[fieldKey, "thanhTien"]}
                              // style={{
                              //   width: "260px",
                              //   marginLeft: "15px",
                              // }}
                            />
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}

                        <Form.Item>
                          <a onClick={() => add()}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </a>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </td>
              </tr>

              <tr>
                <td colSpan={8}>
                  <RenderInputNumber
                    showLabel={true}
                    label="Cộng tiền hàng"
                    validate={false}
                    name="congTienHang"
                    style={{ width: "1200px" }}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-justify" colSpan={2}>
                  <RenderInputSelect
                    showLabel={true}
                    label=" Thuế suât GTGT"
                    name="phanTramThue"
                    options={optionPhanTramThue}
                  />
                </td>
                <td
                  className="text-justify"
                  style={{ paddingLeft: "6%" }}
                  colSpan={6}
                >
                  <RenderInputNumber
                    showLabel={true}
                    label="Tiền thuế GTGT"
                    validate={false}
                    name="tienThueGTGT"
                    style={{ width: "1000px" }}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ paddingLeft: "2%" }} colSpan={8}>
                  <RenderInputNumber
                    showLabel={true}
                    label="Tổng tiền thanh toán"
                    validate={false}
                    name="tongTienThanhToan"
                    style={{ width: "1000px" }}
                  />
                </td>
                {/* <td className="text-justify inDam">1.945.030</td> */}
              </tr>
              <tr className="text-justify">
                <td colSpan={8}>
                  <RenderInput
                    showLabel={true}
                    label="Số tiền viết bằng chữ"
                    validate={false}
                    name="soTienVietBangChu"
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4">
            <b>Người mua hàng</b>
            <div>(Ký, ghi rõ họ, tên)</div>
          </div>
          <div className="col-md-4">
            <b>Người bán hàng</b>
            <div>(Ký, ghi rõ họ, tên)</div>
          </div>
          <div className="col-md-4">
            <b>Thủ trưởng đơn vị</b>
            <div>(Ký, đóng dấu, ghi rõ họ tên)</div>
          </div>
        </div>
        <div style={{ paddingTop: "6%" }} className="row  text-justify ">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-8"></div>
              <div className="col-md-4">
                <div className="col-md-12 ">
                  <div>
                    <RenderInput
                      showLabel={true}
                      label="Ký bởi"
                      validate={false}
                      name="kyBoi"
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-5">
                  <div>
                    <RenderInputDatePicker
                      showLabel={true}
                      label="Ký ngày"
                      validate={false}
                      name="ngayKy"
                    />
                  </div>
                </div>
                <RenderInput
                  showLabel={false}
                  label="id"
                  validate={false}
                  name="id"
                  hidden={true}
                />
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
                        {checkEdit && (
                          <Button
                            className="ml-2"
                            type="primary "
                            size="small"
                            onClick={() => {
                              handleBack();
                            }}
                          >
                            Quay lại
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
