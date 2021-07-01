import React from "react";
import { Form, Input, InputNumber, Select, Radio, DatePicker } from "antd";
const { Option } = Select;
const dateFormat = "DD/MM/YYYY";

export function RenderInput({
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

export function RenderInputNumber({
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
  formatter,
  fieldKey,
}) {
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
      <InputNumber
        placeholder={label}
        style={style}
        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        // defaultValue={""}
      />
    </Form.Item>
  );
}

export function RenderInputDatePicker({
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
        style={style}
        format={dateFormat}
      />
    </Form.Item>
  );
}

export function RenderInputRadio({
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
}) {
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
        {value &&
          Array.isArray(value) &&
          value.length > 0 &&
          value.map((item, index) => {
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

export function RenderInputSelect({
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
}) {
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
        {options &&
          Array.isArray(options) &&
          options.length > 0 &&
          options.map((item, index) => {
            return <Select.Option value={item.value}>{item.ten}</Select.Option>;
          })}
      </Select>
    </Form.Item>
  );
}

export function RenderInputSelectSearch({
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
  ...props
}) {
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
        onChange={onChange}
        placeholder={label}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options &&
          Array.isArray(options) &&
          options.length > 0 &&
          options.map((item, index) => {
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

export function RenderInputTextArea({
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
        style={style}
      />
    </Form.Item>
  );
}
