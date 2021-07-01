import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Card, Avatar } from "antd";
import DetailKhoThuoc from "../quanlykho/detailKhoThuoc";
import * as act from "../../actions/quanlykho/actQuanLyKho";
import { Button, Tooltip, Switch, Image } from "antd";
import moment from "moment";
import {
  renderTien,
  renderDate,
  renderConverLoaiThanhToan,
  renderConvertSoLuongTheoDonViReturnString,
} from "./../../common/convert/renderConvert";
const { Meta } = Card;

export default function DanhSachSanPhamBanHang({ history }) {
  const dispatch = useDispatch();
  const [checkDetail, setCheckDetail] = useState(false);
  const [checkDanhSach, setCheckDanhSach] = useState(true);

  const { dataListThuoc, itemKhoThuoc } = useSelector(
    (state) => ({
      dataListThuoc: state.khothuoc.list,
      itemKhoThuoc: state.khothuoc.item,
    }),
    shallowEqual
  );
  const onHandelDetail = (id) => {
    setCheckDetail(true);
    setCheckDanhSach(false);
    dispatch(act.actGetKhoThuocByIdRequest(id));
  };

  const handleBack = () => {
    setCheckDetail(false);
    setCheckDanhSach(true);
  };

  const renderFile = (value) => {
    if (value && Array.isArray(value)) {
      return value.map((item, index) => {
        if (item.type == "image/jpeg") {
          return (
            <>
              <Image
                preview={false}
                width={60}
                src={`/filedinhkem/${item.name}`}
              />
            </>
          );
        }
      });
    }
  };
  const renderDateHanSudung = (item) => {
    var timeNow = moment();
    var hsd = moment(item.hanSuDungThuoc);
    let khoangCachGiua2Ngay = hsd.diff(timeNow, "days");

    return (
      <span style={{ color: khoangCachGiua2Ngay < 30 ? "red" : "black" }}>
        {renderDate(item.hanSuDungThuoc)}
      </span>
    );
  };
  return (
    <>
      <div className="container-fluid">
        {/* <!-- Page Heading --> */}
        <div className="d-sm-flex align-items-center justify-content-between">
          <div className="row"></div>
        </div>

        <div className="row">
          {/* <!-- Area Chart --> */}
          <div className="col-xl-12 col-lg-12">
            {/* <!-- Card Header - Dropdown --> */}
            {checkDanhSach && (
              <Card style={{ width: "100%", margin: 5 }}>
                <div className="row">
                  {dataListThuoc.map((item, index) => {
                    return (
                      <Card
                        hoverable
                        style={{ width: "20%" }}
                        onClick={() => {
                          onHandelDetail(item.id);
                        }}
                      >
                        <div className="row">
                          <div className="col-md-2">
                            {renderFile(item && item.fileDBArrayList)}
                          </div>
                          <div className="col-md-10">
                            <h5>{item.tenThuoc}</h5>
                            <span>
                              Số lượng trong kho :
                              {renderConvertSoLuongTheoDonViReturnString(
                                item.soLuongNhap - item.soLuongDaBan,
                                item.donViTinh
                              )}
                            </span>
                            <br></br>
                            <span>Phân loại : {item.phanLoaiThuoc}</span>
                            <br></br>
                            <span>
                              Hạn sử dụng : {renderDateHanSudung(item)}
                            </span>
                            <br></br>
                            {item.soLuongNhap - item.soLuongDaBan < 10 &&
                              item.soLuongNhap - item.soLuongDaBan > 0 && (
                                <span
                                  style={{ color: "red", fontSize: "20px" }}
                                >
                                  Sắp hết hàng !
                                </span>
                              )}
                            {item.soLuongNhap - item.soLuongDaBan === 0 && (
                              <span style={{ color: "red", fontSize: "20px" }}>
                                Hết hàng !
                              </span>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </Card>
            )}
            {checkDetail && (
              <DetailKhoThuoc
                itemKhoThuoc={itemKhoThuoc}
                handleBack={handleBack}
                checkShowButtonBack={true}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
