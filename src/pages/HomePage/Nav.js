import React, { useEffect } from "react";
import { act } from "react-dom/test-utils";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import routes from "./../../routers/routes";
import SwitchCommon from "./switch-common";
import * as actUser from "./../../actions/quanlytaikhoan/actQuanLyTaiKhoan";
import * as actQuanLyThongBao from "./../../actions/quanlythongbao/actQuanLyThongBao";

import { Badge, Card } from "antd";
import { NotificationOutlined } from "@ant-design/icons";
function Nav({ onToogleMenu, checkToogle, onSetColorMenu, colorMenu }) {
  function renderContentMenu(routes) {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return result;
  }
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(actUser.actLogOut({ checkToken: false }));
    localStorage.removeItem("login");
  };

  const dataThongBao = useSelector((state) => state.quanlythongbao.list);
  const account_current = useSelector(
    (state) => state.quanlylogin.account_current
  );
  useEffect(() => {
    dispatch(actQuanLyThongBao.getAllThongBaoRequest());
  }, []);
  return (
    <div id="content-wrapper" className="d-flex flex-column fix-height">
      {/* <!-- Main Content --> */}
      <div id="content">
        {/* <!-- Topbar --> */}
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          {/* <!-- Sidebar Toggle (Topbar) --> */}
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars"></i>
          </button>

          {/* <!-- Topbar Search --> */}
          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-light border-0 small"
                placeholder="Tìm kiếm....."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </form>

          {/* <!-- Topbar Navbar --> */}
          <ul className="navbar-nav ml-auto">
            {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
            <li className="nav-item dropdown no-arrow d-sm-none">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="searchDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-search" aria-hidden="true"></i>
              </a>
              {/* <!-- Dropdown - Messages --> */}
              <div
                className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                aria-labelledby="searchDropdown"
              >
                <form className="form-inline mr-auto w-100 navbar-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Tìm kiếm ....."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>

            <div className="topbar-divider d-none d-sm-block"></div>

            {/* <!-- Nav Item - User Information --> */}
            <li className="nav-item dropdown no-arrow">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  {account_current.tenDangNhap}
                </span>
                <img
                  className="img-profile rounded-circle"
                  src={account_current.img}
                />
              </a>
              {/* <!-- Dropdown - User Information --> */}
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <a className="dropdown-item " href="#">
                  <i
                    className="fa fa-user-o mr-2 text-gray-400"
                    aria-hidden="true"
                  ></i>
                  Thông tin
                </a>
                <a className="dropdown-item" href="#">
                  <i
                    className="fa fa-user-plus mr-2 text-gray-400"
                    aria-hidden="true"
                  ></i>
                  Thêm tài khoản
                </a>
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item"
                  href="#"
                  data-toggle="modal"
                  data-target="#logoutModal"
                  onClick={() => logOut()}
                >
                  <i
                    className="fa fa-sign-out  mr-2 text-gray-400"
                    aria-hidden="true"
                  ></i>
                  Đăng xuất
                </a>
              </div>
            </li>
            <li className="nav-item dropdown no-arrow">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div>
                  <Badge count={dataThongBao.length}>
                    <NotificationOutlined />
                  </Badge>
                </div>
                ,
              </a>
              {/* <!-- Dropdown - User Information --> */}
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <Card size="small" title="Thông báo" style={{ width: 300 }}>
                  <ul>
                    {dataThongBao.map((item, index) => (
                      <li>
                        <Link
                          to={{
                            pathname: "/quanlytaikhoan",
                            idMessage: item.id,
                          }}
                        >
                          {item.message}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </li>

            <div className="topbar-divider d-none d-sm-block"></div>
            <li className="nav-item dropdown no-arrow">
              <span
                className="nav-link "
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  <i class="fa fa-cogs" aria-hidden="true"></i>
                </span>
              </span>
              {/* <!-- Dropdown - User Information --> */}
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <span className="dropdown-item ">
                  <SwitchCommon
                    onClick={onToogleMenu}
                    name={checkToogle ? "Mở menu" : "Đóng menu"}
                  />
                </span>
                <span className="dropdown-item">
                  <SwitchCommon
                    onClick={onSetColorMenu}
                    name={colorMenu ? "Menu tối" : "Menu sáng"}
                  />
                </span>
              </div>
            </li>
          </ul>
        </nav>
        <Switch>{renderContentMenu(routes)}</Switch>
      </div>
    </div>
  );
}

export default Nav;
