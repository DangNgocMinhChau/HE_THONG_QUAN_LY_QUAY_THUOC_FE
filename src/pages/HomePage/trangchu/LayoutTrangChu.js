import React from "react";

function LayoutTrangChu({ children }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h4>TIN TỨC - SỰ KIỆN NỔI BẬT</h4>
          <a href="/login">Đăng nhập</a>
        </div>
        {children}
      </div>
    </div>
  );
}

export default LayoutTrangChu;
