import React from "react";
import { Form, Select, Radio, DatePicker, TreeSelect } from "antd";

export default function InputFormDatepiker({
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
}) {
  const dateFormat = "DD/MM/YYYY";

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
      <DatePicker
        placeholder={label}
        onChange={onChange}
        style={{ width: "100%" }}
        format={dateFormat}
      />
    </Form.Item>
  );
}
