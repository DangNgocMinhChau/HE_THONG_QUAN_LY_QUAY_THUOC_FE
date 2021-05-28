import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    Redirect
  } from "react-router-dom";

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
};
  
function Login({location}) {
    const onFinish = (values) => {
        if (values.username === 'admin' && values.password === 'admin' ) {
            localStorage.setItem('user', JSON.stringify({
                username: values.username,
                password: values.password
            }));
        }
    };
    
    var logginUser = localStorage.getItem('user');
    if (logginUser !== null) {
        return (
            <Redirect to={{
                pathname: '/quanlynhahang',
                state: {
                    from : location
                }
            }}/>
        )
    }
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
}

export default Login;