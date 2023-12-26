import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import { message } from 'antd';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { getQrCodeKey, getQrCode, checkQrCodeState, getAccountInfo } from '@/api/user';
import { LOGIN } from '@/store/modules/user';
import './QrcodeSignIn.scss';

const QrCodeSignIn = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const [qrCodeUrl, setQrCodeUrl] = useState('');

	// 清除定时器并重新启动
	const resetInterval = (key: string) => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
		startInterval(key);
	};
	// 设置定时器，每3秒调用一次 checkQrcodeKey 方法
	const startInterval = (key: string) => {
		timerRef.current = setInterval(async () => {
			await checkQrcodeKey(key);
		}, 3000);
	};

	// 初始化时获取二维码信息和启动定时器
	const fetchQrcodeKey = async () => {
		try {
			const { code, data } = await getQrCodeKey({
				time: new Date().getTime(),
			}) as { code: number; data: any };

			if (code === 200) {
				// 获取二维码信息成功
				await fetchQrcode({key: data.unikey});
			} else {
				// 获取二维码信息失败，显示错误信息
				message.error('请求错误!');
			}
		} catch (error) {
			console.error('fetchQrcodeKey Error:', error);
		}
	};

	// 获取二维码接口
	const fetchQrcode = async ({ key }: { key: string }) => {
		try {
			const { code, data } = await getQrCode({
				time: new Date().getTime(),
				key,
			}) as { code: number; data: any };

			if (code === 200) {
				// 获取二维码成功，设置二维码 URL 并启动定时器
				setQrCodeUrl(data.qrurl);
				resetInterval(key);
			} else {
				// 获取二维码失败，显示错误信息
				message.error('请求错误!');
			}
		} catch (error) {
			console.error('fetchQrcode Error:', error);
		}
	};

	// 检查二维码状态接口
	const checkQrcodeKey = async (key: string) => {
		try {
			const { code } = await checkQrCodeState({
				time: new Date().getTime(),
				key,
			}) as { code: number; data: any };

			if (code) {
				// 处理不同的二维码状态
				await handleStatusChange(code, key);
			} else {
				// 请求错误，显示错误信息
				message.error('请求错误!');
			}
		} catch (error) {
			console.error('checkQrcodeKey Error:', error);
		}
	};

	// 处理不同的二维码状态
	const handleStatusChange = async (newStatus: number, key: string) => {
		if (newStatus === 800) {
			// 如果状态为800，重新获取二维码信息和二维码
			resetInterval(key);
			await fetchQrcodeKey();
		} else if (newStatus === 803) {
			// 如果状态为803，获取用户信息，登录并跳转到 '/foundMusic'
			await fetchUserInfo();
		}
		// 其他状态不进行处理
	};

	// 获取用户信息接口
	const fetchUserInfo = async () => {
		try {
			const data: any = await getAccountInfo({});
			if (data.code === 200) {
				// 登录成功，将用户信息存储到 Redux 中，并跳转到 '/foundMusic'
				dispatch(LOGIN(data));
				navigateToFoundMusic();
			} else {
				// 登录失败，显示错误信息
				message.error('登录失败');
			}
		} catch (error) {
			console.error('fetchUserInfo Error:', error);
		}
	};

	// 跳转到 '/foundMusic' 路由
	const navigateToFoundMusic = () => {
		navigate('/foundMusic');
	};

	// 组件初始化时获取二维码信息
	useEffect(() => {
		fetchQrcodeKey();
		// 组件卸载时清除定时器
		return () => {
			console.log('组件销毁了')
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div className="qrcode-wrapper">
			<div className="qrcode-title">扫码登录（8.0.0及以上版本支持）</div>
			<div className="qrcode">
				{/* 显示二维码 */}
				<QRCode value={qrCodeUrl} size={140} />
			</div>
			<div className="qrcode-tip">
				<div>打开 网易云音乐APP</div>
				<div>点击“我-左上角扫一扫”登录</div>
			</div>
		</div>
	);
};

export default QrCodeSignIn;
