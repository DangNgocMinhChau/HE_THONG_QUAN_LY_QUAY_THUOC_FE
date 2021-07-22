import React from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import Darboard from "./darboard";
const { TabPane } = Tabs;

export default function DarbordTop10ThuocBanChay({}) {
  const dataTopthuoc = useSelector((state) => state.khothuoc.list);

  const onChange = (e) => {};

  return (
    <Tabs type="card" onChange={(e) => onChange(e)}>
      {dataTopthuoc.map((item, index) => {
        return (
          <TabPane tab={item.tenThuoc} key={item.id}>
            <Darboard />
          </TabPane>
        );
      })}
    </Tabs>
  );
}
