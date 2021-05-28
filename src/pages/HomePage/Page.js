import React, { useState } from "react";
import MenuLeft from "./MenuLeft";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav";

function Page({ account_current }) {
  const [checkToogle, setCheckToogle] = useState(true);
  const [colorMenu, setColorMenu] = useState(true);

  function onToogleMenu() {
    setCheckToogle(!checkToogle);
  }

  function onSetColorMenu() {
    setColorMenu(!colorMenu);
  }

  return (
    <div id="page-top">
      <div id="wrapper">
        <MenuLeft
          account_current={account_current}
          checkToogle={checkToogle}
          colorMenu={colorMenu}
        />
        {/* nội dung */}
        <Nav
          onToogleMenu={onToogleMenu}
          checkToogle={checkToogle}
          onSetColorMenu={onSetColorMenu}
          colorMenu={colorMenu}
        />
      </div>
    </div>
  );
}

export default Page;
