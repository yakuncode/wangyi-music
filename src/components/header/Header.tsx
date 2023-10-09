import React from 'react'
import './header.scss'
import Menu from '../Menu/Menu'


const imgUrl = require('../../assset/images/60046e0febcd40008b409f2146c44531.jpeg')
export function Header() {
	return (
		<div className="header">
			{/*logo展示区域*/}
			<div className="header-logo">
				<img className="header-logo-img" src={imgUrl} width="60" height="60" alt="图片加载失败"/>
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
			{/*我的信息*/}
			<div>我的信息</div>
		</div>
	)
}
