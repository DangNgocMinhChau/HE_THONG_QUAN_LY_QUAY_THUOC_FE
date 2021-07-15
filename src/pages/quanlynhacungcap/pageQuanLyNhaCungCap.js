import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Button, Tooltip } from "antd";
import * as actNhaCungCap from "../../actions/quanlynhacungcap/actQuanLyNhaCungCap";
import * as actKhoThuoc from "../../actions/quanlykho/actQuanLyKho";
import moment from "moment";
import FormNhaCungCap from "../../components/quanlynhacungcap/formNhaCungCap";
import TableNhaCungCap from "../../components/quanlynhacungcap/tableNhaCungCap";
import { openMessageLoadingError } from "./../../common/renderThongBao/renderThongBaoCommon";
import * as message from "./../../constants/Message";

function PageQuanLyNhaCungCap({ match, location }) {
  const [checkFormThemMoi, setCheckFormThemMoi] = useState(false);
  const [checkDanhSach, setCheckDanhSach] = useState(true);
  const [checkEdit, setCheckEdit] = useState(false);
  const [idXoa, setIdXoa] = useState([]);
  const { dataListNhaCungCap, dataListThuoc, account_current } = useSelector(
    (state) => ({
      dataListNhaCungCap: state.quanlynhacungcap.list,
      dataListThuoc: state.khothuoc.list,
      account_current: state.quanlylogin.account_current,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  function cancel() {
    setCheckDanhSach(true);
    setCheckFormThemMoi(false);
  }

  function onSave(value) {
    if (value.id) {
      value = {
        ...value,
        ngayChinhSua: moment().format("DD/MM/yyyy HH:mm:ss "),
      };
      dispatch(actNhaCungCap.actUpdateNhaCungCapRequest(value));
    } else {
      value = {
        ...value,
        nguoiTaoId: account_current.id,
        ngayTaoBanGhi: moment().format("DD/MM/yyyy HH:mm:ss "),
      };
      dispatch(actNhaCungCap.actCreateNhaCungCapRequest(value));
    }
    cancel();
  }

  const onDelete = (id) => {
    let checkNhaCungCapDangCoTrongKhoThuoc = dataListThuoc.filter(
      (itemListThuoc) => itemListThuoc.idNhaCungCap == id
    );
    if (checkNhaCungCapDangCoTrongKhoThuoc.length == 0) {
      dataListNhaCungCap.map((item, index) => {
        if (item.id === id) {
          item = {
            ...item,
            ngayXoaBanGhi: moment().format("DD/MM/yyyy HH:mm:ss "),
            flag: false,
          };
          dispatch(actNhaCungCap.actUpdateSetFlagRequest(item));
        }
      });
      dispatch(actNhaCungCap.actDeleteNhaCungCap(id));
    } else {
      openMessageLoadingError(message.KHONG_DUOC_PHEP_XOA_NHA_CUNG_CAP);
    }
  };

  function onEdit(id) {
    dispatch(actNhaCungCap.actGetNhaCungCapByIdRequest(id));
    setCheckFormThemMoi(true);
    setCheckDanhSach(false);
    setCheckEdit(true);
  }

  function resetForm() {
    dispatch(actNhaCungCap.actGetNhaCungCapById(null));
  }

  function openForm() {
    resetForm();
    setCheckFormThemMoi(true);
    setCheckDanhSach(false);
    setCheckEdit(false);
  }

  const handdleXoaNhieu = () => {
    idXoa.map((itemId, indexId) => {
      let checkNhaCungCapDangCoTrongKhoThuoc = dataListThuoc.filter(
        (itemListThuoc) => itemListThuoc.idNhaCungCap == itemId
      );
      if (checkNhaCungCapDangCoTrongKhoThuoc.length == 0) {
        dataListNhaCungCap.map((item, index) => {
          if (item.id === itemId) {
            item = {
              ...item,
              ngayXoaBanGhi: moment().format("DD/MM/yyyy HH:mm:ss "),
              flag: false,
            };
            dispatch(actNhaCungCap.actUpdateSetFlagRequest(item));
          }
        });
        dispatch(actNhaCungCap.actDeleteNhaCungCap(itemId));
      } else {
        openMessageLoadingError(message.KHONG_DUOC_PHEP_XOA_NHA_CUNG_CAP);
      }
    });
  };

  useEffect(() => {
    dispatch(actNhaCungCap.actFetchNhaCungCapRequest());
    dispatch(actKhoThuoc.actFetchKhoThuocRequest());
  }, []);

  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h5 className=" mb-0 text-gray-800">Nhà cung cấp</h5>
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
                Danh sách nhà cung cấp
              </p>
            </div>

            {checkFormThemMoi && (
              <FormNhaCungCap
                onSave={onSave}
                cancel={cancel}
                checkEdit={checkEdit}
              />
            )}
            {checkDanhSach && (
              <TableNhaCungCap
                data={dataListNhaCungCap}
                match={match}
                onDelete={onDelete}
                onEdit={onEdit}
                setIdXoa={setIdXoa}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageQuanLyNhaCungCap;
