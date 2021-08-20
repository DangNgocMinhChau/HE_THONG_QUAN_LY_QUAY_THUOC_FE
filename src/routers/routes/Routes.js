import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Switch, Route } from "react-router-dom";
import Home from "../../components/Home";
import PageLogin from "../../pages/HomePage/login/pageLogin";
import Page from "../../pages/HomePage/Page";
import LayoutTrangChu from "../../pages/HomePage/trangchu/LayoutTrangChu";
import * as act from "./../../actions/quanlytaikhoan/actQuanLyTaiKhoan";
import RouterTrangChu from "./RouterTrangChu";

function Routes(props) {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const account_current = useSelector(
    (state) => state.quanlylogin.account_current
  );
  useEffect(() => {
    if (localStorage.getItem("login")) {
      dispatch(
        act.actGetTaiKhoanByIdInApplicationRequest(
          localStorage.getItem("login")
        )
      );
      setCheck(false);
    }
  }, []);

  const isEmpty = (v) => {
    return Object.keys(v).length === 0;
  };
  console.log(localStorage.getItem("login"));
  return (
    <Switch>
      <Route path="/login" component={PageLogin} />
      <Route path="/quanly" component={Page} />
      <Route path="/trangchu">
        <LayoutTrangChu>
          <RouterTrangChu />
        </LayoutTrangChu>
      </Route>
      {localStorage.getItem("login") !== null ? (
        <Redirect to="/quanly" />
      ) : (
        <Redirect to="/trangchu" />
      )}
    </Switch>
  );
}

export default Routes;
