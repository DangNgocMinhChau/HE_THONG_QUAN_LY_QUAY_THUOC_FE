import React, { useEffect, useRef } from "react";
import {
  optionHinhThucThanhToan,
  optionPhanTramThue,
} from "./../../../common/data_options_select/optionSelect";
import { MinusCircleOutlined } from "@ant-design/icons";
import { Form, Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import * as acthoadonGTGT from "../../../actions/quanly_hoadon/actHoaDonGTGT";
import InputFormSelect from "../../../common/renderForm/inputFormSelect";
import InputFormDefault from "../../../common/renderForm/inputFormDefault";
import InputFormDatepiker from "../../../common/renderForm/inputFormDatepiker";

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

  const valueOnChange = (e) => {};

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
                <h1>H??A ????N GI?? TR??? GIA T??NG</h1>
                <h6>(B???n th??? hi???n c???a h??a ????n ??i???n t???)</h6>
                <h6>
                  <InputFormDatepiker
                    showLabel={false}
                    label="Ng??y th??ng n??m"
                    validate={false}
                    name="ngayHoaDon"
                    onChange={(e) => valueOnChange(e)}
                  />
                </h6>
              </div>
              <div className="col-md-2 mt-5">
                <h6 className="font-size-custom text-justify">
                  <InputFormDefault
                    showLabel={true}
                    label="M???u s???"
                    validate={false}
                    name="mauSo"
                  />
                </h6>
                <h6 className="font-size-custom text-justify">
                  <InputFormDefault
                    showLabel={true}
                    label="K?? hi???u"
                    validate={false}
                    name="kyHieu"
                  />
                </h6>
                <h6 className="font-size-custom text-justify">
                  <InputFormDefault
                    showLabel={true}
                    label="S???"
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
            <InputFormDefault
              showLabel={true}
              label="H??? t??n ng?????i mua"
              validate={false}
              name="hoTenNguoiMua"
            />
          </div>
          <div className="col-md-12 text-justify">
            <InputFormDefault
              showLabel={true}
              label="T??n ????n v???"
              validate={false}
              name="tenDonVi"
            />
          </div>
          <div className="col-md-12 text-justify">
            <InputFormDefault
              showLabel={true}
              label="M?? s??? thu???"
              validate={false}
              name="maSoThue"
            />
          </div>
          <div className="col-md-12 text-justify">
            <InputFormDefault
              showLabel={true}
              label="?????a ch???"
              validate={false}
              name="diaChi"
            />
          </div>
          <div className="col-md-6 text-justify">
            <InputFormSelect
              allowClear={true}
              showLabel={true}
              validate={false}
              name="thanhToan"
              label="Thanh to??n"
              options={optionHinhThucThanhToan}
            />
          </div>
          <div className="col-md-6 text-justify">
            <InputFormDefault
              showLabel={true}
              label="S??? t??i kho???n"
              validate={false}
              name="soTK"
            />
          </div>
          <div className="row"></div>
          <div className="col-md-12 mt-2">
            <table className="customtable center">
              <tr>
                <th width="10">STT</th>
                <th>T??n h??ng ho??,d???ch v???</th>
                <th>S??? l??</th>
                <th>H???n d??ng</th>
                <th width="70">??VT</th>
                <th width="70">S??? l?????ng</th>
                <th>????n gi??</th>
                <th>Th??nh ti???n</th>
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
                            <InputFormDefault
                              showLabel={false}
                              label="T??n h??ng ho??"
                              validate={false}
                              name={[name, "tenHangHoa"]}
                              fieldKey={[fieldKey, "tenHangHoa"]}
                              // style={{
                              //   width: "240px",
                              //   marginLeft: "15px",
                              // }}
                            />

                            <InputFormDefault
                              showLabel={false}
                              label="S??? l??"
                              validate={false}
                              name={[name, "soLo"]}
                              fieldKey={[fieldKey, "soLo"]}
                              // style={{
                              //   width: "150px",
                              //   marginLeft: "15px",
                              // }}
                            />
                            <InputFormDefault
                              showLabel={false}
                              label="H???n d??ng"
                              validate={false}
                              name={[name, "hanDung"]}
                              fieldKey={[fieldKey, "hanDung"]}
                              // style={{
                              //   width: "300px",
                              //   marginLeft: "20px",
                              // }}
                            />

                            <InputFormDefault
                              showLabel={false}
                              label="????n v??? t??nh"
                              validate={false}
                              name={[name, "donViTinh"]}
                              fieldKey={[fieldKey, "donViTinh"]}
                              // style={{
                              //   width: "50px",
                              //   marginLeft: "15px",
                              // }}
                            />
                            <InputFormDefault
                              showLabel={false}
                              label="S??? l?????ng"
                              validate={false}
                              name={[name, "soLuong"]}
                              fieldKey={[fieldKey, "soLuong"]}
                              // style={{
                              //   width: "50px",
                              //   marginLeft: "15px",
                              // }}
                            />
                            <InputFormDefault
                              showLabel={false}
                              label="????n gi??"
                              validate={false}
                              name={[name, "donGia"]}
                              fieldKey={[fieldKey, "donGia"]}
                              // style={{
                              //   width: "240px",
                              //   marginLeft: "15px",
                              // }}
                              inputNumber={true}
                            />
                            <InputFormDefault
                              showLabel={false}
                              label="Th??nh ti???n"
                              validate={false}
                              name={[name, "thanhTien"]}
                              fieldKey={[fieldKey, "thanhTien"]}
                              // style={{
                              //   width: "260px",
                              //   marginLeft: "15px",
                              // }}
                              inputNumber={true}
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
                  <InputFormDefault
                    showLabel={true}
                    label="C???ng ti???n h??ng"
                    validate={false}
                    name="congTienHang"
                    style={{ width: "1200px" }}
                    inputNumber={true}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-justify" colSpan={2}>
                  <InputFormSelect
                    showLabel={true}
                    label=" Thu??? su??t GTGT"
                    name="phanTramThue"
                    options={optionPhanTramThue}
                  />
                </td>
                <td
                  className="text-justify"
                  style={{ paddingLeft: "6%" }}
                  colSpan={6}
                >
                  <InputFormDefault
                    showLabel={true}
                    label="Ti???n thu??? GTGT"
                    validate={false}
                    name="tienThueGTGT"
                    style={{ width: "1000px" }}
                    inputNumber={true}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ paddingLeft: "2%" }} colSpan={8}>
                  <InputFormDefault
                    showLabel={true}
                    label="T???ng ti???n thanh to??n"
                    validate={false}
                    name="tongTienThanhToan"
                    style={{ width: "1000px" }}
                    inputNumber={true}
                  />
                </td>
                {/* <td className="text-justify inDam">1.945.030</td> */}
              </tr>
              <tr className="text-justify">
                <td colSpan={8}>
                  <InputFormDefault
                    showLabel={true}
                    label="S??? ti???n vi???t b???ng ch???"
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
            <b>Ng?????i mua h??ng</b>
            <div>(K??, ghi r?? h???, t??n)</div>
          </div>
          <div className="col-md-4">
            <b>Ng?????i b??n h??ng</b>
            <div>(K??, ghi r?? h???, t??n)</div>
          </div>
          <div className="col-md-4">
            <b>Th??? tr?????ng ????n v???</b>
            <div>(K??, ????ng d???u, ghi r?? h??? t??n)</div>
          </div>
        </div>
        <div style={{ paddingTop: "6%" }} className="row  text-justify ">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-8"></div>
              <div className="col-md-4">
                <div className="col-md-12 ">
                  <div>
                    <InputFormDefault
                      showLabel={true}
                      label="K?? b???i"
                      validate={false}
                      name="kyBoi"
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-5">
                  <div>
                    <InputFormDatepiker
                      showLabel={true}
                      label="K?? ng??y"
                      validate={false}
                      name="ngayKy"
                    />
                  </div>
                </div>
                <InputFormDefault
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
                          {checkEdit ? "S???a" : "Th??m"}
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
                            Quay l???i
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
