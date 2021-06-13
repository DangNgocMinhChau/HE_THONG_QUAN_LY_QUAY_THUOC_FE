import React from "react";
import QrCode from "../../components/QrCode";
import Darboard from "../../components/quanlybaocao/darboard";

function PageQuanLyBaoCao(props) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          {/* <Darboard /> */}
          <QrCode />
        </div>
      </div>
    </div>
  );
}

export default PageQuanLyBaoCao;
