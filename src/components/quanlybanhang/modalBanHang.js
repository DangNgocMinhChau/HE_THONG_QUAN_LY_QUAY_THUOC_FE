import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useSelector } from "react-redux";
import FormBanHang from "./formBanHang";

function ModalBanHang({ isVisible, onCancel, onSave, checkEdit }) {
  return (
    <>
      <Modal
        title="Điều chỉnh"
        visible={isVisible}
        onCancel={onCancel}
        width={1000}
        footer={false}
        // footer={[<Button onClick={handleCancel}>Hủy</Button>]}
      >
        <div style={{ textAlign: "left" }}>
          <FormBanHang
            onSave={onSave}
            isVisible={isVisible}
            cancel={onCancel}
            onSave={onSave}
            checkEdit={checkEdit}
          />
        </div>
      </Modal>
    </>
  );
}

export default ModalBanHang;
