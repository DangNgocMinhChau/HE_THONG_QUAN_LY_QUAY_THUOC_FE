import React, { Component } from "react";
import { Tabs, Button, Tooltip } from "antd";
import * as actBanHang from "../../actions/quanlybanhang/actQuanLyBanHang";
import * as actQuanLyBanHangThanhCong from "../../actions/quanly_hoadon_ban_thanhcong/actQuanLyHoaDonBanThanhCong";
import * as actQuanLyThongTinKhachHang from "../../actions/quanlythongtinkhachhang/actQuanLyThongTinKhachHang";
import FormBanHang from "../../components/quanlybanhang/formBanHang";
import { renderDateTheoHeThong } from "./../../common/convert/renderConvert";
import ModalBanHang from "../../components/quanlybanhang/modalBanHang";
import FormThongTinKhachHang from "../../components/quanlythongtinkhachhang/formThongTinKhachHang";
import { connect } from "react-redux";
const { TabPane } = Tabs;
class PageQuanLyBanHangTest extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: "Tab 1", content: "Content of Tab Pane 1", key: "1" },
    ];
    this.state = {
      activeKey: panes[0].key,
      checkEdit: false,
      isVisible: false,
      checkFormThemMoiKhachHang: false,
      panes,
    };
  }
  componentDidMount = () => {
    var {
      fetchBanHang,
      listHoaDonBanHangTam,
      handleEdit,
      fetchThongtinKhachHang,
    } = this.props;
    fetchBanHang();
    if (listHoaDonBanHangTam.length > 0) {
      handleEdit(listHoaDonBanHangTam[0].id);
    }
    fetchThongtinKhachHang();
  };

  onChange = (activeKey) => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;

    panes.push({ title: "New Tab", content: { FormBanHang }, key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = (targetKey) => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter((pane) => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  cancel = () => {
    this.setState({
      isVisible: false,
    });
  };

  cancelSauKhiThemThongTinKhachHang = () => {
    this.setState({
      isVisible: false,
      checkFormThemMoiKhachHang: false,
    });
  };

  onSave = (value) => {
    var { updateBanHang, createBanHang } = this.props;
    if (value.id) {
      value = {
        ...value,
        ngayChinhSua: renderDateTheoHeThong(),
      };
      updateBanHang(value);
    } else {
      value = {
        ...value,
        ngayTaoBanGhi: renderDateTheoHeThong(),
        nguoiTaoId: this.props.account_current.id,
      };
      createBanHang(value);
    }
  };

  handleHuyDonDatHangTam = () => {
    var { huyDonDatHangTam, itemHoaDon } = this.props;
    huyDonDatHangTam(itemHoaDon && itemHoaDon.id);
  };

  onSaveQuanLyThongTinKhachHang = (value) => {
    var { updateThongTinKhachHang, createThongTinKhachHang } = this.props;
    if (value.id) {
      value = {
        ...value,
        ten: value.soDienThoaiKhachHang,
        ngayChinhSua: renderDateTheoHeThong(),
      };

      updateThongTinKhachHang(value);
    } else {
      value = {
        ...value,
        ten: value.soDienThoaiKhachHang,
        ngayTaoBanGhi: renderDateTheoHeThong(),
      };

      createThongTinKhachHang(value, this.callRequestThongTinKhachHang);
    }
    this.cancelSauKhiThemThongTinKhachHang();
  };

  callRequestThongTinKhachHang = () => {
    var { fetchThongtinKhachHang } = this.props;
    fetchThongtinKhachHang();
  };

  onDelete = (id) => {
    var { onDelete } = this.props;
    onDelete(id);
  };

  handleEdit = (id) => {
    var { handleEdit } = this.props;
    handleEdit(id);
    this.setState({
      checkEdit: true,
      isVisible: true,
    });
  };

  onCancel = () => {
    this.setState({
      isVisible: false,
    });
  };

  hoanTatThanhToan = (value) => {
    var { handleHoanTatHoaDon } = this.props;
    handleHoanTatHoaDon(value, this.hoaDonDaHoanTat);
    // dispatch(
    //   actBanHang.actGetHoaDonSauKhiBanByIdRequest(value, hoaDonDaHoanTat)
    // );
  };

  hoaDonDaHoanTat = (value) => {
    var { createHoaDonDaHoanTat, resetHoaDon, resetBanHangById } = this.props;
    let idHoaDonBanHang = value.id;
    value = {
      sanPham: value.sanPham,
      idKhachHang: value.idKhachHang,
      soDienThoaiKhachHang: value.soDienThoaiKhachHang,
      tenKhachHang: value.tenKhachHang,
      nguoiTaoId: value.nguoiTaoId,
      tienNhan: value.tienNhan,
      ngayTaoBanGhi: renderDateTheoHeThong(),
    };
    createHoaDonDaHoanTat(value);
    resetHoaDon({});
    resetBanHangById({});
    this.onDelete(idHoaDonBanHang);
  };

  render() {
    var { checkEdit, checkFormThemMoiKhachHang, isVisible } = this.state;
    var { itemHoaDon, listHoaDonBanHangTam } = this.props;
    const { panes, activeKey } = this.state;
    return (
      <div className="container-fluid ">
        <div className="row">
          {/* <!-- Area Chart --> */}
          <div className="col-xl-12 col-lg-12">
            <div className="card-custom shadow mb-4">
              {/* <!-- Card Header - Dropdown --> */}
              <div className="card-header-custom py-2 d-flex flex-row align-items-center justify-content-between ">
                <p className="text-card-header">
                  <i
                    className="color-icon-header-remove fa fa-cart-arrow-down"
                    aria-hidden="true"
                  ></i>
                  Bán hàng
                </p>
                {/* <div className=" d-flex flex-row align-items-center  ">
                <Tooltip
                  placement="bottom"
                  title="Tạo mới khách hàng"
                  key="red"
                >
                  <i
                    className="fa fa-address-card"
                    style={{ color: "indigo", cursor: "pointer" }}
                    aria-hidden="true"
                    onClick={() => {
                      setCheckFormThemMoiKhachHang(!checkFormThemMoiKhachHang);
                    }}
                  ></i>
                </Tooltip>
              </div> */}
              </div>
              {this.state.checkFormThemMoiKhachHang && (
                <FormThongTinKhachHang
                  onSave={this.onSaveQuanLyThongTinKhachHang}
                  cancel={this.cancelSauKhiThemThongTinKhachHang}
                  checkEdit={checkEdit}
                />
              )}

              <ModalBanHang
                isVisible={isVisible}
                onCancel={this.onCancel}
                onSave={this.onSave}
                checkEdit={checkEdit}
              />

              <Tabs
                type="editable-card"
                onChange={this.onChange}
                activeKey={activeKey}
                onEdit={this.onEdit}
              >
                {panes.map((pane) => (
                  <TabPane
                    tab={pane.title}
                    key={pane.key}
                    closable={pane.closable}
                  >
                    {pane.content}
                  </TabPane>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  account_current: state.quanlylogin.account_current,
  listHoaDonBanHangTam: state.quanlybanhang.list,
  itemHoaDon: state.quanlybanhang.itemHoaDon,
});

const mapDispatchToProps = (dispatch) => ({
  updateBanHang: (value) => {
    dispatch(actBanHang.actUpdateBanHangRequest(value));
  },

  createBanHang: (value) => {
    dispatch(actBanHang.actCreateBanHangRequest(value));
  },

  huyDonDatHangTam: (value) => {
    dispatch(actBanHang.actDeleteBanHangRequest(value));
  },

  updateThongTinKhachHang: (value) => {
    dispatch(
      actQuanLyThongTinKhachHang.actUpdateThongTinKhachHangRequest(value)
    );
  },
  createThongTinKhachHang: (value, callRequestThongTinKhachHang) => {
    dispatch(
      actQuanLyThongTinKhachHang.actCreateThongTinKhachHangRequest(
        value,
        callRequestThongTinKhachHang
      )
    );
  },
  fetchThongtinKhachHang: () => {
    dispatch(actQuanLyThongTinKhachHang.actFetchThongTinKhachHangRequest());
  },
  onDelete: (id) => {
    dispatch(actBanHang.actDeleteBanHangRequest(id));
  },
  handleEdit: (id) => {
    dispatch(actBanHang.actGetBanHangByIdRequest(id));
  },
  handleHoanTatHoaDon: (value, hoaDonDaHoanTat) => {
    dispatch(
      actBanHang.actGetHoaDonSauKhiBanByIdRequest(value, hoaDonDaHoanTat)
    );
  },
  createHoaDonDaHoanTat: (value) => {
    dispatch(actQuanLyBanHangThanhCong.actCreateHoaDonDaHoanTatRequest(value));
  },
  resetHoaDon: (value) => {
    dispatch(actBanHang.actHoaDonBanHang(value));
  },
  resetBanHangById: (value) => {
    dispatch(actBanHang.actGetBanHangById(value));
  },
  fetchBanHang: () => {
    dispatch(actBanHang.actFetchBanHangRequest());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageQuanLyBanHangTest);
