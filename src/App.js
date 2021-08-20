import "./App.css";
import Page from "./pages/HomePage/Page";
import "antd/dist/antd.css";
import PageLogin from "./pages/HomePage/login/pageLogin";
import { Redirect, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routers/routes/Routes";

function App({ store, basename }) {
  return (
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <Routes />
      </BrowserRouter>
    </Provider>
    // <Switch>
    //   <Route path="/login" component={PageLogin} />
    //   {account_current == undefined && account_current == null && (
    //     <Redirect to="/login" />
    //   )}

    //   <Route path="/" component={Page} />
    //   {account_current && account_current.dangNhapThanhCong && (
    //     <Redirect to="/" />
    //   )}
    // </Switch>
    // // <Page account_current={account_current} />
    // <>
    //   {account_current && account_current.dangNhapThanhCong ? (
    //     <div className="App">
    //       <Page account_current={account_current} />
    //     </div>
    //   ) : (
    //     <PageLogin />
    //   )}
    // </>
  );
}

export default App;
