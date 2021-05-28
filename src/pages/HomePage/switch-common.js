import React from "react";
import { Switch } from "antd";
function SwitchCommon({ name, onClick }) {
  return (
    <>
      <Switch onClick={onClick} size="small" defaultChecked />
      <span style={{ margin: "10px" }}>{name}</span>
    </>
  );
}

export default SwitchCommon;
