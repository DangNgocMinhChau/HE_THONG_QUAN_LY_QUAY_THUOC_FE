import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Button, Tooltip } from "antd";
import TableConfigCRUD from "../../../components/configCRUDAuto/tableConfigCRUD";
import FormConfigCRUD from "../../../components/configCRUDAuto/formConfigCRUD";
import { renderDateTheoHeThong } from "./../../../common/convert/renderConvert";
import * as actCRUDConfig from "../../../actions/configCRUDAutoAction/actCRUD";
import queryString from "query-string";

export default function PageConfigCRUD({ propsDefineObject, match }) {
  const [checkFormThemMoi, setCheckFormThemMoi] = useState(false);
  const [checkDanhSach, setCheckDanhSach] = useState(true);
  const [isVisible, setIsvisible] = useState(false);
  const [checkEdit, setCheckEdit] = useState(false);

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
    setCheckEdit(true);
    setIsvisible(true);
    setCheckDanhSach(propsDefineObject.buildModalPage ? true : false);
  }

  function openForm() {
    setCheckFormThemMoi(true);
    setCheckDanhSach(propsDefineObject.buildModalPage ? true : false);
    setCheckEdit(false);
    setIsvisible(true);
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
    setIsvisible(false);
  }

  const handdleXoaNhieu = () => {
    idXoa.map((item, index) => {
      let value = [item];
      dispatch(
        actCRUDConfig.actDeleteRequest(propsDefineObject.apiCallServer, value)
      );
    });
  };
  let queryStringParam = "";

  useEffect(() => {
    queryStringParam = queryString.stringifyUrl({
      url: `${propsDefineObject.apiCallServer}/find/page`,
      query: { page: 1, pageSize: 10 },
    });
    dispatch(actCRUDConfig.resetList([]));
    dispatch(actCRUDConfig.actFindRequest(queryStringParam));
  }, []);

  const onChangePage = (page, pageSize) => {
    queryStringParam = queryString.stringifyUrl({
      url: `${propsDefineObject.apiCallServer}/find/page`,
      query: { page: page, pageSize: pageSize },
    });
    dispatch(actCRUDConfig.actFindRequest(queryStringParam));
  };
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
                checkThemMoi={true}
                propsDefineObject={propsDefineObject}
                isVisible={isVisible}
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
                onChangePage={onChangePage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
