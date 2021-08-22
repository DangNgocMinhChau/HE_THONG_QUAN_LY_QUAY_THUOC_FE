import React, { useEffect } from "react";
import { Form, Radio } from "antd";
import * as actionCRUD from "./../../actions/configCRUDAutoAction/actCRUD";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
export default function InputFormRadio({
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
  value,
  showLabel,
  options,
  api,
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
      <Radio.Group>
        {dataOption &&
          Array.isArray(dataOption) &&
          dataOption.length > 0 &&
          dataOption.map((item, index) => {
            return (
              <Radio key={index} value={item.value}>
                {item.ten}
              </Radio>
            );
          })}
      </Radio.Group>
    </Form.Item>
  );
}
