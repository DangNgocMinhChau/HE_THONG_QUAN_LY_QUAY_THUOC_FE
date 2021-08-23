import React, { useState } from "react";
import { Pagination, Table } from "antd";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

export default function CommonTable({
  columns,
  dataSource,
  setIdXoa,
  checkRowSelection = true,
  onChangePage,
}) {
  const [selectionType, setSelectionType] = useState();
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setIdXoa(selectedRowKeys);
    },
  };
  const { pagination } = useSelector(
    (state) => ({
      pagination: state.pagination.item,
    }),
    shallowEqual
  );

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
        pagination={false}
      />
      <div>
        <Pagination
          defaultCurrent={1}
          total={pagination.total}
          onChange={(page, PageSize) => onChangePage(page, PageSize)}
        />
      </div>
    </div>
  );
}
