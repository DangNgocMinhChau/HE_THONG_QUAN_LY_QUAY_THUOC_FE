import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import TableNhapThuoc from "../../components/quanlykho/table";
import { Button, Tooltip } from "antd";
import * as act from "../../actions/quanlykho/actQuanLyKho";
import * as actQuanLyFiles from "../../actions/quanlyfiles/actQuanLyFiles";
import * as actNhaCungCap from "../../actions/quanlynhacungcap/actQuanLyNhaCungCap";
import FormKhoThuoc from "../../components/quanlykho/form";
import DetailKhoThuoc from "../../components/quanlykho/detailKhoThuoc";
import ModalFile from "../../components/quanlyfiles/modalFiles";
import ModalQRCode from "../../components/quanlykho/modalQRCode";
import { ConfirmButtonTooltip } from "../../common/renderThongBao/renderThongBaoCommon";

export default function PageNhapThuoc({ match, location, history }) {
  const [checkFormThemMoi, setCheckFormThemMoi] = useState(false);
  const [checkDanhSach, setCheckDanhSach] = useState(true);
  const [checkEdit, setCheckEdit] = useState(false);
  const [checkShowDetail, setCheckShowDetail] = useState(false);
  const [visibleModalFile, setVisibleModalFile] = useState(false);
  const [recordTableThuoc, setRecordTableThuoc] = useState();
  const [isVisibleQrCode, setIsVisibleQrCode] = useState(false);
  const [valueRecordTable, setValueRecordTable] = useState();
  const [idXoa, setIdXoa] = useState([]);
  const [titleCardHeader, setTitleCardHeader] = useState("");

  const {
    dataListThuoc,
    dataListFile,
    account_current,
    itemKhoThuoc,
    dataListNhaCungCap,
  } = useSelector(
    (state) => ({
      dataListThuoc: state.khothuoc.list,
      dataListFile: state.quanly_files.list,
      account_current: state.quanlylogin.account_current,
      itemKhoThuoc: state.khothuoc.item,
      dataListNhaCungCap: state.danhmuc.nhacungcap.list,
    }),
    shallowEqual
  );

  const ConvertThanhPhayVaCham = (value, slkitu = 5) => {
    let result = "";
    if (value !== null && value !== undefined) {
      result += formatNumber(parseInt(value.toString().split(".")[0]), 3);
      if (
        value.toString().split(".")[1] !== null &&
        value.toString().split(".")[1] !== undefined
      ) {
        result += "," + value.toString().split(".")[1].substring(0, slkitu);
      }
    }
    return result;
  };

  const formatNumber = (number, decimal = 2) => {
    // try {
    //   if (isNumber(number)) {
    //     return new Intl.NumberFormat("vi-VN", {
    //       maximumFractionDigits: decimal,
    //     }).format(number);
    //   } else {
    //     return 0;
    //   }
    // } catch (error) {
    //   return 0;
    // }
  };
  const dispatch = useDispatch();

  function cancel() {
    setCheckDanhSach(true);
    setCheckFormThemMoi(false);
    setCheckShowDetail(false);
    setTitleCardHeader("Danh s??ch thu???c");
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
      soLuongDaBan: value.soLuongDaBan,
      hanSuDungThuoc: value.hanSuDungThuoc,
      soLuongMua: value.soLuongMua,
      ngayNhapThuoc: value.ngayNhapThuoc,
      nhaCungCapId: value.nhaCungCapId ? value.nhaCungCapId : "",
      ngayTaoBanGhi: value.ngayTaoBanGhi ? value.ngayTaoBanGhi : "",
      phanLoaiThuoc: value.phanLoaiThuoc,
      khuVuc: value.khuVuc,
      fileDinhKem: strFile,
      flag: true,
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
    let value = idXoa;
    dispatch(act.actDeleteKhothuocRequest(value));
  };

  const handdleXoaVinhVien = () => {
    let value = idXoa;
    dispatch(act.actDeleteKhothuocVinhVienRequest(value));
  };

  const onDelete = (id) => {
    let value = [id];
    dispatch(act.actDeleteKhothuocRequest(value));
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
    setTitleCardHeader("Chi ti???t s???n ph???m");
  };

  function onEdit(record) {
    setRecordTableThuoc(record);
    dispatch(act.actGetKhoThuocByIdRequest(record.id));
    setCheckFormThemMoi(true);
    setCheckDanhSach(false);
    setCheckEdit(true);
    setTitleCardHeader(`Ch???nh s???a thu???c - ${record.tenThuoc} `);
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
    setTitleCardHeader("Th??m m???i thu???c");
  }

  const onThongBaoHetHang = (value) => {
    value = {
      message: `Thu???c: ${value.tenThuoc} ???? g???n h???t , s??? l?????ng c??n trong kho : ${value.soLuongBanDau}`,
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
    setTitleCardHeader("Danh s??ch thu???c");
  }, []);

  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h5 className=" mb-0 text-gray-800">Nh???p thu???c v??o kho</h5>
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
              <i className="fa fa-plus-square" aria-hidden="true"></i>
            </Button>

            <Tooltip
              placement="bottom"
              title="Th??m file"
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
                  className="fa fa-cloud-upload"
                  aria-hidden="true"
                  style={{ color: "green" }}
                ></i>
              </Button>
            </Tooltip>

            <ConfirmButtonTooltip
              messageTitleTooltip={"Xo?? nhi???u"}
              messageTitlePopconfirm={"B???n c?? ch???c ch???n mu???n xo?? ?"}
              handleOnclick={handdleXoaNhieu}
              color="red"
              key="Xo?? nhi???u"
              okText="C??"
              cancelText="Kh??ng"
              typeButton="dashed"
              dangerButton={true}
              classNameIcon={"fa fa-trash-o"}
              colorIcon={"red"}
            />

            <ConfirmButtonTooltip
              messageTitleTooltip={"Xo?? v??nh vi???n"}
              messageTitlePopconfirm={"B???n c?? ch???c ch???n mu???n xo?? ?"}
              handleOnclick={handdleXoaVinhVien}
              color="red"
              key="Xo?? v??nh vi???n"
              okText="C??"
              cancelText="Kh??ng"
              typeButton="dashed"
              dangerButton={true}
              classNameIcon="fa fa-ban"
              colorIcon="red"
            />
          </div>
        )}
      </div>

      <div className="row">
        {/* <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-12">
          <div className="card-custom shadow mb-4 ">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header-custom py-2 d-flex flex-row align-items-center justify-content-between">
              <p className="text-card-header">{titleCardHeader}</p>
              {checkShowDetail && (
                <a
                  onClick={() => {
                    cancel();
                  }}
                >
                  <i
                    style={{ color: "AppWorkspace", marginRight: "20px" }}
                    className="fa fa-chevron-left"
                    aria-hidden="true"
                  ></i>
                </a>
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
