import React from "react";

function LayoutTrangChu({ children }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Trang chủ đây</h1>
          <a href="/login">Đăng nhập</a>
        </div>
        {children}
      </div>
    </div>
  );
}

export default LayoutTrangChu;
