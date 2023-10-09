import React, { useState } from 'react';
import { Space } from 'antd';
import { WeiboOutlined, WechatOutlined } from '@ant-design/icons';
import './SignInForm.scss';
import { PhoneSignIn } from './PhoneSignInForm/PhoneSignIn';
import { EmailSignIn } from './EmailSignInForm/EmailSignIn';

export function SignInForm() {
	const [isPhoneSignIn, setPhoneSignIn] = useState(true);

	// 切换登录方式
	const emailSignIn = () => {
		setPhoneSignIn(!isPhoneSignIn);
	};

	// 渲染登录组件
	const renderSignInForm = () => {
		return isPhoneSignIn ? <PhoneSignIn /> : <EmailSignIn />;
	};

	return (
		<div>
			{/* 登录注册组件 */}
			{renderSignInForm()}

			{/* 其他登录方式 */}
			<div className="other">
				<div className="title">其它登录:</div>
				<div className="other-login">
          <span>
            <Space size={6}>
              <WeiboOutlined className="weibo" />
              <WechatOutlined className="wechat" />
            </Space>
          </span>
					<span className="email-login" onClick={emailSignIn}>
            {isPhoneSignIn ? '邮箱登录' : '手机号登录'}
          </span>
				</div>
			</div>
		</div>
	);
}
