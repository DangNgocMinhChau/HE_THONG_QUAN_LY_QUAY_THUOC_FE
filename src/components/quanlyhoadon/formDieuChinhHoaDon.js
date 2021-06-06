import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Select, Divider, Button, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import * as actKhoThuoc from "../../actions/quanlykho/actQuanLyKho";
import * as message from "../../constants/Message";
import * as noidung from "../../constants/noiDungThongBao";
import { thongBao } from "../../constants/message/thongBao";
import * as actHoaDonHoaDonDaHoanTat from "../../actions/quanly_hoadon_ban_thanhcong/actQuanLyHoaDonBanThanhCong";
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
  setCheckSubmitForm,
}) {
  const listThuoc = useSelector((state) => state.khothuoc.list);
  const itemThuoc = useSelector((state) => state.khothuoc.item);
  const itemHoaDonThanhCong = useSelector(
    (state) => state.quanly_hoadon_ban_thanhcong.item
  );
  const itemThongTinKhachHang = useSelector(
    (state) => state.quanlythongtinkhachhang.item
  );
  const [form] = useForm();
  const dispatch = useDispatch();
  const initialValue = useSelector(
    (state) => state.quanly_hoadon_ban_thanhcong.item
  );
  const account_current = useSelector(
    (state) => state.quanlylogin.account_current
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
            actHoaDonHoaDonDaHoanTat.actDeleteSanPhamThanhCongRequest(idXoa[i])
          );
        } else {
        }
      }

      let sanPham = [];
      value.sanPham.map((item, index) => {
        if (item.id) {
          item = { ...item, soLuongMua: item.soLuongMua2 };
          sanPham.push(item);
        } else {
          item = {
            ...item,
            soLuongMua: item.soLuongMua2,
            soLuongDaBan: listThuoc.filter(
              (itemThuoc) => itemThuoc.id === item.idThuoc
            )[0].soLuongDaBan,
            id: null,
          };
          sanPham.push(item);
        }
      });
      value = {
        ...value,
        sanPham: sanPham,
        soDienThoaiKhachHang: dataInitialValue.soDienThoaiKhachHang,
        idKhachHang: dataInitialValue.idKhachHang,
        tenKhachHang: dataInitialValue.tenKhachHang,
        nguoiTaoId: dataInitialValue.nguoiTaoId,
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
  }, []);

  useEffect(() => {
    form.setFieldsValue(dataInitialValue);
  }, [initialValue, form]);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  const onShowValue = (idThuoc) => {
    dispatch(actKhoThuoc.actGetKhoThuocByIdRequest(idThuoc));
    dataListThuoc = dataListThuoc.filter((item) => item.id !== idThuoc);

    itemHoaDonThanhCong.sanPham.map((item, index) => {
      if (item.idThuoc === idThuoc) {
        thongBao(message.THONG_BAO, noidung.THUOC_DA_DUOC_CHON);
        setCheckSubmitForm(true);
      } else {
        setCheckSubmitForm(false);
      }
    });
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
