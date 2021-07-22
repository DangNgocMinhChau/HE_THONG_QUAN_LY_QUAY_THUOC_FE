import "./App.css";
import Page from "./pages/HomePage/Page";
import "antd/dist/antd.css";
import PageLogin from "./pages/HomePage/login/pageLogin";
import { useSelector } from "react-redux";

function App() {
  const account_current = useSelector(
    (state) => state.quanlylogin.account_current
  );

  return (
    <>
      {/* <Page account_current={account_current} /> */}

      {account_current && account_current.dangNhapThanhCong ? (
        <div className="App">
          <Page account_current={account_current} />
        </div>
      ) : (
        <PageLogin />
      )}
    </>
  );
}

export default App;
