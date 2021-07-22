import React from "react";
import { Menu } from "antd";
import * as dataMenu from "./../../routers/dataMenu";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

const { SubMenu } = Menu;

function renderRouter(dataMenu, parentKey = 0) {
  return dataMenu.map((item, index) =>
    Array.isArray(item.children) && item.children.length > 0 ? (
      <SubMenu key={`${parentKey}-${index}`} title={item.name}>
        {renderRouter(item.children, `${parentKey}-${index}`)}
      </SubMenu>
    ) : (
      <Menu.Item key={`${parentKey}-${index}`}>
        <Link key={index} className="nav-link" to={item.to} exact={item.exact}>
          <span>
            {" "}
            <i className="icon-menu-custom fa fa-circle"></i>
            {item.name}
          </span>
        </Link>
      </Menu.Item>
    )
  );
}

function MenuLeft({ checkToogle, colorMenu, account_current }) {
  return (
    <>
      {checkToogle && (
        <Menu
          style={{
            width: 256,
            color: "Highlight",
          }}
          theme={`${colorMenu ? "dark" : "light "}`}
          mode="inline"
          collapsedWidth="100%"
        >
          {/* {account_current.maQuyen === "ADMIN"
            ? renderRouter(dataMenu.menusListQuanTri)
            : renderRouter(dataMenu.menusListUser)} */}
          {renderRouter(dataMenu.menusListQuanTri)}
        </Menu>
      )}
    </>
  );
}

export default MenuLeft;
