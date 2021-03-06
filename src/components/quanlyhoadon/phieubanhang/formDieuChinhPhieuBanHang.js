import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Divider, Button, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import * as actKhoThuoc from "../../../actions/quanlykho/actQuanLyKho";
import * as message from "../../../constants/Message";
import { thongBao } from "../../../common/renderThongBao/renderThongBaoCommon";
import * as actHoaDonHoaDonDaHoanTat from "../../../actions/quanly_hoadon_ban_thanhcong/actQuanLyHoaDonBanThanhCong";
import InputFormDefault from "../../../common/renderForm/inputFormDefault";
import InputFormTextArea from "../../../common/renderForm/inputFormTextArea";
import InputFormSelect from "../../../common/renderForm/inputFormSelect";
export default function FormDieuChinhPhieuBanHang({
  onSave,
  cancel,
  checkEdit,
  isVisible,
  setCheckSubmitForm,
}) {
  const itemThuoc = useSelector((state) => state.khothuoc.item);
  const [form] = useForm();
  const dispatch = useDispatch();
  const initialValue = useSelector(
    (state) => state.quanly_hoadon.phieubanhang.item
  );

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
  const onFinish = (value) => {
    let arrId = [];
    let arrCount = [];
    let checkSubmit = false;
    value.sanPham.map((item, index) => {
      arrId.push(item.idThuoc);
      var counts = {};
      for (var i = 0; i < arrId.length; i++) {
        var num = arrId[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
        arrCount.push(counts[num]);
      }
    });

    arrCount.map((item, index) => {
      if (item >= 2) {
        checkSubmit = false;
      } else {
        checkSubmit = true;
      }
    });
    if (checkSubmit) {
      if (value.id) {
        let idXoa = [];
        let idSanPhamDangCo = [];
        initialValue.sanPham.map((item) => {
          idXoa.push(item.id);
        });

        value.sanPham.map((item, index) => {
          idSanPhamDangCo.push(item.id);
        });

        for (let i = 0; i < idXoa.length; i++) {
          if (!idSanPhamDangCo.includes(idXoa[i])) {
            dispatch(
              actHoaDonHoaDonDaHoanTat.actDeleteSanPhamThanhCongRequest(
                idXoa[i]
              )
            );
          } else {
          }
        }
        onSave(value);
      }
    } else {
      thongBao(
        "Th??ng b??o !",
        " Vui l??ng ki???m tra l???i th??ng tin, c?? t??n thu???c tr??ng nhau !"
      );
    }
  };
  const onFinishFailed = (errorInfo) => {};

  useEffect(() => {
    dispatch(actKhoThuoc.actFetchKhoThuocRequest());
  }, []);

  useEffect(() => {
    form.setFieldsValue(dataInitialValue);
  }, [initialValue, form]);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  const onShowValue = (idThuoc) => {
    dispatch(actKhoThuoc.actGetKhoThuocByIdRequest(idThuoc));
  };
  const onShowSoLuong = (e, value) => {
    if (e.target.value > itemThuoc.soLuongNhap - itemThuoc.soLuongDaBan) {
      thongBao(
        message.THONG_BAO,
        `Thu???c ${itemThuoc.tenThuoc} trong kho ch??? c??n: ${
          itemThuoc.soLuongNhap - itemThuoc.soLuongDaBan
        }/${itemThuoc.donViTinh}`
      );
    }
  };
  let dataListThuoc = useSelector((state) => state.khothuoc.list);
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
            <Divider plain>Phi???u ghi</Divider>
            <Form.Item
              label="id"
              name="id"
              hidden={true}
              // rules={[{ required: true, message: "Vui l??ng nh???p t??n nh?? h??ng!" }]}
            >
              <Input />
            </Form.Item>

            <div className="row">
              <div className="col-md-2">
                <p>S???n ph???m</p>
              </div>
              <div className="col-md-10">
                <Form.List name="sanPham">
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
                                label="ch???n thu???c"
                                name={[name, "idThuoc"]}
                                fieldKey={[fieldKey, "idThuoc"]}
                                style={{ width: isVisible ? "350px" : "660px" }}
                                onChange={onShowValue}
                                options={dataListThuoc}
                                validate={true}
                                search={true}
                              />
                            </div>
                          </div>

                          <InputFormDefault
                            {...restField}
                            name={[name, "soLuongMua"]}
                            fieldKey={[fieldKey, "soLuongMua"]}
                            onChange={onShowSoLuong}
                            style={{ width: isVisible ? "150px" : "330px" }}
                            validate={true}
                            label="S??? l?????ng mua"
                            inputNumber={true}
                          />

                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}

                      <Form.Item>
                        <a type="dashed" onClick={() => add()}>
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </a>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>
            </div>
          </div>

          <InputFormDefault
            label="ng??y tao b???n ghi"
            name="ngayTaoBanGhi"
            hidden={true}
          />
        </div>
        <div className="row">
          <div className="col-md-2">
            <p>L?? do ch???nh s???a</p>
          </div>
          <InputFormTextArea name="noiDungChinhSua" label="L?? do ch???nh s???a" />
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
                  {checkEdit ? "S???a" : "Th??m"}
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
