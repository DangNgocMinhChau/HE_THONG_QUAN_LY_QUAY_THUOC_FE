import React, { useState } from "react";
import { Calendar } from "antd";
export default function CalendarHoaDon({ setValueDate, setCheckDanhSach }) {
  function onChange(value, mode) {
    if (arr.length <= 0) {
      setValueDate(value.format("DD/MM/YYYY"));
      // setCheckDanhSach(true);
    } else {
      arr = [];
    }
  }
  let arr = [];
  function onPanelChange(value, mode) {
    if (mode != undefined) {
      arr = [];
      arr.push(mode);
    }
    if (arr.length > 0) {
      // setCheckDanhSach(false);
    }
  }

  return (
    <>
      <div>
        <Calendar
          fullscreen={false}
          onChange={(value, mode) => onChange(value, mode)}
          onPanelChange={onPanelChange}
          onSelect={(value, mode) => onChange(value, mode)}
        />
      </div>
    </>
  );
}
