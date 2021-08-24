import React from "react";
import { Form, Select, Radio, DatePicker, TreeSelect } from "antd";
import { Input } from "react-rainbow-components";
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
  const inputStyles = {
    width: "100%",
  };
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
      {/* <DatePicker
        placeholder={label}
        onChange={onChange}
        style={{ width: "100%" }}
        format={dateFormat}
      /> */}
      <Input
        className="rainbow-p-around_medium"
        style={inputStyles}
        // bottomHelpText="between 2019-01-01 & 2021-01-01"
        type="date"
        max="2021-01-01"
        min="2019-01-01"
      />
    </Form.Item>
  );
}
