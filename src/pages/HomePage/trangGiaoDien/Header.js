import React, { useState } from "react";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Input, Menu, Dropdown, Badge, Form } from "antd";

export default function Header() {
  return (
    <>
      <div className="container ">
        <nav class="navbar navbar-expand-lg navbar-light ">
          <a class="navbar-brand" href="#">
            <img
              src="http://nhathuockhoevadep.com/wp-content/uploads/2018/12/logo.png"
              width="65px"
              height="65px"
            />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="form-inline my-2 my-lg-0">
              <Input
                // value={text}
                name="search"
                size="large"
                placeholder="Tìm kiếm..."
                bordered
                suffix={<SearchOutlined />}
                // onChange={(e) => onChangeHandler(e.target.value)}
                style={{ width: 490, marginTop: "12px" }}
              />
            </form>
            <ul class="navbar-nav ml-5">
              <li class="nav-item dropdown active">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg/230px-Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg.png"
                    width="20px"
                    height="20px"
                  />{" "}
                  VN
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#" style={{ width: "40px" }}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg/230px-Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg.png"
                      width="20px"
                      height="20px"
                    />{" "}
                    VN
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#" style={{ width: "40px" }}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/285px-Flag_of_the_United_States_%28Pantone%29.svg.png"
                      width="5px"
                      height="15px"
                    />{" "}
                    USA
                  </a>
                </div>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Đăng nhập <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Giỏ hàng <ShoppingCartOutlined style={{ fontSize: "25px" }} />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
