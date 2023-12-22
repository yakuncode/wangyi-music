import React from 'react'
import './header.scss'
import Menu from '../Menu/Menu'
import { UserInfo } from '@/components/header/UserInfo'

export function Header() {
	return (
		<div className="header">
			<div className="top-bar">
				{/*logo展示区域*/}
				<div className="header-logo">
					我的音乐
				</div>
				{/*菜单切换部分*/}
				<Menu />
				{/*下载按钮*/}
				<div>按钮</div>
				{/*查询部分*/}
				<div>查询</div>
				{/*创作者中心*/}
				<div>创作者中心</div>
			</div>
			{/*我的信息*/}
			<UserInfo />
		</div>
	)
}
