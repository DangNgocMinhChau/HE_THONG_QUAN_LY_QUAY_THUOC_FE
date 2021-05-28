import React from "react";
import { Form, Button } from "antd";
import { RenderInput } from "../../common/renderForm/inputForm";

function FormYeuCauMoKhoaTaiKhoan({ onYeuCauMoKhoa }) {
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
      onFinish={onYeuCauMoKhoa}
    >
      <RenderInput
        showLabel={true}
        label="Tài khoản"
        name="user"
        validate={true}
      />

      <RenderInput showLabel={true} label="CMND" name="cmnd" validate={true} />

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Xác nhận
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormYeuCauMoKhoaTaiKhoan;
