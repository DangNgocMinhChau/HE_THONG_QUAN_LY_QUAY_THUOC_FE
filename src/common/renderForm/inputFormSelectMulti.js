import React, { useEffect } from "react";
import { Form, TreeSelect } from "antd";
import * as actionCRUD from "./../../actions/configCRUDAutoAction/actCRUD";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
const { TreeNode } = TreeSelect;

export default function InputFormSelectMulti({
  label,
  name,
  width,
  onChange,
  rules,
  hidden,
  validate,
  textValidate,
  hasFeedback,
  validateStatus,
  style,
  showLabel,
  allowClear,
  value,
  api,
  options,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionCRUD.actFindSelectRequest(api, name));
  }, []);

  const { tag, quyen, file } = useSelector(
    (state) => ({
      tag: state.danhmuc.select.list.tag,
      quyen: state.danhmuc.select.list.quyen,
      file: state.danhmuc.select.list.file,
    }),
    shallowEqual
  );
  let optionsApi = [];
  if (name === "tag") {
    optionsApi = tag;
  }
  if (name === "quyen" || name === "quyenId") {
    optionsApi = quyen;
  }

  if (name == "file") {
    optionsApi = file;
  }
  let dataOption = options ? options : optionsApi;

  return (
    <Form.Item
      label={showLabel ? label : ""}
      name={name}
      hidden={hidden}
      width={width}
      hasFeedback={hasFeedback}
      validateStatus={validateStatus}
      rules={
        validate && [
          {
            required: validate,
            message:
              textValidate !== null &&
              textValidate !== undefined &&
              textValidate !== ""
                ? textValidate
                : `Bạn chưa nhập   ${label} !`,
          },
        ]
      }
    >
      <TreeSelect
        showSearch
        style={{ width: "100%" }}
        placeholder={label}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder="Please select"
        allowClear
        multiple
        treeDefaultExpandAll
        onChange={onChange}
      >
        {dataOption &&
          Array.isArray(dataOption) &&
          dataOption.length > 0 &&
          dataOption.map((item, index) => {
            return <TreeNode value={item.value} title={item.ten} />;
          })}
      </TreeSelect>
    </Form.Item>
  );
}
