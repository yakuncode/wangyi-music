import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import './menu.scss'

const items: MenuProps['items'] = [
  {
    label: '发现音乐',
    key: 'foundMusic'
  },
  {
    label: '我的音乐',
    key: 'myMusic'
  },
  {
    label: '关注',
    key: 'concern'
  },
  {
    label: '商城',
    key: 'shoppingCenter'
  },
  {
    label: '音乐人',
    key: 'musicians'
  }
];

const App: React.FC = () => {
  const [current, setCurrent] = useState('foundMusic');

  const navigate = useNavigate()
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    navigate(e.key)
  };

  return <Menu className="menu" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default App;
