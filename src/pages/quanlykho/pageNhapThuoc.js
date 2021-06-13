import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import TableNhapThuoc from "../../components/quanlykho/table";
import { Button, Tooltip, Switch } from "antd";
import * as act from "../../actions/quanlykho/actQuanLyKho";
import * as actQuanLyFiles from "../../actions/quanlyfiles/actQuanLyFiles";
import * as actNhaCungCap from "../../actions/quanlynhacungcap/actQuanLyNhaCungCap";
import FormKhoThuoc from "../../components/quanlykho/form";
import { renderDateTheoHeThong } from "./../../common/convert/renderConvert";
import DetailKhoThuoc from "../../components/quanlykho/detailKhoThuoc";
import ModalFile from "../../components/quanlyfiles/modalFiles";
import ModalQRCode from "../../components/quanlykho/modalQRCode";

function PageNhapThuoc({ match, location, history }) {
  const [checkFormThemMoi, setCheckFormThemMoi] = useState(false);
  const [checkDanhSach, setCheckDanhSach] = useState(true);
  const [checkEdit, setCheckEdit] = useState(false);
  const [checkShowDetail, setCheckShowDetail] = useState(false);
  const [visibleModalFile, setVisibleModalFile] = useState(false);
  const [recordTableThuoc, setRecordTableThuoc] = useState();
  const [isVisibleQrCode, setIsVisibleQrCode] = useState(false);
  const [valueRecordTable, setValueRecordTable] = useState();
  const [idXoa, setIdXoa] = useState([]);

  const { dataListThuoc, dataListFile, account_current, itemKhoThuoc } =
    useSelector(
      (state) => ({
        dataListThuoc: state.khothuoc.list,
        dataListFile: state.quanly_files.list,
        account_current: state.quanlylogin.account_current,
        itemKhoThuoc: state.khothuoc.item,
      }),
      shallowEqual
    );

  const dataListNhaCungCap = useSelector(
    (state) => state.quanlynhacungcap.list
  );

  const dispatch = useDispatch();

  function cancel() {
    setCheckDanhSach(true);
    setCheckFormThemMoi(false);
    setCheckShowDetail(false);
  }

  function onSave(value) {
    let file = value.fileDinhKem;
    let strFile = "";
    file.map((item, index) => {
      if (index == file.length - 1) {
        strFile += item.idFile;
      } else {
        strFile += item.idFile + "/";
      }
    });
    let dataThuoc = {
      id: value.id ? value.id : "",
      tenThuoc: value.tenThuoc,
      ma: value.ma,
      donViTinh: value.donViTinh,
      tongTienTruocThue: value.tongTienTruocThue,
      phanTramThue: value.phanTramThue,
      chietKhau: value.chietKhau,
      giaTien: value.giaTien,
      thanhToan: value.thanhToan,
      soLuongNhap: value.soLuongNhap,
      soLuongBanDau: value.soLuongNhap,
      soLuongDaBan: 0,
      hanSuDungThuoc: value.hanSuDungThuoc,
      soLuongMua: value.soLuongMua,
      ngayNhapThuoc: value.ngayNhapThuoc,
      nhaCungCapId: value.nhaCungCapId ? value.nhaCungCapId : "",
      ngayTaoBanGhi: value.ngayTaoBanGhi ? value.ngayTaoBanGhi : "",
      phanLoaiThuoc: value.phanLoaiThuoc,
      khuVuc: value.khuVuc,
      fileDinhKem: strFile,
      nguoiTaoId: account_current.id,
    };

    let dataNhaCungCap = {
      thongTinNhaCungCap: value.thongTinNhaCungCap,
      tenNhaCungCap: value.tenNhaCungCap,
      diaChiNhaCungCap: value.diaChiNhaCungCap,
      mstNhaCungCap: value.mstNhaCungCap,
      soDienThoaiNhaCungCap: value.soDienThoaiNhaCungCap,
      zalo: value.zalo,
      email: value.email,
      ngayTaoBanGhi: value.ngayTaoBanGhi ? value.ngayTaoBanGhi : "",
      thongTinNguoiTao: account_current.id,
    };
    if (value.id) {
      dataThuoc = {
        ...dataThuoc,
        fileDinhKem: strFile,
      };
      // if (
      //   value &&
      //   value.fileDinhKem &&
      //   dataListFile &&
      //   dataListFile.length > 0
      // ) {
      //   let dataFiles = {
      //     ...dataListFile.filter((item) => item.idThuoc === value.id)[0],
      //     fileDinhKem: value.fileDinhKem ? value.fileDinhKem : "",
      //   };
      //   dispatch(actQuanLyFiles.actUpdatefilesRequest(dataFiles));
      // }

      if (value.nhaCungCapId) {
        dispatch(act.actUpdateThuocRequest(dataThuoc));
      } else {
        dispatch(
          actNhaCungCap.actCreateNhaCungCapRequest(dataNhaCungCap, dataThuoc)
        );
      }
    } else {
      if (value.nhaCungCapId) {
        dispatch(act.actCreateNhapKhoThuocRequest(dataThuoc));
      } else {
        dispatch(
          actNhaCungCap.actCreateNhaCungCapRequest(dataNhaCungCap, dataThuoc)
        );
      }
    }
    cancel();
  }

  const handdleXoaNhieu = () => {
    idXoa.map((itemId, indexId) => {
      dataListThuoc.map((item, index) => {
        if (item.id == itemId) {
          item = {
            ...item,
            ngayXoaBanGhi: renderDateTheoHeThong(),
            flag: false,
          };
          dispatch(act.actUpdateSetFlagRequest(item));
        }
      });
      dispatch(act.actDeleteNhapKhoThuoc(itemId));
      dispatch(
        actQuanLyFiles.actDeletefilesRequest(
          dataListFile &&
            dataListFile.filter((itemFile) => itemFile.idThuoc === itemId)
              .length > 0 &&
            Array.isArray(dataListFile) &&
            dataListFile.filter((itemFile) => itemFile.idThuoc === itemId)[0].id
        )
      );
    });
  };

  const handdleXoaVinhVien = () => {
    idXoa.map((itemId, indexId) => {
      dispatch(act.actDeleteNhapKhoThuocRequest(itemId));
      dispatch(
        actQuanLyFiles.actDeletefilesRequest(
          dataListFile &&
            dataListFile.filter((itemFile) => itemFile.idThuoc === itemId)
              .length > 0 &&
            Array.isArray(dataListFile) &&
            dataListFile.filter((itemFile) => itemFile.idThuoc === itemId)[0].id
        )
      );
    });
  };

  const onDelete = (id) => {
    dataListThuoc.map((item, index) => {
      if (item.id == id) {
        item = {
          ...item,
          ngayXoaBanGhi: renderDateTheoHeThong(),
          flag: false,
        };
        dispatch(act.actUpdateSetFlagRequest(item));
      }
    });
    dispatch(act.actDeleteNhapKhoThuoc(id));
    dispatch(
      actQuanLyFiles.actUpdateSetFlagRequest(
        dataListFile &&
          dataListFile.filter((itemFile) => itemFile.idThuoc === id).length >
            0 &&
          Array.isArray(dataListFile) &&
          dataListFile.filter((itemFile) => itemFile.idThuoc === id)[0]
      )
    );
  };

  const deleteFiles = (itemFileCanXoa, record) => {
    if (
      dataListThuoc &&
      Array.isArray(dataListThuoc) &&
      dataListThuoc.filter((itemThuoc) => itemThuoc.id == record.id).length > 0
    ) {
      let dataThuoc = {
        ...record,
        fileDinhKem: dataListThuoc
          .filter((itemThuoc) => itemThuoc.id == record.id)[0]
          .fileDinhKem.filter((itemFilter) => itemFilter !== itemFileCanXoa),
      };
      dispatch(act.actUpdateThuocRequest(dataThuoc));

      if (dataListFile.filter((itemFile) => itemFile.idThuoc === record.id)) {
        let fileUpload = {
          ...dataListFile.filter(
            (itemFile) => itemFile.idThuoc === record.id
          )[0],
          fileDinhKem: dataListThuoc
            .filter((itemThuoc) => itemThuoc.id == record.id)[0]
            .fileDinhKem.filter((itemFilter) => itemFilter !== itemFileCanXoa),
        };
        dispatch(actQuanLyFiles.actUpdatefilesRequest(fileUpload));
      }
    }
  };

  const onDetail = (id) => {
    setCheckShowDetail(true);
    setCheckDanhSach(false);
    dispatch(act.actGetKhoThuocByIdRequest(id));
  };

  function onEdit(record) {
    setRecordTableThuoc(record);
    dispatch(act.actGetKhoThuocByIdRequest(record.id));
    setCheckFormThemMoi(true);
    setCheckDanhSach(false);
    setCheckEdit(true);
  }

  function resetForm() {
    dispatch(act.actGetKhoThuocById(null));
  }

  function openForm() {
    resetForm();
    setCheckFormThemMoi(true);
    setCheckDanhSach(false);
    setCheckEdit(true);
    dispatch(actNhaCungCap.actGetNhaCungCapById(null));
  }

  const onThongBaoHetHang = (value) => {
    value = {
      message: `Thuốc: ${value.tenThuoc} đã gần hết , số lượng còn trong kho : ${value.soLuongBanDau}`,
      idThuoc: value.id,
    };
  };

  const handleUploadFile = () => {
    setVisibleModalFile(true);
  };

  const onHandleQRCode = (record) => {
    setIsVisibleQrCode(true);
    setValueRecordTable(record);
  };

  useEffect(() => {
    dispatch(act.actFetchKhoThuocRequest());
    dispatch(actNhaCungCap.actFetchNhaCungCapRequest());
    dispatch(actQuanLyFiles.actFetchfilesRequest());
  }, []);

  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h5 className=" mb-0 text-gray-800">Nhập thuốc vào kho</h5>
        {!checkShowDetail && (
          <div className="row">
            <Button
              size="small"
              className="m-2"
              onClick={() => {
                openForm();
              }}
              type="dashed"
            >
              <i class="fa fa-plus-square" aria-hidden="true"></i>
            </Button>

            <Tooltip
              placement="bottom"
              title="Thêm file"
              color="green"
              key="red"
            >
              <Button
                className="m-2 "
                size="small"
                onClick={() => {
                  handleUploadFile();
                }}
                type="dashed"
                danger={true}
              >
                <i
                  class="fa fa-cloud-upload"
                  aria-hidden="true"
                  style={{ color: "green" }}
                ></i>
              </Button>
            </Tooltip>

            <Tooltip placement="bottom" title="Xoá nhiều" color="red" key="red">
              <Button
                className="m-2 "
                size="small"
                onClick={() => {
                  handdleXoaNhieu();
                }}
                type="dashed"
                danger={true}
              >
                <i
                  class="fa fa-trash-o"
                  style={{ color: "red" }}
                  aria-hidden="true"
                ></i>
              </Button>
            </Tooltip>

            <Tooltip
              placement="bottom"
              title="Xoá vĩnh viễn"
              color="red"
              key="red"
            >
              <Button
                className="m-2 mr-5 "
                size="small"
                onClick={() => {
                  handdleXoaVinhVien();
                }}
                type="dashed"
                danger={true}
              >
                <i class="fa fa-ban" aria-hidden="true"></i>
              </Button>
            </Tooltip>
          </div>
        )}
      </div>

      <div className="row">
        {/* <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4 ">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold ">
                Danh sách thuốc trong kho
              </h6>
              {checkShowDetail && (
                <div className="row">
                  <a
                    size="small"
                    onClick={() => {
                      cancel();
                    }}
                  >
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                  </a>
                </div>
              )}
            </div>
            {checkFormThemMoi && (
              <FormKhoThuoc
                recordTableThuoc={recordTableThuoc}
                onSave={onSave}
                cancel={cancel}
                checkEdit={checkEdit}
                setCheckEdit={setCheckEdit}
                dataListNhaCungCap={dataListNhaCungCap}
              />
            )}
            {checkDanhSach && (
              <TableNhapThuoc
                data={dataListThuoc}
                match={match}
                onDelete={onDelete}
                onEdit={onEdit}
                onThongBaoHetHang={onThongBaoHetHang}
                setIdXoa={setIdXoa}
                deleteFiles={deleteFiles}
                onDetail={onDetail}
                onHandleQRCode={onHandleQRCode}
              />
            )}
            {checkShowDetail && (
              <DetailKhoThuoc
                history={history}
                match={match}
                itemKhoThuoc={itemKhoThuoc}
              />
            )}

            <ModalFile
              isVisible={visibleModalFile}
              handleCancel={() => setVisibleModalFile(false)}
            />

            <ModalQRCode
              visible={isVisibleQrCode}
              handleCancel={() => setIsVisibleQrCode(false)}
              valueRecordTable={valueRecordTable}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNhapThuoc;
