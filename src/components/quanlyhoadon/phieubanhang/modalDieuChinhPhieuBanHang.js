import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import FormDieuChinhPhieuBanHang from "./formDieuChinhPhieuBanHang";

export default function ModalDieuChinhPhieuBanHang({
  isVisible,
  onCancel,
  onSave,
  checkEdit,
  setCheckSubmitForm,
}) {
  return (
    <>
      <Modal
        title="Điều chỉnh phiếu bán hàng"
        visible={isVisible}
        onCancel={onCancel}
        width={1000}
        footer={false}
      >
        <div style={{ textAlign: "left" }}>
          <FormDieuChinhPhieuBanHang
            onSave={onSave}
            isVisible={isVisible}
            cancel={onCancel}
            checkEdit={checkEdit}
            setCheckSubmitForm={setCheckSubmitForm}
          />
        </div>
      </Modal>
    </>
  );
}
