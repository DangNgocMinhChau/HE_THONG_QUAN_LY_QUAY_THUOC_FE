import React, { useState } from "react";
import { Button, Card, Tabs, Row, Col } from "antd";

const { TabPane } = Tabs;
export default function Bancanbiet() {
  return (
    <>
      <div className="container">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="CÓ THỂ BẠN CHƯA BIẾT" key="1">
            <div className="row">
              <div class="col-xl-3 col-lg-3 col-lg-6 col-lg-12">
                <Card bordered={false}>
                  <div className="all-content">
                    <div className="icon-shipping">
                      <i
                        className="fas fa-shipping-fast"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div className="shipping-content">
                      <strong>MIỄN PHÍ VẬN CHUYỂN</strong>
                      <p>Áp dụng cho đơn hàng trên 300,000 VNĐ.</p>
                    </div>
                  </div>
                </Card>
              </div>
              <div class="col-xl-3 col-lg-3 col-lg-6 col-lg-12">
                <Card bordered={false}>
                  <div className="all-content">
                    <div className="icon-shipping">
                      <i
                        className="fas fa-hand-holding-heart"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div className="shipping-content">
                      <strong>TẬN TÂM PHỤC VỤ</strong>
                      <p>Luôn sẵn sàng phục bạn. Hotline miễn phí: 1800 1234</p>
                    </div>
                  </div>
                </Card>
              </div>
              <div class="col-xl-3 col-lg-3 col-lg-6 col-lg-12">
                <Card bordered={false}>
                  <div className="all-content">
                    <div className="icon-shipping">
                      <i
                        className="fas fa-map-marked-alt"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div className="shipping-content">
                      <strong>TÌM VỊ TRÍ</strong>
                      <p>Tìm ngay nhà thuốc và ghé thăm.</p>
                    </div>
                  </div>
                </Card>
              </div>
              <div class="col-xl-3 col-lg-3 col-lg-6 col-lg-12">
                <Card bordered={false}>
                  <div className="all-content">
                    <div className="icon-shipping">
                      <i className="fas fa-mobile-alt" aria-hidden="true"></i>
                    </div>
                    <div className="shipping-content">
                      <strong>TÍCH LUỸ ĐIỂM</strong>
                      <p>Tích luỹ điểm và sử dụng khi giao dịch.</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}
