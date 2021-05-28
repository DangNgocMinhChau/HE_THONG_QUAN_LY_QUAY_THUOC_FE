import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actQuanLyFiles from "../../actions/quanlyfiles/actQuanLyFiles";
import * as actQuanLyKho from "../../actions/quanlykho/actQuanLyKho";

import TableFiles from "./../../components/quanlyfiles/tableFiles";
function PageQuanLyFiles({ match, location }) {
  const [checkFormThemMoi, setCheckFormThemMoi] = useState(false);
  const [checkDanhSach, setCheckDanhSach] = useState(true);
  const [checkEdit, setCheckEdit] = useState(false);
  const dispatch = useDispatch();
  const { dataListFiles, dataListThuoc } = useSelector(
    (state) => ({
      dataListThuoc: state.khothuoc.list,
      dataListFiles: state.quanly_files.list,
    }),
    shallowEqual
  );
  let dataShowFiles = [];
  dataListFiles.map((item, index) => {
    if (
      dataListThuoc &&
      Array.isArray(dataListThuoc) &&
      dataListThuoc.filter((itemThuoc) => itemThuoc.id === item.idThuoc)
        .length > 0
    ) {
      dataShowFiles.push(
        dataListThuoc.filter((itemThuoc) => itemThuoc.id === item.idThuoc)[0]
      );
    }
  });

  function cancel() {
    setCheckDanhSach(true);
    setCheckFormThemMoi(false);
  }

  useEffect(() => {
    dispatch(actQuanLyFiles.actFetchfilesRequest());
    dispatch(actQuanLyKho.actFetchKhoThuocRequest());
  }, []);

  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      {/* <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h5 className=" mb-0 text-gray-800">File</h5>
        <Button
          type="primary"
          onClick={() => {
            openForm();
          }}
        >
          Thêm mới
        </Button>
      </div> */}

      <div className="row">
        {/* <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold ">File</h6>
            </div>
            {checkDanhSach && <TableFiles data={dataShowFiles} match={match} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageQuanLyFiles;
