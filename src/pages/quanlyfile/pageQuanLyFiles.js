import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actQuanLyFiles from "../../actions/quanlyfiles/actQuanLyFiles";
import * as actQuanLyKho from "../../actions/quanlykho/actQuanLyKho";
import FormFiles from "./../../components/quanlyfiles/formFiles";
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

  const onDelete = (id) => {
    dispatch(actQuanLyFiles.actDeletefilesRequest(id));
  };

  useEffect(() => {
    dispatch(actQuanLyKho.actFetchKhoThuocRequest());
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card-custom shadow mb-4">
            <div className="card-header-custom py-3 d-flex flex-row align-items-center justify-content-between">
              <p className="text-card-header">
                <i
                  className="color-icon-header-danhsach fa fa-book"
                  aria-hidden="true"
                ></i>
                Danh sách file
              </p>
              <a
                onClick={() => setCheckDanhSach(!checkDanhSach)}
                className="m-0 font-weight-bold "
              >
                Xem danh sách
              </a>
            </div>
            {/* {checkDanhSach && <TableFiles data={dataShowFiles} match={match} />} */}
            <FormFiles setCheckDanhSach={setCheckDanhSach} />
            {checkDanhSach && <TableFiles onDelete={onDelete} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageQuanLyFiles;
