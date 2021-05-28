import { Table } from "antd";
import React, { useState } from "react";
import ModalCommon from "../../components/management_hotel/modalCommon";
import TableManagementHotel from "./../../components/management_hotel/table";
import { Modal, Button } from "antd";

function Body(props) {
  const [openModal, setOpenModal] = useState(false);

  function cancel() {
    setOpenModal(false);
  }

  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Quản lý nhà hàng</h1>

        <ModalCommon isVisible={openModal} handleCancel={() => cancel()} />
        <Button
          type="primary"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Thêm mới
        </Button>
      </div>

      <div className="row">
        {/* <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Danh sách nhà hàng
              </h6>
            </div>
            <TableManagementHotel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
