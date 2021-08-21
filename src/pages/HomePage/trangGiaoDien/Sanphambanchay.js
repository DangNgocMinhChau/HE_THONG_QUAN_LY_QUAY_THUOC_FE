import React, { useState } from "react";
import Slider from "react-slick";
import { Button, Card, Tabs } from "antd";

const { TabPane } = Tabs;

export default function Sanphambanchay() {
  const settings = {
    cssEase: "linear",
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,

    nextArrow: false,
    prevArrow: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const products = [
    {
      img: "https://nhathuoctruongtho.com/wp-content/uploads/2021/03/06c28a818d78940c7167e0f2b37c06c7.jpg",
      title: "Thuốc Nhỏ Mắt Eyemiru 40EX",
      text: "77.000 VNĐ",
    },
    {
      img: "https://nhathuoctruongtho.com/wp-content/uploads/2021/03/06c28a818d78940c7167e0f2b37c06c7.jpg",
      title: "Thuốc Nhỏ Mắt Eyemiru 40EX",
      text: "77.000 VNĐ",
    },
    {
      img: "https://nhathuoctruongtho.com/wp-content/uploads/2021/03/06c28a818d78940c7167e0f2b37c06c7.jpg",
      title: "Thuốc Nhỏ Mắt Eyemiru 40EX",
      text: "77.000 VNĐ",
    },
    {
      img: "https://nhathuoctruongtho.com/wp-content/uploads/2021/03/06c28a818d78940c7167e0f2b37c06c7.jpg",
      title: "Thuốc Nhỏ Mắt Eyemiru 40EX",
      text: "77.000 VNĐ",
    },
    {
      img: "https://nhathuoctruongtho.com/wp-content/uploads/2021/03/06c28a818d78940c7167e0f2b37c06c7.jpg",
      title: "Thuốc Nhỏ Mắt Eyemiru 40EX",
      text: "77.000 VNĐ",
    },
  ];

  return (
    <>
      <div className="container">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="SẢN PHẨM BÁN CHẠY" key="1">
            <Slider {...settings}>
              {products.map((x, i) => {
                return (
                  <div key={i} className="img-card">
                    <img className="img" src={x.img} />
                    <div class="card-body">
                      <div className="card-title">{x.title}</div>
                      <div className="card-text">{x.text}</div> <br />
                      <Button
                        style={{
                          borderColor: "#23cc23bf",
                          backgroundColor: "#23cc23bf",
                        }}
                      >
                        {" "}
                        <i
                          style={{ fontSize: "18px", marginRight: "13px" }}
                          class="fa fa-cart-plus"
                          aria-hidden="true"
                        ></i>
                        Thêm vào giỏ hàng
                      </Button>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}
