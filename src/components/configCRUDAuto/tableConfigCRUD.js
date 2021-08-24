import React, { useState } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import CommonTable from "../../common/commonTable";

export default function TableConfigCRUD({
  match,
  onDelete,
  onEdit,
  setIdXoa,
  propsDefineObject,
  data,
  onChangePage,
}) {
  const renderConfig = (data, record, itemTable) => {
    return (
      <a onClick={() => alert(record[itemTable.dataField])}>
        {record[itemTable.dataField]}
      </a>
    );
  };
  const renderTable = () => {
    const columns = [];

    propsDefineObject.defineObjectFormProps.map((itemTable, indexTable) => {
      if (itemTable.isShow) {
        if (itemTable.render) {
          columns.unshift({
            title: itemTable.text,
            width: itemTable.width,
            dataIndex: itemTable.dataField,
            render: (data, record) =>
              itemTable.render && renderConfig(data, record, itemTable),
          });
        } else {
          columns.unshift({
            title: itemTable.text,
            width: itemTable.width,
            dataIndex: itemTable.dataField,
          });
        }
      }
    });
    return columns;
  };

  return (
    <div>
      <CommonTable
        columns={renderTable()}
        dataSource={data}
        setIdXoa={setIdXoa}
        onChangePage={onChangePage}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}
