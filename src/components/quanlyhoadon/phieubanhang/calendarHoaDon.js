import React, { useState } from "react";
import { Calendar } from "antd";
import * as actHoaDonHoaDonDaHoanTat from "../../../actions/quanly_hoadon_ban_thanhcong/actQuanLyHoaDonBanThanhCong";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import queryString from "query-string";
export default function CalendarHoaDon({ setValueDate, setCheckDanhSach }) {
  const dispatch = useDispatch();

  function onChange(value, mode) {
    const queryStringParam = queryString.stringifyUrl({
      url: "quanlybanhangthanhcong/getAllHoaDonByDate",
      query: { date: value.format("DD/MM/YYYY") },
    });

    dispatch(
      actHoaDonHoaDonDaHoanTat.actFetchHoaDonDaHoanTatTheoDateRequest(
        queryStringParam
      )
    );
  }

  // function querystring(query = {}) {
  //   // get array of key value pairs ([[k1, v1], [k2, v2]])
  //   const qs = Object.entries(query)
  //     // filter pairs with undefined value
  //     .filter((pair) => pair[1] !== undefined)
  //     // encode keys and values, remove the value if it is null, but leave the key
  //     .map((pair) =>
  //       pair
  //         .filter((i) => i !== null)
  //         .map(encodeURIComponent)
  //         .join("=")
  //     )
  //     .join("&");

  //   return qs && "?" + qs;
  // }

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
