import { Form, Input, Button } from "antd"
import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


const FormItem = Form.Item;

export const LoginForm: any = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        props.onSubmit(values)
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <FormItem
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                />
            </FormItem>
            <FormItem
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                />
            </FormItem>
            <Form.Item>
                <div style={{ textAlign: "center", margin: "0 auto" }}>
                    <Button style={{ width: "100%" }} type="primary" htmlType="submit" >
                        login
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )

}
