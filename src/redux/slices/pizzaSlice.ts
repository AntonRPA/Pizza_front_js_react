import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export type TSearchPizzas = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk<TPizza[], TSearchPizzas>(
  'pizza/fetchPizzasStatus',
  async ({ sortBy, order, category, search, currentPage }) => {
    const { data } = await axios.get<TPizza[]>(
      `https://63dcc767367aa5a7a401c039.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${category}${search}`,
    );

    return data;
  },
);

type TPizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number;
};

// enum - можно использовать в TypeScript. Объект нельзяы
export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  NOT_FOUND = 'not_found',
}

interface PizzaSliceState {
  items: TPizza[];
  status: Status; //loading | success | error
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      if (action.payload.length > 0) {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      } else {
        state.status = Status.NOT_FOUND;
      }
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      console.log(state, 'Ошибка при получение items');
      state.status = Status.ERROR;
      state.items = [];
    });
  },

  //Некорректно работает с TypeScript
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     console.log('Идет отправка');
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     console.log(state, 'Пиццы получены');

  //     if (action.payload.length > 0) {
  //       state.items = action.payload;
  //       state.status = 'success';
  //     } else {
  //       state.status = 'not_found';
  //     }
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     console.log(state, 'Ошибка при получение items');
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
