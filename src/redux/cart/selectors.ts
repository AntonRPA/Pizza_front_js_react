import { RootState } from '../store';

export const selectorCart = (state: RootState) => state.cart;
export const selectorCartById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
