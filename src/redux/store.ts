import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slice';
import cart from './cart/slice';
import pizza from './pizza/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { filter, cart, pizza },
});

// Типизация State
export type RootState = ReturnType<typeof store.getState>;

// Типизация dispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
