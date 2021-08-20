import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import Tintuc from "../../pages/HomePage/trangchu/tintuc";
function RouterTrangChu(props) {
  return (
    <Switch>
      {<Redirect exact from="/trangchu" to="/trangchu/tintuc" />}
      <Route
        path="/trangchu/tintuc"
        component={() => {
          return <div>tin tuc trang chu ne</div>;
        }}
      />
      <Route path="/trangchu/tintuc2" component={Tintuc} />
    </Switch>
  );
}

export default RouterTrangChu;
