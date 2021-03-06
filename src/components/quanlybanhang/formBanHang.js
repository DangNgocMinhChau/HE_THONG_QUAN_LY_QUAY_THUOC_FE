import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Divider, Button, Space, Tooltip } from "antd";
import { useForm } from "antd/lib/form/Form";
import { MinusCircleOutlined } from "@ant-design/icons";
import * as actKhoThuoc from "./../../actions/quanlykho/actQuanLyKho";
import * as actQuanLyThongTinKhachHang from "./../../actions/quanlythongtinkhachhang/actQuanLyThongTinKhachHang";
import * as actQuanLyBanHang from "./../../actions/quanlybanhang/actQuanLyBanHang";
import * as message from "./../../constants/Message";
import { thongBao } from "./../../common/renderThongBao/renderThongBaoCommon";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import PhieuBanHang from "./phieuBanHang";
import InputFormDefault from "../../common/renderForm/inputFormDefault";
import InputFormSelect from "../../common/renderForm/inputFormSelect";
function FormBanHang({
  onSave,
  checkEdit,
  isVisible,
  onEdit,
  hoanTatThanhToan,
  itemHoaDon,
  handleHuyDonDatHangTam,
  listHoaDonBanHangTam,
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

  const dataHoaDon = useSelector((state) => state.quanlybanhang.itemHoaDon);

  const formRef = useRef();
  const [form] = useForm();
  const dispatch = useDispatch();
  const initialValue = useSelector((state) => state.quanlybanhang.itemHoaDon);
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

  const resetFieldSauKhiHoanTat = (value) => {
    form.resetFields();
  };

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
        if (initialValue !== null) {
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
          thongBao("Th??ng b??o !", "Vui l??ng reset l???i form ????? th??m ho?? ????n !");
        }
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
    dispatch(actQuanLyThongTinKhachHang.actFetchThongTinKhachHangRequest());
  }, []);

  useEffect(() => {
    form.setFieldsValue(dataInitialValue);
  }, [initialValue, form]);

  useEffect(() => {
    form.resetFields();
  }, [form]);

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
        `Thu???c ${itemThuoc.tenThuoc} trong kho ch??? c??n: ${
          itemThuoc.soLuongNhap - itemThuoc.soLuongDaBan
        }/${itemThuoc.donViTinh}`
      );
    }
  };
  return (
    <>
      <div className="row m-0 p-0 ">
        <div className="col-md-9">
          <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            ref={formRef}
            className="test-alight"
          >
            <Divider plain>Phi???u ghi</Divider>
            <InputFormDefault label="id" name="id" hidden={true} />
            <InputFormDefault label="id" name="idKhachHang" hidden={true} />
            <InputFormDefault label="id" name="nguoiTaoId" hidden={true} />
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <p>T??n kh??ch h??ng</p>
                  </div>
                  <div className="col-md-7">
                    <InputFormDefault
                      label="T??n kh??ch h??ng"
                      name="tenKhachHang"
                    />
                  </div>
                  {itemThongTinKhachHang !== {} && (
                    <div className="col-md-1">
                      <Tooltip title="T??m h??a ????n">
                        <NavLink
                          to={{
                            pathname: `phieubanhangtheokhachhang/${
                              itemThongTinKhachHang
                                ? itemThongTinKhachHang.id
                                  ? itemThongTinKhachHang.id
                                  : 0
                                : 0
                            }`,
                            dataKhachHang:
                              itemThongTinKhachHang && itemThongTinKhachHang,
                          }}
                        >
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </NavLink>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <p>S??T</p>
                  </div>
                  <div className="col-md-8">
                    <InputFormSelect
                      name="soDienThoaiKhachHang"
                      validate={true}
                      onChange={onChangeSDTKhachHang}
                      label="T??m s??? ??i???n tho???i kh??ch h??ng"
                      options={listThongTinKhachHang}
                      search={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-2">
                <p>S???n ph???m</p>
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
                              <InputFormSelect
                                {...restField}
                                name={[name, "idThuoc"]}
                                fieldKey={[fieldKey, "idThuoc"]}
                                validate={true}
                                style={{
                                  width: isVisible ? "150px" : "300px",
                                }}
                                onChange={onShowValue}
                                label="Ch???n thu???c"
                                options={listThuoc}
                                search={true}
                              />
                            </div>
                          </div>

                          <InputFormDefault
                            {...restField}
                            label="S??? l?????ng mua"
                            name={[name, "soLuongMua"]}
                            fieldKey={[fieldKey, "soLuongMua"]}
                            validate={true}
                            onChange={onShowSoLuong}
                            style={{ width: isVisible ? "150px" : "330px" }}
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
              </div>

              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <p>Ti???n nh???n</p>
                  </div>
                  <div className="col-md-8">
                    <InputFormDefault
                      label="Ti???n nh???n"
                      name="tienNhan"
                      style={{ width: "1000px" }}
                      inputNumber={true}
                    />
                  </div>
                </div>
              </div>
              <Form.Item
                label="ng??y tao b???n ghi"
                name="ngayTaoBanGhi"
                hidden={true}
              >
                <InputFormDefault />
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
                      {checkEdit ? "S???a" : "L??u"}
                    </Button>
                    <Button
                      onClick={() => {
                        resetFieldSauKhiHoanTat();
                      }}
                      className="ml-2"
                      type="seconed"
                      size="small"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </Form.Item>
          </Form>
        </div>
        <div className="col-md-3">
          <PhieuBanHang
            dataHoaDon={dataHoaDon}
            onEdit={onEdit}
            listHoaDonBanHangTam={listHoaDonBanHangTam}
            handleHuyDonDatHangTam={handleHuyDonDatHangTam}
            itemHoaDon={itemHoaDon}
            hoanTatThanhToan={hoanTatThanhToan}
          />
        </div>
      </div>
    </>
  );
}

export default FormBanHang;
