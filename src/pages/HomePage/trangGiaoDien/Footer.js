import React, { useState } from "react";

export default function Footer() {
  return (
    <>
      <div style={{ background: "#23cc23bf", height: "400px", width: "100%" }}>
        <div className="container">
          <div className="row about-pharmacy">
            <div class="col-xl-4 col-lg-3 col-lg-6 col-lg-12 content-pharmacy-chau">
              <strong>Về pharmacy Châu Đặng</strong>
              <p>
                Tại Pharmacy Châu Đặng, mỗi dược sỹ luôn tận tâm phục vụ và được
                đào tạo để hoàn thành xuất sắc những sứ mệnh được giao.
              </p>
            </div>
            <div class="col-xl-4 col-lg-3 col-lg-6 col-lg-12 contact-about-us">
              <strong>Liên kết hữu ích</strong>
              <p style={{ paddingTop: "30px" }}>Câu hỏi thường gặp</p>
              <p>Vị trí cửa hàng</p>
              <p>Chính sách giao hàng</p>
              <p>Phương thức thanh toán</p>
              <p>Chính sách đổi trả</p>
              <p>Chính sách bảo mật</p>
            </div>
            <div class="col-xl-4 col-lg-3 col-lg-6 col-lg-12 follow-us">
              <strong>Theo dõi chúng tôi trên</strong>
              <p>
                <i
                  style={{
                    color: "#395185",
                    fontSize: "26px",
                    paddingTop: "30px",
                    paddingLeft: "7px",
                  }}
                  className="fab fa-facebook-square"
                >
                  {" "}
                </i>{" "}
                &ensp; Facebook
              </p>
              <p>
                <i
                  style={{ color: "#ff0000", fontSize: "26px" }}
                  className="fab fa-youtube"
                ></i>{" "}
                &ensp; Youtube
              </p>
              <p>
                <i
                  style={{ color: "#395185", fontSize: "26px" }}
                  className="fab fa-twitter-square"
                ></i>{" "}
                &ensp; Twitter
              </p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
