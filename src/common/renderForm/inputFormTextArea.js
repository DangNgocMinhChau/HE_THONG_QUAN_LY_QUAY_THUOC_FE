import React from "react";
import { Form } from "antd";
import { Textarea } from "react-rainbow-components";
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
      <Textarea
        id="example-textarea-1"
        rows={4}
        placeholder={label}
        style={{ width: "100%" }}
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      />
    </Form.Item>
  );
}
