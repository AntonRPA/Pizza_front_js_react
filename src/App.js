import './scss/app.scss';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

export const indexUrl = '/';

function App() {
  return (
    <Routes>
      <Route path={indexUrl} element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
