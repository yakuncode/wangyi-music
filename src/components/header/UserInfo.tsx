import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LOGIN_OUT } from '@/store/modules/user'
import './UserInfo.scss'
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useNavigate }  from 'react-router'

export function UserInfo() {
	const userInfo = useSelector((state: any) => state.user.userInfo.profile)
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
		'1': (): void => {
			dispatch(LOGIN_OUT())
			navigate('/login')
		}
	}
	const onClick: MenuProps['onClick'] = ({ key }) => {
		handleUSerClick[key]()
	};
	return (
		<div className="userinfo">
			<Dropdown menu={{ items, onClick }}>
				<a onClick={(e) => e.preventDefault()}>
					<Space>
						<span className="nickname">{userInfo.nickname}</span>
					</Space>
				</a>
			</Dropdown>
			<img className="avatar" src={userInfo.avatarUrl} alt=''/>
		</div>
	)
}
