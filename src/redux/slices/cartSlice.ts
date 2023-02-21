import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TCartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
  delete_all?: boolean; //Опциональное свойство
};

interface ICartSliceState {
  totalPrice: number;
  sumCount: number;
  items: TCartItem[];
}

const initialState: ICartSliceState = {
  totalPrice: 0,
  sumCount: 0,
  items: [],
};

const mathState = (state: ICartSliceState) => {
  //Вычисления общей стоимости пицц в корзине
  state.totalPrice = state.items.reduce((sum, obj) => {
    return sum + Number(obj.price * obj.count);
  }, 0);

  //Вычисления общего количества пицц в корзине
  state.sumCount = state.items.reduce((sum, obj) => {
    return sum + obj.count;
  }, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //Добавление пиццы в корзину
    addItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      //Вызов пересчета общей суммы и количества
      mathState(state);
    },
    //Удаление пиццы из корзины
    removeItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      //Если данной пиццы меньше 1 или в экшене есть свойство "delete_al: true", то удаляем объект пиццы из массива items
      if (findItem && (findItem.count <= 1 || action.payload.delete_all)) {
        state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      } else if (findItem && findItem.count > 1) {
        findItem.count--;
      }
      //Вызов пересчета общей суммы и количества
      mathState(state);
    },
    //Удаление всех пицц из корзины
    clearCart(state) {
      state.items = [];
      //Вызов пересчета общей суммы и количества
      mathState(state);
    },
  },
});

export const selectorCart = (state: RootState) => state.cart;
export const selectorCartById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
