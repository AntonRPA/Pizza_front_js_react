import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';
import { PizzaSliceState, Status, TPizza } from './types';

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

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
