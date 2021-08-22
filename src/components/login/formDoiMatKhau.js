import React from "react";
import { Form, Button } from "antd";
import InputFormDefault from "../../common/renderForm/inputFormDefault";

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
      <InputFormDefault
        showLabel={true}
        label="Tài khoản"
        name="user"
        validate={true}
      />

      <InputFormDefault
        showLabel={true}
        label="Mật khẩu cũ"
        name="matKhauCu"
        validate={true}
        password={true}
      />

      <InputFormDefault
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
