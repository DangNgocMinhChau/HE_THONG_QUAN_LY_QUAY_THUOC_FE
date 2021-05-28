import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Select, Divider, Button, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import * as actKhoThuoc from "../../actions/quanlykho/actQuanLyKho";
import * as message from "../../constants/Message";
import * as noidung from "../../constants/noiDungThongBao";
import { thongBao } from "../../constants/message/thongBao";
import {
  RenderInput,
  RenderInputNumber,
  RenderInputSelectSearch,
} from "../../common/renderForm/inputForm";
function FormBanHang({ onSave, cancel, checkEdit, isVisible }) {
  const listThuoc = useSelector((state) => state.khothuoc.list);
  const itemThuoc = useSelector((state) => state.khothuoc.item);
  const itemHoaDonThanhCong = useSelector(
    (state) => state.quanly_hoadon_ban_thanhcong.item
  );
  const [form] = useForm();
  const dispatch = useDispatch();
  const initialValue = useSelector(
    (state) => state.quanly_hoadon_ban_thanhcong.item
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
    if (value.id) {
      value = {
        ...itemHoaDonThanhCong,
        sanPham: value.sanPham,
      };
      onSave(value);
    } else {
      let sanPham = [];
      value.sanPham.map((item, index) => {
        if (
          Array.isArray(
            listThuoc.filter((itemThuoc) => itemThuoc.id === item.idThuoc)
          ) &&
          listThuoc.filter((itemThuoc) => itemThuoc.id === item.idThuoc)
            .length >= 1 &&
          listThuoc.filter((itemThuoc) => itemThuoc.id === item.idThuoc)
        ) {
          let sanPhamItem = {
            ...listThuoc.filter(
              (itemThuoc) => itemThuoc.id === item.idThuoc
            )[0],
            ...item,
          };
          sanPham.push(sanPhamItem);
        }
        value = {
          ...value,
          sanPham: sanPham,
        };
      });
      onSave(value);
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

  const onShowValue = (value) => {
    dispatch(actKhoThuoc.actGetKhoThuocByIdRequest(value));
    dataListThuoc = dataListThuoc.filter((item) => item.id !== value);
  };
  const onShowSoLuong = (e, value) => {
    if (e.target.value > itemThuoc.soLuongNhap - itemThuoc.soLuongDaBan) {
      thongBao(message.THONG_BAO, noidung.KHONG_DU_THUOC);
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
            <Divider plain>Phiếu ghi</Divider>
            <Form.Item
              label="id"
              name="id"
              hidden={true}
              // rules={[{ required: true, message: "Vui lòng nhập tên nhà hàng!" }]}
            >
              <Input />
            </Form.Item>

            <div className="row">
              <div className="col-md-2">
                <p>Sản phẩm</p>
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
                              <RenderInputSelectSearch
                                {...restField}
                                label="chọn thuốc"
                                name={[name, "idThuoc"]}
                                fieldKey={[fieldKey, "idThuoc"]}
                                style={{ width: isVisible ? "350px" : "660px" }}
                                onChange={onShowValue}
                                options={dataListThuoc}
                                validate={true}
                              />
                            </div>
                          </div>

                          <RenderInputNumber
                            {...restField}
                            name={[name, "soLuongMua2"]}
                            fieldKey={[fieldKey, "soLuongMua2"]}
                            onChange={onShowSoLuong}
                            style={{ width: isVisible ? "150px" : "330px" }}
                            validate={true}
                            label="Số lượng mua"
                          />

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
          </div>

          <RenderInput
            label="ngày tao bản ghi"
            name="ngayTaoBanGhi"
            hidden={true}
          />
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

export default FormBanHang;
