import React from "react";
import { Form, Button } from "antd";
import InputFormDefault from "../../common/renderForm/inputFormDefault";

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
      <InputFormDefault
        label="Tài khoản"
        name="user"
        validate={true}
        showLabel={true}
      />

      <InputFormDefault
        label="CMND"
        name="cmnd"
        validate={true}
        showLabel={true}
      />

      <InputFormDefault
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
