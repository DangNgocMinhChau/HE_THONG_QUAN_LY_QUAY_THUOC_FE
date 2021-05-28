import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as dataMenu from "./dataMenu";
import { useSelector } from "react-redux";

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        return (
          <Link className="collapse-item" to={to}>
            {label}
          </Link>
        );
      }}
    />
  );
};

function renderMenu(menusList) {
  var result = null;
  if (menusList.length > 0) {
    result = menusList.map((item, index) => {
      return (
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target={`#collapseTwo${index}`}
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            {/* <i className="fas fa-fw fa-cog"></i> */}
            <span>{item.title}</span>
          </a>
          <div
            id={`collapseTwo${index}`}
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Chức năng</h6>
              {item.menu.map((menu, index2) => {
                return (
                  <MenuLink
                    key={index2}
                    label={menu.name}
                    to={menu.to}
                    activeOnlyWhenExact={menu.exact}
                  />
                );
              })}
            </div>
          </div>
        </li>
      );
    });
  }
  return result;
}
export default function MenuConfig(props) {
  const account_current = useSelector(
    (state) => state.quanlylogin.account_current
  );
  return (
    <>
      {account_current.quyen === "QuanTri"
        ? renderMenu(dataMenu.menusListQuanTri)
        : renderMenu(dataMenu.menusListUser)}
    </>
  );
}
