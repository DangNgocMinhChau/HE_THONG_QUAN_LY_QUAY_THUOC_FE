import React, { useEffect } from "react";
import { Form, Select } from "antd";
import * as actionCRUD from "./../../actions/configCRUDAutoAction/actCRUD";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

export default function InputFormSelect({
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
  api,
  options,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (api) {
      dispatch(actionCRUD.actFindSelectRequest(api, name));
    }
  }, []);

  const { tag, quyen } = useSelector(
    (state) => ({
      tag: state.danhmuc.select.list.tag,
      quyen: state.danhmuc.select.list.quyen,
    }),
    shallowEqual
  );
  let optionsApi = [];
  if (name === "tag") {
    optionsApi = tag;
  }
  if (name === "quyen") {
    optionsApi = quyen;
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
      <Select allowClear={allowClear} placeholder={label}>
        {dataOption &&
          Array.isArray(dataOption) &&
          dataOption.length > 0 &&
          dataOption.map((item, index) => {
            return <Select.Option value={item.value}>{item.ten}</Select.Option>;
          })}
      </Select>
    </Form.Item>
  );
}
