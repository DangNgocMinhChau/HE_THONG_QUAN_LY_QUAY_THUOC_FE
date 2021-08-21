import React, { useState } from "react";
import Header from "./Header";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";

export default function Menugiaodien() {
  return (
    <div style={{ background: "#23cc23bf" }}>
      <div>
        <ul class="nav justify-content-center menugiaodien">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              SẢN PHẨM <DownOutlined style={{ fontSize: "13px" }} />
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              NHÃN HÀNG
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              DEAL HOT <DownOutlined />
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link " href="#" tabindex="-1">
              SỐNG KHOẺ <DownOutlined style={{ fontSize: "13px" }} />
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link " href="#" tabindex="-1">
              TÌM NHÀ THUỐC GẦN BẠN
            </a>
          </li>{" "}
          <li class="nav-item">
            <a class="nav-link " href="#" tabindex="-1">
              HOTLINE - MIẾN PHÍ <DownOutlined style={{ fontSize: "13px" }} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
