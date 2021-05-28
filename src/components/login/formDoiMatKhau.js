import React from "react";
import { Form, Input, Button, Checkbox, notification, message } from "antd";
import { RenderInput } from "../../common/renderForm/inputForm";

function FormDoiMatKhau({ onChangePass }) {
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
      onFinish={onChangePass}
    >
      <RenderInput
        showLabel={true}
        label="Tài khoản"
        name="user"
        validate={true}
      />

      <RenderInput
        showLabel={true}
        label="Mật khẩu cũ"
        name="matKhauCu"
        validate={true}
        password={true}
      />

      <RenderInput
        showLabel={true}
        label="Mật khẩu mới"
        name="matKhauMoi"
        validate={true}
        password={true}
      />

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Đổi mật khẩu
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormDoiMatKhau;
