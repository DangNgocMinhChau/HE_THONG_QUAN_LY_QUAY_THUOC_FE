import React from "react";
import { Form, Input, Button, Checkbox, notification, message } from "antd";
import { RenderInput } from "../../common/renderForm/inputForm";

function FormResetPass({ onResetPass }) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onResetPass}
    >
      <RenderInput
        label="Tài khoản"
        name="user"
        validate={true}
        showLabel={true}
      />

      <RenderInput label="CMND" name="cmnd" validate={true} showLabel={true} />

      <RenderInput
        label="Số điện thoại"
        name="soDienThoai"
        addonBefore="+84"
        validate={true}
        showLabel={true}
      />

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Lấy lại mật khẩu
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormResetPass;
