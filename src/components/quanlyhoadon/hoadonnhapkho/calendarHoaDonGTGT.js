import React, { useState } from "react";
import { Calendar } from "antd";
import * as actHoaDonGTGT from "../../../actions/quanly_hoadon/actHoaDonGTGT";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import queryString from "query-string";
export default function CalendarHoaDonGTGT({
  setValueDate,
  setCheckDanhSach,
  setCheckFormEdit,
}) {
  const dispatch = useDispatch();

  function onChange(value, mode) {
    setCheckFormEdit(false);
    const queryStringParam = queryString.stringifyUrl({
      url: "hoadongtgt/getAllHoaDonGTGTByDate",
      query: { date: value.format("YYYY-MM-DD") },
    });

    dispatch(actHoaDonGTGT.actFetchHoaDonGTGTTheoDateRequest(queryStringParam));
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
