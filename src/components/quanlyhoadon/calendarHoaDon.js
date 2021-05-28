import React from "react";
import { Calendar } from "antd";
export default function CalendarHoaDon({ setValueDate, setCheckDanhSach }) {
  function onChange(value) {
    setValueDate(value.format("DD/MM/YYYY"));
    setCheckDanhSach(true);
  }

  function onPanelChange(value, mode) {
    console.log(value.format("YYYY-MM-DD"), mode);
  }
  function onClick(value) {
    setValueDate(value.format("DD/MM/YYYY"));
    setCheckDanhSach(true);
  }

  return (
    <>
      <div className="site-calendar-demo-card">
        <Calendar
          fullscreen={false}
          onChange={onChange}
          onPanelChange={onPanelChange}
          onSelect={onClick}
        />
      </div>
    </>
  );
}
