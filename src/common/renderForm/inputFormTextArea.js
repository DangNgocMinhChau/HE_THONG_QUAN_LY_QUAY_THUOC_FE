import React from "react";
import { Form, Input } from "antd";

export default function InputFormTextArea({
  name,
  label,
  width,
  onChange,
  rules,
  hidden,
  validate,
  textValidate,
  addonBefore,
  style,
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
      <Input.TextArea
        rows={4}
        cols={120}
        onChange={onChange}
        placeholder={label}
        style={{ width: "100%" }}
      />
    </Form.Item>
  );
}
