import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actTinTuc from "../../../actions/quanlytintuc/actQuanLyTinTuc";

export default function Tintuc(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actTinTuc.actFetchTinTucRequest());
  }, []);
  return (
    <>
      <div className="container">
        <div className="banner">
          <iframe
            src="//adi.admicro.vn/adt/cpc/cpm7k/2021/07/diana-1627012782.html?url=%2F%2Flg1.logging.admicro.vn%2Fcpx%3Fdmn%3Dhttps%253A%252F%252Fkenh14.vn%252F%26rid%3D3880644a-6e6c-4998-83cd-b37d690729b0142-61211820%26lsn%3D1629558815281%26ce%3D1%26lc%3D31%26cr%3D1626687838%26ui%3D8166878381963322121%26uuid%3D2b5f71b6d41825d7ae7de1564a0d7b1c%26cmpg%3D1308987%26items%3D576899%26zid%3D13227%26cid%3D-1%26tp%3D8%26tpn%3D5%26sspz%3D254%26cov%3D1%26re%3Dhttps%253A%252F%252Fbs.serving-sys.com%252FServing%252FadServer.bs%253Fcn%253Dtrd%2526pli%253D1076874454%2526adid%253D1084231273%2526ord%253D0.4273960130831773&admid=cpmzone_13227_0_576899&vast=https%3A%2F%2Fsspapi.admicro.vn%2Fssp_request%2Fvideo%3Fu%3Dkenh14.vn%252F%26z%3D13227%26p%3D1%26w%3D650%26h%3D300%26lsn%3D2463de64f8432386f5c8de243cdf7e07%26dgid%3D86fc81c22f5b686a638bd8f5fa79e805%26l%3D31%26loc%3D31%26i%3D8166878381963322121%26isdetail%3D0%26pid%3D%26tags%3D5%26adstype%3D%26vtype%3D8%26vid%3D%26bannerid%3D576899"
            width="1160"
            height="256"
            frameBorder="0"
            scrolling="no"
          />
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 itembb">
            dsad
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 itembb">
            dsad
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 itembb">
            dsadas
          </div>
        </div>
      </div>
    </>
  );
}
