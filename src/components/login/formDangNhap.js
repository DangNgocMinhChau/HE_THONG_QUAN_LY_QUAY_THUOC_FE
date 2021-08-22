import React from "react";
import { Form, Button, Checkbox } from "antd";
import InputFormDefault from "../../common/renderForm/inputFormDefault";

function FormDangNhap({ onFinish, resetMatKhau }) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <InputFormDefault
          label="Tài khoản"
          name="user"
          validate={true}
          showLabel={true}
        />

        <InputFormDefault
          label="Mật khẩu"
          name="password"
          validate={true}
          showLabel={true}
          password={true}
        />

        <div className="row px-3">
          <a onClick={() => resetMatKhau()} className="ml-auto mb-0 text-sm">
            Quên mật khẩu?
          </a>
        </div>
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Lưu mật khẩu</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default FormDangNhap;
