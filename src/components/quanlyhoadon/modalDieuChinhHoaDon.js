import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import FormDieuChinhHoaDon from "./formDieuChinhHoaDon";

function ModalDieuChinhHoaDon({
  isVisible,
  onCancel,
  onSave,
  checkEdit,
  setCheckSubmitForm,
}) {
  return (
    <>
      <Modal
        title="Điều chỉnh hoá đơn"
        visible={isVisible}
        onCancel={onCancel}
        width={1000}
        footer={false}
      >
        <div style={{ textAlign: "left" }}>
          <FormDieuChinhHoaDon
            onSave={onSave}
            isVisible={isVisible}
            cancel={onCancel}
            onSave={onSave}
            checkEdit={checkEdit}
            setCheckSubmitForm={setCheckSubmitForm}
          />
        </div>
      </Modal>
    </>
  );
}

export default ModalDieuChinhHoaDon;
