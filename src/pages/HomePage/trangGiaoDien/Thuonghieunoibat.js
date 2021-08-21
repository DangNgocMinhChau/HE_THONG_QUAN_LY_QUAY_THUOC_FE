import React, { useState } from "react";
import Slider from "react-slick";
import { Button, Card, Tabs } from "antd";

const { TabPane } = Tabs;
export default function Thuonghieunoibat() {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };

  const product = [
    {
      img: "https://www.eacts.org/wp-content/uploads/2019/04/ABBOTT-LOGO.jpg",
      name: "Abbott",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/2090/1141/collections/logo-berocca.png",
      name: "Berocca",
    },
    {
      img: "https://i-cf3.gskstatic.com/content/dam/cf-consumer-healthcare/panadol/vi_vn/blue-images/Logo%20Panadol%20Peru.png",
      name: "Panadol",
    },
    {
      img: "https://thuonghieumypham.net/wp-content/uploads/2020/06/Logo-Cetaphil.jpg",
      name: "Cetaphil",
    },
    {
      img: "https://toppng.com/public/uploads/thumbnail/durex-vector-logo-11574250920nzw52rqamp.png",
      name: "durex",
    },
    {
      img: "https://logos-download.com/wp-content/uploads/2016/04/La_Roche-Posay_logo_logotype.jpg",
      name: "La Roche Posay",
    },
  ];

  return (
    <>
      <div className="container">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="THƯƠNG HIỆU NỔI BẬT" key="1">
            <Slider {...settings}>
              {product.map((item, index) => {
                if (item) {
                  return (
                    <div key={index} className="img-brand-all">
                      <img className="img-brand" src={item.img} />
                      <div className="card-brand">
                        <div className="card-brand-name">{item.name}</div>
                      </div>
                    </div>
                  );
                }
              })}
            </Slider>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}
