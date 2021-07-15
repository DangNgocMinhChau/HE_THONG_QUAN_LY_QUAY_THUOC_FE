import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as act from "../../../actions/quanlykho/actQuanLyKho";

import TableThungRacKhoThuoc from "../../../components/quanlythungrac/thungrackhothuoc/tableThungRacKhoThuoc";

function PageQuanLyThungRacKhoThuoc({ match, location }) {
  const [checkDanhSach, setCheckDanhSach] = useState(true);
  const [idXoa, setIdXoa] = useState([]);

  const { dataListThuoc } = useSelector(
    (state) => ({
      dataListThuoc: state.khothuoc.list,
      dataListFile: state.quanly_files.list,
      account_current: state.quanlylogin.account_current,
      itemKhoThuoc: state.khothuoc.item,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const onDataRecovery = (value) => {
    value = {
      ...value,
      flag: true,
    };
    dispatch(act.actUpdateSetFlagRequest(value, { checkPhucHoiDuLieu: true }));
  };

  useEffect(() => {
    dispatch(act.actFetchThungRacKhoThuocRequest());
  }, []);

  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h5 className=" mb-0 text-gray-800">Thùng rác kho thuốc</h5>
      </div>

      <div className="row">
        {/* <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-12">
          <div className="card-custom  shadow ">
            {/* <!-- Card Header - Dropdown --> */}
            <div className=" py-2 d-flex flex-row align-items-center justify-content-between card-header-custom ">
              <p className="text-card-header">
                <i
                  className="color-icon-header-remove fa fa-trash-o"
                  aria-hidden="true"
                ></i>
                Thùng rác thuốc
              </p>
            </div>
            {checkDanhSach && (
              <TableThungRacKhoThuoc
                data={dataListThuoc}
                match={match}
                setIdXoa={setIdXoa}
                onDataRecovery={onDataRecovery}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageQuanLyThungRacKhoThuoc;
