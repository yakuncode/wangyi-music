import React from 'react'
import Login from '../views/Login/Login';
import Layout from '../views/Layout/Layout';
import { NotFound } from '../views/404/NotFound';
import { Navigate } from 'react-router-dom';
import { FoundMusic } from '../views/FoundMusic/FoundMusic';
import { MyMusic } from '../views/MyMisic/MyMusic';
import { Concern } from '../views/Concern/Concern';
import { ShoppingCenter } from '../views/ShoppingCenter/ShoppingCenter';
import { Musicians } from '../views/Musicians/Musicians';

const routes = [
  { path: '/', element: <Navigate to="/login" /> },
  { path: '/login', element: <Login /> },
  { path: '/404', element: <NotFound /> },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/foundMusic', element: <FoundMusic /> }, // 发现音乐
      { path: '/myMusic', element: <MyMusic /> }, // 我的音乐
      { path: '/concern', element: <Concern /> }, // 关注
      { path: '/shoppingCenter', element: <ShoppingCenter /> }, // 商城
      { path: '/musicians', element: <Musicians /> }, // 音乐人
    ],
  },
];

export default routes
