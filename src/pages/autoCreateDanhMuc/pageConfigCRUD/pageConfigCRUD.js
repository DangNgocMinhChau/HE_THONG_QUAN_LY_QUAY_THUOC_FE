import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Button, Tooltip } from "antd";
import TableConfigCRUD from "../../../components/configCRUDAuto/tableConfigCRUD";
import FormConfigCRUD from "../../../components/configCRUDAuto/formConfigCRUD";
import { renderDateTheoHeThong } from "./../../../common/convert/renderConvert";
import * as actCRUDConfig from "../../../actions/configCRUDAutoAction/actCRUD";
export default function PageConfigCRUD({ propsDefineObject, match }) {
  const [checkFormThemMoi, setCheckFormThemMoi] = useState(false);
  const [checkDanhSach, setCheckDanhSach] = useState(true);
  const [checkEdit, setCheckEdit] = useState(false);
  const [
    checkShowDanhSachHoaDonTheoKhachHang,
    setCheckShowDanhSachHoaDonTheoKhachHang,
  ] = useState(false);
  const [idXoa, setIdXoa] = useState([]);
  const dispatch = useDispatch();

  const { dataTable } = useSelector(
    (state) => ({
      dataTable: state.config_crud_auto.list,
    }),
    shallowEqual
  );

  const onDelete = (id) => {
    let value = [id];
    dispatch(
      actCRUDConfig.actDeleteRequest(propsDefineObject.apiCallServer, value)
    );
  };

  function onEdit(id) {
    dispatch(
      actCRUDConfig.actGetIdRequest(propsDefineObject.apiCallServer, id)
    );
    setCheckFormThemMoi(true);
    setCheckDanhSach(false);
    setCheckEdit(true);
  }

  function openForm() {
    // resetForm();
    setCheckFormThemMoi(true);
    setCheckDanhSach(false);
    setCheckEdit(false);
  }

  function onSave(value) {
    if (value.id) {
      value = {
        ...value,
        ngayChinhSua: renderDateTheoHeThong(),
      };
      dispatch(
        actCRUDConfig.actUpdateRequest(propsDefineObject.apiCallServer, value)
      );
    } else {
      value = {
        ...value,
        ngayTaoBanGhi: renderDateTheoHeThong(),
      };
      dispatch(
        actCRUDConfig.actCreateRequest(propsDefineObject.apiCallServer, value)
      );
    }
    cancel();
  }

  function cancel() {
    setCheckDanhSach(true);
    setCheckFormThemMoi(false);
    setCheckShowDanhSachHoaDonTheoKhachHang(false);
  }

  const handdleXoaNhieu = () => {
    idXoa.map((item, index) => {
      let value = [item];
      dispatch(
        actCRUDConfig.actDeleteRequest(propsDefineObject.apiCallServer, value)
      );
    });
  };

  useEffect(() => {
    dispatch(actCRUDConfig.resetList([]));
    dispatch(actCRUDConfig.actFindRequest(propsDefineObject.apiCallServer));
  }, []);

  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h5 className=" mb-0 text-gray-800">{propsDefineObject.name}</h5>
        <div className="row">
          <Button
            size="small"
            className="m-2"
            onClick={() => {
              openForm();
            }}
            type="dashed"
          >
            <i className="fa fa-plus-square" aria-hidden="true"></i>
          </Button>

          <Tooltip placement="bottom" title="Xoá nhiều" color="red" key="red">
            <Button
              className="m-2 mr-5 "
              size="small"
              onClick={() => {
                handdleXoaNhieu();
              }}
              type="dashed"
              danger={true}
            >
              <i
                className="fa fa-trash-o"
                style={{ color: "red" }}
                aria-hidden="true"
              ></i>
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="row">
        {/* <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-12">
          <div className="card-custom shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header-custom py-3 d-flex flex-row align-items-center justify-content-between">
              <p className="text-card-header">
                <i
                  className="color-icon-header-danhsach fa fa-book"
                  aria-hidden="true"
                ></i>
                {propsDefineObject.name}
              </p>
            </div>
            {checkFormThemMoi && (
              <FormConfigCRUD
                onSave={onSave}
                cancel={cancel}
                checkEdit={checkEdit}
                propsDefineObject={propsDefineObject}
              />
            )}

            {checkDanhSach && (
              <TableConfigCRUD
                match={match}
                propsDefineObject={propsDefineObject}
                onDelete={onDelete}
                onEdit={onEdit}
                data={dataTable}
                setIdXoa={setIdXoa}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
