import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Radio,
  DatePicker,
  TreeSelect,
} from "antd";
export default function InputFormDefault({
  label,
  name,
  width,
  onChange,
  rules,
  hidden,
  validate,
  textValidate,
  addonBefore,
  style,
  password,
  showLabel,
}) {
  return (
    <Form.Item
      label={showLabel ? label : ""}
      name={name}
      hidden={hidden}
      width={width}
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
      {password ? (
        <Input.Password
          placeholder={label}
          style={style}
          addonBefore={addonBefore}
          onChange={onChange}
        />
      ) : (
        <Input
          placeholder={label}
          style={style}
          addonBefore={addonBefore}
          onChange={onChange}
        />
      )}
    </Form.Item>
  );
}
