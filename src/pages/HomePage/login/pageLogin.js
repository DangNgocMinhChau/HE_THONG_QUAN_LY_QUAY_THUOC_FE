import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as act from "./../../../actions/quanlytaikhoan/actQuanLyTaiKhoan";
import ModalQuanLyTaiKhoan from "../../../components/quanlytaikhoan/modalQuanLyTaiKhoan";
import moment from "moment";
import FormDangNhap from "../../../components/login/formDangNhap";
import FormResetPass from "../../../components/login/formResetPass";
import FormDoiMatKhau from "../../../components/login/formDoiMatKhau";
import FormYeuCauMoKhoaTaiKhoan from "../../../components/login/formYeuCauMoKhoaTaiKhoan";
import queryString from "query-string";

import {
  thongBao,
  openMessageLoading,
} from "./../../../common/renderThongBao/renderThongBaoCommon";
import * as Message from "./../../../constants/Message";
import * as NoiDung from "./../../../constants/noiDungThongBao";
var md5 = require("md5");
function PageLogin(props) {
  const [visible, setVisible] = useState(false);
  const [checkResetPass, setCheckResetPass] = useState(false);
  const [checkFormDangNhap, setCheckFormDangNhap] = useState(true);
  const [checkOnchangePass, setCheckOnchangePass] = useState(false);
  const [checkFomMoKhoaTaiKhoan, setCheckFomMoKhoaTaiKhoan] = useState(false);
  const [checkCMND, setCheckCMND] = useState();
  const listDataUser = useSelector((state) => state.quanlytaikhoan.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("login")) {
      dispatch(
        act.actGetTaiKhoanByIdInApplicationRequest(
          localStorage.getItem("login")
        )
      );
    }
  }, []);

  const onFinish = (values) => {
    const queryStringParam = queryString.stringifyUrl({
      url: "quanlytaikhoan/login",
      query: { account: values.user, password: values.password },
    });
    dispatch(act.actLoginTaiKhoan(queryStringParam, setLoginThanhCong));
    // let dataUserLogin = listDataUser.filter(
    //   (item) =>
    //     item.tenDangNhap === values.user &&
    //     item.matKhau === md5(`${values.password}`)
    // );
    // if (dataUserLogin.length > 0) {
    //   if (dataUserLogin[0]?.lockUser) {
    //     thongBao(Message.DANG_NHAP_LOI, NoiDung.TAI_KHOAN_BI_KHOA);
    //   } else {
    //     dispatch(act.actLoginUserSuccess(dataUserLogin));
    //     localStorage.setItem("login", dataUserLogin[0].id);
    //     thongBao(Message.DANG_NHAP_THANH_CONG, NoiDung.DANG_NHAP_THANH_CONG);
    //   }
    // } else {
    //   thongBao(Message.DANG_NHAP_LOI, NoiDung.TAI_KHOAN_KHONG_DUNG);

    //   countLoginFail++;
    //   if (countLoginFail == 10) {
    //     thongBao(Message.THONG_BAO, NoiDung.CANH_BAO_DANG_NHAP_SAI_10_LAN);
    //     let id = listDataUser.filter(
    //       (item) => item.tenDangNhap == values.user
    //     )[0]?.id;
    //     dispatch(act.actGetTaiKhoanByIdLoginFailRequest(id));
    //   } else if (countLoginFail > 5) {
    //     thongBao(Message.THONG_BAO, NoiDung.CANH_BAO_DANG_NHAP_SAI);
    //   }
    // }
  };
  let countLoginFail = 0;

  const setLoginThanhCong = (value) => {
    if (value.dangNhapThanhCong) {
      if (value.lockUser) {
        thongBao(Message.DANG_NHAP_LOI, NoiDung.TAI_KHOAN_BI_KHOA);
      } else {
        localStorage.setItem("login", value.id);
        thongBao(Message.DANG_NHAP_THANH_CONG, NoiDung.DANG_NHAP_THANH_CONG);
      }
    } else {
      thongBao(Message.DANG_NHAP_LOI, NoiDung.TAI_KHOAN_KHONG_DUNG);
      // if (countLoginFail == 10) {
      //   thongBao(Message.THONG_BAO, NoiDung.CANH_BAO_DANG_NHAP_SAI_10_LAN);
      //   let id = listDataUser.filter(
      //     (item) => item.tenDangNhap == value.user
      //   )[0]?.id;
      //   dispatch(act.actGetTaiKhoanByIdLoginFailRequest(id));
      // } else if (countLoginFail > 5) {
      //   thongBao(Message.THONG_BAO, NoiDung.CANH_BAO_DANG_NHAP_SAI);
      // }
    }
  };

  const dangKyTaiKhoan = () => {
    setVisible(true);
  };
  const cancel = () => {
    setVisible(false);
  };
  const onSave = (value) => {
    if (!checkCMND) {
      if (value.id) {
        value = {
          ...value,
          matKhau: md5(`${value.matKhau}`),
          xacNhanMatKhau: md5(`${value.xacNhanMatKhau}`),
          matKhauGoc: value.matKhau,
          flag: "false",
          ngayChinhSua: moment().format("DD/MM/yyyy HH:mm:ss "),
        };
        dispatch(act.actUpdateTaiKhoanRequest(value));
      } else {
        value = {
          ...value,
          flag: "true",
          matKhau: md5(`${value.matKhau}`),
          xacNhanMatKhau: md5(`${value.xacNhanMatKhau}`),
          matKhauGoc: value.matKhau,
          ngayTaoBanGhi: moment().format("DD/MM/yyyy HH:mm:ss "),
        };
        dispatch(act.actCreateTaiKhoanRequest(value));
      }
      cancel();
    } else {
      thongBao("Thông báo", "Vui lòng kiểm tra lại thông tin");
    }
  };

  const onResetPass = (value) => {
    let accountReset = listDataUser.filter(
      (item) =>
        item.tenDangNhap == value.user &&
        item.cmnd == value.cmnd &&
        item.soDienThoai == value.soDienThoai
    );
    if (accountReset.length > 0) {
      let message = `Mật khẩu của bạn là : ${accountReset[0]?.matKhauGoc}`;
      openMessageLoading(message);
    } else {
      thongBao(Message.THONG_BAO, NoiDung.CANH_BAO_SAI_THONG_TIN);
    }
  };
  const resetMatKhau = () => {
    setCheckResetPass(true);
    setCheckOnchangePass(false);
    setCheckFomMoKhoaTaiKhoan(false);
    setCheckFormDangNhap(false);
  };

  const backDangNhap = () => {
    setCheckResetPass(false);
    setCheckOnchangePass(false);
    setCheckFomMoKhoaTaiKhoan(false);
    setCheckFormDangNhap(true);
  };

  const onChangPass = () => {
    setCheckResetPass(false);
    setCheckOnchangePass(true);
    setCheckFomMoKhoaTaiKhoan(false);
    setCheckFormDangNhap(false);
  };

  const onChangePass = (value) => {
    let data = listDataUser.filter(
      (item) =>
        item.tenDangNhap === value.user && item.matKhauGoc === value.matKhauCu
    );
    if (data.length > 0) {
      value = {
        ...data[0],
        matKhau: md5(`${value.matKhauMoi}`),
        xacNhanMatKhau: md5(`${value.matKhauMoi}`),
        matKhauGoc: value.matKhauMoi,
        ngayChinhSua: moment().format("DD/MM/yyyy HH:mm:ss "),
      };
      dispatch(act.actChangePasssTaiKhoanRequest(value));
      setCheckResetPass(false);
      setCheckOnchangePass(false);
      setCheckFormDangNhap(true);
      setCheckFomMoKhoaTaiKhoan(false);
      openMessageLoading("Đổi tài khoản thành công");
    } else {
      thongBao(Message.THONG_BAO, NoiDung.CANH_BAO_SAI_THONG_TIN_DOI_MAT_KHAU);
    }
  };

  const moKhoaTaiKhoan = () => {
    setCheckFomMoKhoaTaiKhoan(true);
    setCheckResetPass(false);
    setCheckOnchangePass(false);
    setCheckFormDangNhap(false);
  };

  const onYeuCauMoKhoa = (value) => {
    let data = listDataUser.filter(
      (item) => item.tenDangNhap === value.user && item.cmnd === value.cmnd
    );
    if (data.length > 0) {
      value = {
        ...data[0],
        ngayChinhSua: moment().format("DD/MM/yyyy HH:mm:ss "),
      };
      dispatch(act.actCreateUserChoUnlockRequest(value));
      dispatch(act.actCreateThongBaoRequest(value));

      setCheckFomMoKhoaTaiKhoan(false);
      setCheckResetPass(false);
      setCheckOnchangePass(false);
      setCheckFormDangNhap(true);
      openMessageLoading("Yêu cầu mở khóa tài khoản thành công !");
    } else {
      thongBao(
        Message.THONG_BAO,
        NoiDung.CANH_BAO_SAI_THONG_TIN_DE_MO_TAI_KHOAN
      );
    }
  };

  return (
    <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
      <div className="card card0 border-0">
        <div className="row d-flex">
          <div className="col-lg-6">
            <div className="card1 pb-5">
              <div className="row">
                {" "}
                <img
                  src="https://i.imgur.com/CXQmsmF.png"
                  className="logo"
                />{" "}
              </div>
              <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                {" "}
                <img
                  src="https://i.imgur.com/uNGdWHi.png"
                  className="image"
                />{" "}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card2 card border-0 px-4 py-5">
              <div className="row mb-4 px-3">
                <h6 className="mb-0 mr-4 mt-2">Đăng nhập với</h6>
                <div className="facebook text-center mr-3">
                  <div className="fa fa-facebook"></div>
                </div>
                <div className="twitter text-center mr-3">
                  <div className="fa fa-twitter"></div>
                </div>
                <div className="linkedin text-center mr-3">
                  <div className="fa fa-linkedin"></div>
                </div>
              </div>
              <div className="row px-3 mb-4">
                <div className="line"></div>{" "}
                <small className="or text-center">Hoặc</small>
                <div className="line"></div>
              </div>
              <div>
                {checkFormDangNhap && (
                  <FormDangNhap
                    resetMatKhau={resetMatKhau}
                    onFinish={onFinish}
                  />
                )}
                {checkResetPass && <FormResetPass onResetPass={onResetPass} />}

                {checkOnchangePass && (
                  <FormDoiMatKhau onChangePass={onChangePass} />
                )}

                {checkFomMoKhoaTaiKhoan && (
                  <FormYeuCauMoKhoaTaiKhoan onYeuCauMoKhoa={onYeuCauMoKhoa} />
                )}
              </div>
              {checkFormDangNhap && (
                <>
                  <div className="row mb-4 px-3">
                    {" "}
                    <small className="font-weight-bold">
                      Bạn chưa có tài khoản ?{" "}
                      <a
                        className="text-danger "
                        onClick={() => dangKyTaiKhoan()}
                      >
                        Đăng ký{" "}
                      </a>
                    </small>{" "}
                  </div>
                  <div className="row mb-4 px-3">
                    {" "}
                    <small className="font-weight-bold">
                      <a
                        className="text-primary "
                        onClick={() => moKhoaTaiKhoan()}
                      >
                        Tài khoản bị khóa{" "}
                      </a>
                    </small>{" "}
                  </div>
                </>
              )}

              {checkResetPass && (
                <div className="row mb-4 px-3">
                  {" "}
                  <small className="font-weight-bold">
                    <a
                      className="font-weight-bold mr-5"
                      onClick={() => backDangNhap()}
                    >
                      Đăng nhập{" "}
                    </a>
                    <a className="text-danger " onClick={() => onChangPass()}>
                      Đổi mật khẩu{" "}
                    </a>
                  </small>{" "}
                </div>
              )}

              {checkFomMoKhoaTaiKhoan && (
                <div className="row mb-4 px-3">
                  {" "}
                  <small className="font-weight-bold">
                    <a
                      className="font-weight-bold mr-5"
                      onClick={() => backDangNhap()}
                    >
                      Đăng nhập{" "}
                    </a>
                  </small>{" "}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-blue py-4">
          <div className="row px-3">
            {" "}
            <small className="ml-4 ml-sm-5 mb-2">Quản lý quầy thuốc</small>
            <div className="social-contact ml-4 ml-sm-auto">
              {" "}
              <span className="fa fa-facebook mr-4 text-sm"></span>{" "}
              <span className="fa fa-google-plus mr-4 text-sm"></span>{" "}
              <span className="fa fa-linkedin mr-4 text-sm"></span>{" "}
              <span className="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>{" "}
            </div>
          </div>
        </div>
      </div>
      <ModalQuanLyTaiKhoan
        isVisible={visible}
        handleCancel={() => cancel()}
        onSave={onSave}
        checkCMND={setCheckCMND}
      />
    </div>
  );
}

export default PageLogin;
