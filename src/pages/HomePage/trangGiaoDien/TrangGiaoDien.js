import React, { useState } from "react";
import Bancanbiet from "./Bancanbiet";
import Carousel_ads from "./Carousel_ads";
import Footer from "./Footer";
import Gioithieucombosanpham from "./Gioithieucombosanpham";
import Header from "./Header";
import Menugiaodien from "./Menugiaodien";
import Sanphambanchay from "./Sanphambanchay";
import SanphamchicotaiChauDangPharmacy from "./SanphamchicotaiChauDangPharmacy";
import Sanphammoi from "./Sanphammoi";
import Thuonghieunoibat from "./Thuonghieunoibat";

export default function TrangGiaoDien() {
  return (
    <>
      <div>
        <div className="headerGiaoDien">
          <Header />
        </div>
        <div className="menugiaodien">
          <Menugiaodien />
        </div>
        <div className="carousel-ads">
          <Carousel_ads />
        </div>
        <div className="banner-product">
          <Gioithieucombosanpham />
        </div>
        <div className="sanphammoi">
          <Sanphammoi />
        </div>
        <div className="sanphambanchay" style={{ marginBottom: "30px" }}>
          <Sanphambanchay />
        </div>
        <div
          className="sanphamchicotaiChauDangpharmacy"
          style={{ marginBottom: "30px" }}
        >
          <SanphamchicotaiChauDangPharmacy />
        </div>
        <div
          className="bannertaiPhamarcyChauDang"
          style={{ marginBottom: "50px" }}
        >
          <div className="banner-homepage">
            <div className="container">
              <div className="banner-all">
                <div className="image-banner-1">
                  <img
                    src="https://image.pharmacity.vn/live/uploads/2019/12/cut-extra-care-e1577690536797.jpg"
                    width="100px"
                    height="100px"
                    style={{ marginTop: "30px" }}
                  />
                </div>
                <div className="banner-title-1">
                  <strong>TIẾT KIỆM HƠN, SỐNG KHOẺ HƠN</strong>
                </div>
              </div>
              <div className="pharmarcy-chaudang">
                <p>
                  Yên tâm mua sắm, giá tốt nhất chỉ có tại ❤️‍🔥Ｐｈａｒｍａｃｙ
                  Ｃｈâｕ Đặｎｇ❤️‍🔥{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bancanbiet" style={{ marginBottom: "30px" }}>
          <Bancanbiet />
        </div>
        <div className="thuonghieunoibat" style={{ height: "320px" }}>
          <Thuonghieunoibat />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}
