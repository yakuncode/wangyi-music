import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './route'

//渲染菜单函数
// function renderRoutes(routes: any[]) {
//   return (
//
//   );
// }

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} {...route}>
            {route.children && route.children.map((childRoute, childIndex) => (
              <Route key={childIndex} {...childRoute} />
            ))}
          </Route>
        ))}
      </Routes>
    </Router>
  );
};
export default AppRouter;
