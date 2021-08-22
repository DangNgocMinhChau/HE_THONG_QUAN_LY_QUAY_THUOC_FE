import React from "react";
import { Form, Input, InputNumber, Select } from "antd";
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
  inputNumber = false,
  fieldKey,
}) {
  const renderInput = () => {
    if (inputNumber) {
      return (
        <InputNumber
          placeholder={label}
          style={{ width: "100%" }}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          formatter={(value) =>
            ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
        />
      );
    } else {
      return password ? (
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
      );
    }
  };
  return (
    <Form.Item
      label={showLabel ? label : ""}
      name={name}
      hidden={hidden}
      width={width}
      fieldKey={fieldKey}
      onChange={onChange}
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
      {renderInput()}
    </Form.Item>
  );
}
