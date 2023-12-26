import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LOGIN_OUT } from '@/store/modules/user'
import './UserInfo.scss'
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';
import { useNavigate }  from 'react-router'
import { loginOut } from '@/api'

export function UserInfo() {
	const userInfo = useSelector((state: any) => state.user.userInfo.profile || {})
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const items: MenuProps['items'] = [
		{
			label: '退出',
			key: '1',
		},
	];
	interface ActionObject {
		[key: string]: () => void;
	}

	const handleUSerClick: ActionObject = {
		'1': async (): Promise<void> => {
			await loginOuts()
		}
	}

	const loginOuts = async () => {
		const data = await loginOut({}) as { code: number }
		console.log(data, 'data')
		if (data.code === 200) {
			dispatch(LOGIN_OUT())
			navigate('/login')
		} else {
			message.error('请求出错!')
		}
	}

	const onClick: MenuProps['onClick'] = ({ key }) => {
		handleUSerClick[key]()
	};
	return (
		<div className="userinfo">
			<Dropdown menu={{ items, onClick }}>
				<span onClick={(e) => e.preventDefault()}>
					<Space>
						<span className="nickname">{userInfo.nickname}</span>
					</Space>
				</span>
			</Dropdown>
			<img className="avatar" src={userInfo.avatarUrl} alt=''/>
		</div>
	)
}
