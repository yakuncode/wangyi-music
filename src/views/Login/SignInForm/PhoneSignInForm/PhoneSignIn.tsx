import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import './PhoneSignIn.scss';
import { getCat, signIn } from '../../../../api';

// 定义表单字段类型
type FieldType = {
	phone?: string;
	captcha?: string;
};

// 定义 PhoneSignIn 组件
export function PhoneSignIn() {
	const navigate = useNavigate();
	const [form] = Form.useForm();

	const onFinish = async (values: any) => {
		try {
			// 发起登录请求
			const response = await signIn({ ...values });
			const { code } = response as { code: number };

			if (code === 200) {
				// 登录成功，跳转到 foundMusic 页面
				navigate('/foundMusic');
			}
		} catch (error) {
			console.error('登录失败:', error);
		}
	};

	// 点击获取验证码按钮
	const getCaptcha = async () => {
		try {
			const phone = form.getFieldValue('phone');

			// 发起获取验证码请求
			const response = await getCat({ phone });
			const { code, data } = response as { code: number; data: boolean };

			if (code === 200) {
				// 获取验证码成功，设置状态和启动倒计时
				data && setCaptcha(false);
				startHourglass();
			} else {
				// 获取验证码失败，显示错误消息
				message.error('获取失败');
			}
		} catch (error) {
			console.error('获取验证码失败:', error);
		}
	};

	// 验证码倒计时相关
	let timer: NodeJS.Timeout | null = null;
	const [isCaptcha, setCaptcha] = useState(true);
	const [time, setTime] = useState(60);

	const startHourglass = () => {
		if (timer) {
			clearInterval(timer);
		}

		timer = setInterval(() => {
			setTime((val) => {
				if (val > 0) {
					return val - 1;
				} else {
					timer && clearInterval(timer);
					timer = null;
					setTime(60);
					setCaptcha(true);
					return val;
				}
			});
		}, 1000);
	};

	// 表单验证成功后的提交操作
	const submit = async () => {
		try {
			const values = await form.validateFields();
			await onFinish(values);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<div className="phone-title">验证码登录 / 注册</div>
			<Form
				form={form}
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				autoComplete="off"
			>
				<Form.Item<FieldType>
					label=""
					name="phone"
					rules={[{ required: true, message: '请输入手机号!' }]}
				>
					<Input className="phone" size="large" placeholder="请输入手机号" />
				</Form.Item>

				<Form.Item<FieldType>
					label=""
					name="captcha"
					rules={[{ required: true, message: '请输入正确的验证码!' }]}
				>
					<Input
						className="captcha"
						size="large"
						placeholder="请输入验证码"
						suffix={
							<div className="captcha">
								{isCaptcha ? (
									<div className="captcha-action" onClick={getCaptcha}>
										获取验证码
									</div>
								) : (
									<div className="captcha-hourglass">{time}秒后可以重新获取</div>
								)}
							</div>
						}
					/>
				</Form.Item>
			</Form>
			<Button size="large" type="primary" className="submit" onClick={submit}>
				登录 / 注册
			</Button>
		</div>
	);
}
