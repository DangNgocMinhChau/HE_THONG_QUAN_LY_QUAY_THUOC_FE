import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import Tintuc from "../../pages/HomePage/trangchu/tintuc";
function RouterTrangChu(props) {
  return (
    <Switch>
      {<Redirect exact from="/trangchu" to="/trangchu" />}
      <Route
        path="/trangchu/tintuc"
        component={() => {
          return <div>render ra cai ni</div>;
        }}
      />
      <Route path="/trangchu/tintuc2" component={Tintuc} />
    </Switch>
  );
}

export default RouterTrangChu;
