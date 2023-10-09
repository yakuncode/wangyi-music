import React from 'react'
import { Button, Form, Input } from 'antd';
import './EmailSignIn.scss'
const onFinish = (values: any) => {
	console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
	console.log('Failed:', errorInfo);
};

type FieldType = {
	phone?: string;
	password?: string;
};

export function EmailSignIn() {
	return (
		<div>
			<div className="phone-title">密码登录</div>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item<FieldType>
					label=""
					name="phone"
					rules={[{ required: true, message: '请输入手机号!' }]}
				>
					<Input
						className="phone"
						size="large"
						placeholder="请输入邮箱 / 手机号登录"
					/>
				</Form.Item>

				<Form.Item<FieldType>
					label=""
					name="password"
					rules={[{ required: true, message: '请输入正确的密码!' }]}
				>
					<Input
						className="password"
						size="large"
						placeholder="请输入密码"
					/>
				</Form.Item>
			</Form>
			<div className="utils-btn">
				<Button size="large" htmlType="submit" className="sign-up">
					注册
				</Button>
				<Button size="large" type="primary" htmlType="submit" className="sign-in">
					登录
				</Button>
			</div>
		</div>
	)
}
