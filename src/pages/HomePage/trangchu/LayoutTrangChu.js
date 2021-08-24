import React from "react";
import Tolgle from "./../../../common/testGiaodien/tolgle";

function LayoutTrangChu({ children }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h4>TIN TỨC - SỰ KIỆN NỔI BẬT</h4>
          <a href="/login">
            <i
              style={{ color: "green", fontSize: "30px" }}
              class="fas fa-user-nurse"
            ></i>
          </a>
        </div>
        <Tolgle />
        {children}
      </div>
    </div>
  );
}

export default LayoutTrangChu;
