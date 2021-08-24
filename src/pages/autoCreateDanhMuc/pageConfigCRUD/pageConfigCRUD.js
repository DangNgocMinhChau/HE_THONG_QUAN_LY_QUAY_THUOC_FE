import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Button, Tooltip } from "antd";
import TableConfigCRUD from "../../../components/configCRUDAuto/tableConfigCRUD";
import FormConfigCRUD from "../../../components/configCRUDAuto/formConfigCRUD";
import { renderDateTheoHeThong } from "./../../../common/convert/renderConvert";
import * as actCRUDConfig from "../../../actions/configCRUDAutoAction/actCRUD";
import queryString from "query-string";
import { Card, ButtonGroup, ButtonIcon } from "react-rainbow-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faUsers,
  faEdit,
  faChessKnight,
} from "@fortawesome/free-solid-svg-icons";

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
      let value = [item.id];
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

  const onChangePage = (e, page) => {
    queryStringParam = queryString.stringifyUrl({
      url: `${propsDefineObject.apiCallServer}/find/page`,
      query: { page: page, pageSize: 10 },
    });
    dispatch(actCRUDConfig.actFindRequest(queryStringParam));
  };
  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <div className="rainbow-m-around_large">
        <Card
          isLoading
          icon={
            <FontAwesomeIcon
              icon={faUsers}
              size="lg"
              className="rainbow-color_brand"
            />
          }
          title={propsDefineObject.name}
          actions={
            <ButtonGroup>
              <ButtonIcon
                variant="border"
                icon={<FontAwesomeIcon icon={faPlus} />}
                onClick={() => {
                  openForm();
                }}
              />
              <ButtonIcon
                variant="border"
                icon={<FontAwesomeIcon icon={faChessKnight} />}
                onClick={() => {
                  handdleXoaNhieu();
                }}
              />
            </ButtonGroup>
          }
        />
      </div>
      <div className="row">
        <div className="col-md-12 mb-5"></div>
      </div>
      <div className="rainbow-p-around_large">
        <Card>
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
        </Card>
      </div>
    </div>
  );
}
