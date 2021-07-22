import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function darboard({}) {
  const data = [
    {
      date: "2018",
      soLuong: 100,
    },
    {
      date: "2019",
      soLuong: 200,
    },
    {
      date: "2020",
      soLuong: 187,
    },
    {
      date: "2021",
      soLuong: 66,
    },
    {
      date: "2022",
      soLuong: 222,
    },
    {
      date: "2023",
      soLuong: 320,
    },
    {
      date: "2024",
      soLuong: 101,
    },
  ];

  return (
    <AreaChart
      width={1000}
      height={500}
      data={data}
      margin={{
        top: 50,
        right: 30,
        left: 50,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="soLuong" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
}

export default darboard;
