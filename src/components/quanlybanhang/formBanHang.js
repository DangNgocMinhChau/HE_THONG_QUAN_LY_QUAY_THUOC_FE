import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Select, Divider, Button, Space, InputNumber } from "antd";
import { useForm } from "antd/lib/form/Form";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import * as actKhoThuoc from "./../../actions/quanlykho/actQuanLyKho";
import * as actQuanLyThongTinKhachHang from "./../../actions/quanlythongtinkhachhang/actQuanLyThongTinKhachHang";
import * as actQuanLyBanHang from "./../../actions/quanlybanhang/actQuanLyBanHang";
import * as message from "./../../constants/Message";
import { thongBao } from "./../../constants/message/thongBao";
import {
  RenderInput,
  RenderInputNumber,
  RenderInputSelectSearch,
} from "../../common/renderForm/inputForm";
function FormBanHang({
  onSave,
  cancel,
  checkEdit,
  isVisible,
  checkFormThemMoiKhachHang,
  onSaveThemMoiKhachHang,
}) {
  const listThuoc = useSelector((state) => state.khothuoc.list);
  const itemThuoc = useSelector((state) => state.khothuoc.item);
  const itemThongTinKhachHang = useSelector(
    (state) => state.quanlythongtinkhachhang.item
  );
  const listThongTinKhachHang = useSelector(
    (state) => state.quanlythongtinkhachhang.list
  );

  const account_current = useSelector(
    (state) => state.quanlylogin.account_current
  );
  const formRef = useRef();
  const [form] = useForm();
  const dispatch = useDispatch();
  const initialValue = useSelector((state) => state.quanlybanhang.item);

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
  const onFinishThongTinKhachHang = (value) => {};

  const onFinish = (value) => {
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
          dispatch(actQuanLyBanHang.actDeleteSanPhamRequest(idXoa[i]));
        } else {
        }
      }

      let sanPham = [];
      value.sanPham.map((item, index) => {
        if (item.id) {
          item = { ...item };
          sanPham.push(item);
        } else {
          item = { ...item, id: null };
          sanPham.push(item);
        }
      });
      value = {
        ...value,
        sanPham: sanPham,
      };
      onSave(value);
    } else {
      value = {
        ...value,
        soDienThoaiKhachHang: itemThongTinKhachHang.soDienThoai,
        idKhachHang: itemThongTinKhachHang.id,
        tenKhachHang: itemThongTinKhachHang.tenKhachHang,
        nguoiTaoId: account_current.id,
      };
      onSave(value);
    }
  };
  const onFinishFailed = (errorInfo) => {};

  useEffect(() => {
    dispatch(actKhoThuoc.actFetchKhoThuocRequest());
    dispatch(actQuanLyThongTinKhachHang.actFetchThongTinKhachHangRequest());
  }, []);

  useEffect(() => {
    form.setFieldsValue(dataInitialValue);
  }, [initialValue, form]);

  useEffect(() => {
    form.resetFields();
  }, [form]);
  const onShowValue = (value) => {
    dispatch(actKhoThuoc.actGetKhoThuocByIdRequest(value));
  };

  const changeValue = () => {
    formRef.current?.setFieldsValue({
      tenKhachHang: itemThongTinKhachHang
        ? itemThongTinKhachHang.tenKhachHang
        : "",
    });
  };
  useEffect(() => {
    changeValue();
  }, [itemThongTinKhachHang]);

  const onChangeSDTKhachHang = (value) => {
    dispatch(
      actQuanLyThongTinKhachHang.actGetThongTinKhachHangByIdRequest(value)
    );
  };

  const onShowSoLuong = (e, value) => {
    if (e.target.value > itemThuoc.soLuongNhap - itemThuoc.soLuongDaBan) {
      thongBao(
        message.THONG_BAO,
        `Thuốc ${itemThuoc.tenThuoc} trong kho chỉ còn: ${
          itemThuoc.soLuongNhap - itemThuoc.soLuongDaBan
        }/${itemThuoc.donViTinh}`
      );
    }
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        ref={formRef}
        className="test-alight"
      >
        <div className="row m-0 p-0 ">
          <div className="col-md-12 ">
            <Divider plain>Phiếu ghi</Divider>
            <RenderInput label="id" name="id" hidden={true} />
            <RenderInput label="id" name="idKhachHang" hidden={true} />
            <RenderInput label="id" name="nguoiTaoId" hidden={true} />

            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <p>Tên khách hàng</p>
                  </div>
                  <div className="col-md-8">
                    <RenderInput label="Tên khách hàng" name="tenKhachHang" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <p>số điện thoại khách hàng</p>
                  </div>
                  <div className="col-md-8">
                    <RenderInputSelectSearch
                      name="soDienThoaiKhachHang"
                      validate={true}
                      onChange={onChangeSDTKhachHang}
                      label="Tìm số điện thoại khách hàng"
                      options={listThongTinKhachHang}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <p>Thuốc</p>
              </div>
              <div className="col-md-10">
                <Form.List name="sanPham">
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
                          <div className="row">
                            <div className="col-md-10">
                              <RenderInputSelectSearch
                                {...restField}
                                name={[name, "idThuoc"]}
                                fieldKey={[fieldKey, "idThuoc"]}
                                validate={true}
                                style={{ width: isVisible ? "350px" : "660px" }}
                                onChange={onShowValue}
                                label="Chọn thuốc"
                                options={listThuoc}
                              />
                            </div>
                          </div>

                          <RenderInputNumber
                            {...restField}
                            label="Số lượng mua"
                            name={[name, "soLuongMua"]}
                            fieldKey={[fieldKey, "soLuongMua"]}
                            validate={true}
                            onChange={onShowSoLuong}
                            style={{ width: isVisible ? "150px" : "330px" }}
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

          <Form.Item
            label="ngày tao bản ghi"
            name="ngayTaoBanGhi"
            hidden={true}
          >
            <Input />
          </Form.Item>
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
