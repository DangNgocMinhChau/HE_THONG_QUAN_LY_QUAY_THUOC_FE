import React from "react";
import moment from "moment";
import {
  renderConverLoaiThanhToan,
  renderTien,
} from "./../../../../common/convert/renderConvert";
export default function HoaDonGTGT({ listDanhSacHoaDonGTGT, handleRecovery }) {
  return (
    <>
      {listDanhSacHoaDonGTGT.map((item, index) => {
        let ngayHoaDon = moment(item.ngayHoaDon).format("DD/MM/YYYY");
        return (
          <>
            <div className="bg-hoadongtgt m-5">
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-10">
                  <div className="row m-0">
                    <div className="col-md-2"></div>
                    <div className="col-md-6 mt-5 ">
                      <h1>
                        <a> HÓA ĐƠN GIÁ TRỊ GIA TĂNG </a>
                      </h1>
                      <h6>(Bản thể hiện của hóa đơn điện tử)</h6>
                      <h6>
                        {`Ngày ${ngayHoaDon.split("/")[0]} tháng ${
                          ngayHoaDon.split("/")[1]
                        } năm ${ngayHoaDon.split("/")[2]} `}
                      </h6>
                    </div>
                    <d iv className="col-md-2 mt-5">
                      <h6 className="font-size-custom text-justify">
                        Mẫu số: {item.mauSo}
                      </h6>
                      <h6 className="font-size-custom text-justify">
                        Ký hiệu: {item.kyHieu}
                      </h6>
                      <h6 className="font-size-custom text-justify">
                        Số: <b>{item.so}</b>
                      </h6>
                    </d>
                  </div>
                </div>
              </div>
              <div className="row m-0">
                <div className="col-md-12 text-justify">
                  <span>Họ tên người mua hàng :</span>
                  <span className="text-uppercase ml-5 gachChan">
                    <u> {item.hoTenNguoiMua}</u>
                  </span>
                </div>
                <div className="col-md-12 text-justify">
                  <span>Tên đơn vị :</span>
                  <span className="text-uppercase ml-5 gachChan">
                    <u> {item.tenDonVi}</u>
                  </span>
                </div>
                <div className="col-md-12 text-justify">
                  <span>Mã số thuế :</span>
                  <span className="text-uppercase ml-5 gachChan">
                    <u> {item.maSoThue}</u>
                  </span>
                </div>
                <div className="col-md-12 text-justify">
                  <span>Địa chỉ :</span>
                  <span className="text-uppercase ml-5 gachChan">
                    <u> {item.diaChi}</u>
                  </span>
                </div>
                <div className="col-md-6  text-justify">
                  <span>Hình thức thanh toán :</span>
                  <span className=" ml-5 gachChan text-uppercase  ">
                    <u> {renderConverLoaiThanhToan(item.thanhToan)}</u>
                  </span>
                </div>
                <div className="col-md-6 text-justify">
                  <span>Số tài khoản :</span>
                  <span className=" ml-5 gachChan">
                    <u> {item.soTK}</u>
                  </span>
                </div>

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
                    {item.hangHoa &&
                      Array.isArray(item.hangHoa) &&
                      item.hangHoa.map((itemHangHoa, indexHangHoa) => {
                        return (
                          <tr key={indexHangHoa} className="text-justify">
                            <td>{indexHangHoa + 1}</td>
                            <td>{itemHangHoa.tenHangHoa}</td>
                            <td>{itemHangHoa.soLo}</td>
                            <td>{itemHangHoa.hanDung}</td>
                            <td>{itemHangHoa.donViTinh}</td>
                            <td>{itemHangHoa.soLuong}</td>
                            <td>{renderTien(itemHangHoa.donGia)}</td>
                            <td>{renderTien(itemHangHoa.thanhTien)}</td>
                          </tr>
                        );
                      })}

                    <tr>
                      <td colSpan={7}>Cộng tiền hàng :</td>
                      <td className="text-justify inDam">
                        {renderTien(item.congTienHang)}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-justify" colSpan={2}>
                        Thuế suât GTGT : <b>{item.phanTramThue}%</b>
                      </td>
                      <td
                        className="text-justify"
                        style={{ paddingLeft: "6%" }}
                        colSpan={5}
                      >
                        Tiền thuế GTGT:
                      </td>
                      <td className="text-justify inDam">
                        {renderTien(item.tienThueGTGT)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingLeft: "2%" }} colSpan={7}>
                        Tổng tiền thanh toán :
                      </td>
                      <td className="text-justify inDam">
                        {renderTien(item.tongTienThanhToan)}
                      </td>
                    </tr>
                    <tr className="text-justify">
                      <td colSpan={8}>
                        Số tiền viết bằng chữ : <b>{item.soTienVietBangChu}</b>
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
                          Ký bởi :{" "}
                          <span className="text-uppercase">
                            <b> {item.kyBoi}</b>
                          </span>{" "}
                        </div>
                      </div>
                      <div className="col-md-12 mb-5">
                        <div>
                          Ký ngày :{" "}
                          <span className="text-uppercase">
                            {moment(item.ngayKy).format("DD/MM/YYYY")}
                          </span>{" "}
                        </div>
                      </div>
                      <div className="col-md-12 mb-5">
                        <a
                          className="mr-5 mt-5"
                          onClick={() => handleRecovery(item.id)}
                        >
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
