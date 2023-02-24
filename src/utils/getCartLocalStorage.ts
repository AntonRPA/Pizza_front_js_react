import { TCartItem } from '../redux/cart/types';

export const getCartLocalStorage = (): TCartItem[] => {
  const data = window.localStorage.getItem('cart');
  return data ? JSON.parse(data) : [];
};
