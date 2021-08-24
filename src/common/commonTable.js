import React, { useState } from "react";
import { Card, Pagination } from "react-rainbow-components";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { Table, Column, MenuItem } from "react-rainbow-components";
export default function CommonTable({
  columns,
  dataSource,
  setIdXoa,
  checkRowSelection = true,
  onChangePage,
  onEdit,
  onDelete,
}) {
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setIdXoa(selectedRowKeys);
    },
  };

  const handleSelectRow = (value) => {
    setIdXoa(value);
  };
  const { pagination } = useSelector(
    (state) => ({
      pagination: state.pagination.item,
    }),
    shallowEqual
  );

  const [data, setData] = useState(dataSource);
  const handleSort = (event, field, nextSortDirection) => {
    // console.log(event, field, nextSortDirection);
    // const newData = [...dataSource];
    // const key = (value) => value[field];
    // const reverse = nextSortDirection === "asc" ? 1 : -1;
    // const sortedData = newData.sort((aItem, bItem) => {
    //   const aValue = key(aItem);
    //   const bValue = key(bItem);
    //   return reverse * ((aValue > bValue) - (bValue > aValue));
    // });
    // setData(sortedData);
  };

  const handleOnChange = (value, e) => {
    console.log(value, e);
  };
  return (
    <div>
      <Table
        id="table-5"
        keyField="id"
        showCheckboxColumn
        data={dataSource}
        showRowNumberColumn
        // sortedBy={sortedBy}
        onSort={handleSort}
        onRowSelection={(selection) => handleSelectRow(selection)}
      >
        {columns.map((item, index) => {
          return <Column header={item.title} field={item.dataIndex} sortable />;
        })}
        <Column type="action">
          <MenuItem label="Sửa" onClick={(event, data) => onEdit(data.id)} />
          <MenuItem label="Xóa" onClick={(event, data) => onDelete(data.id)} />
        </Column>
      </Table>
      <div>
        <Pagination
          className="rainbow-m_auto"
          pages={
            Math.ceil(pagination && pagination.total / 10) > 0
              ? Math.ceil(pagination && pagination.total / 10)
              : 0
          }
          activePage={10}
          onChange={(e, page) => onChangePage(e, page)}
        />
      </div>
    </div>
  );
}
