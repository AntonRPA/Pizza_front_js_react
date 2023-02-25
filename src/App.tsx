import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loadable from 'react-loadable';
import './scss/app.scss';

import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
// const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart')); // Динамический импорт
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza')); // Динамический импорт
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')); // Динамический импорт
const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Загрузка корзины...</div>,
});

export const indexUrl = '/Pizza_front_js_react/';

function App() {
  return (
    <Routes>
      <Route path={indexUrl} element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path={indexUrl + 'cart'} element={<Cart />} />
        <Route
          path={indexUrl + 'pizza/:id'}
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
