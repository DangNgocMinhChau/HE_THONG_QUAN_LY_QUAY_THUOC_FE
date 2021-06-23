import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import PageQuanLyFiles from "./../../pages/quanlyfile/pageQuanLyFiles";
function ModalFile({ isVisible, handleCancel, onSave }) {
  return (
    <>
      <Modal
        title="Upload file"
        visible={isVisible}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button onClick={handleCancel}>Hủy</Button>,
          // <Button onClick={() => form.submit()}>OK</Button>,
        ]}
      >
        {/* <div style={{ textAlign: "left" }}></div> */}
        <PageQuanLyFiles />
      </Modal>
    </>
  );
}

export default ModalFile;
