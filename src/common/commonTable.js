import React, { useState } from "react";
import { Table } from "antd";

export default function CommonTable({
  columns,
  dataSource,
  setIdXoa,
  checkRowSelection = true,
}) {
  const [selectionType, setSelectionType] = useState();
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setIdXoa(selectedRowKeys);
    },
  };
  return (
    <div>
      <Table
        scroll={{ x: "calc(700px + 50%)", y: 1000 }}
        rowSelection={
          checkRowSelection
            ? {
                type: selectionType,
                ...rowSelection,
              }
            : false
        }
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: [
            "10",
            "20",
            "30",
            "40",
            "50",
            "60",
            "70",
            "80",
            "90",
            "100",
          ],
        }}
      />
    </div>
  );
}
