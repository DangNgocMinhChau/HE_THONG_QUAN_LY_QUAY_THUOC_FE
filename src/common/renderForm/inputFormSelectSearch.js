import React, { useEffect } from "react";
import { Form, Select, TreeSelect } from "antd";
import * as actionCRUD from "./../../actions/configCRUDAutoAction/actCRUD";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
const { Option } = Select;

export default function InputFormSelectSearch({
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
  options,
  showLabel,
  allowClear,
  restField,
  fieldKey,
  api,
  ...props
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (api) {
      dispatch(actionCRUD.actFindSelectRequest(api, name));
    }
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
  if (name === "file") {
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
      fieldKey={fieldKey}
      style={style}
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
      <Select
        allowClear
        showSearch
        style={{ width: "100%" }}
        onChange={onChange}
        placeholder={label}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        multiple
        allowClear
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {dataOption &&
          Array.isArray(dataOption) &&
          dataOption.length > 0 &&
          dataOption.map((item, index) => {
            return (
              <Option key={index} value={item.value}>
                {item.ten}
              </Option>
            );
          })}
      </Select>
    </Form.Item>
  );
}
