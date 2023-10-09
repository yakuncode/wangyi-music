import React from 'react'
import './Layout.scss'
import { Header } from '@/components/header/Header'
import { Outlet } from 'react-router-dom'; // 使用 Outlet 组件来渲染子路由

export default function Layout() {
	return (
		<div className="home">
			<Header />
			<Outlet />
		</div>
	)
}
