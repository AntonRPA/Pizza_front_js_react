import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности (убыв.)',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActivCategory(state, action) {
      console.log(action);
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      console.log(action);
      state.sort = action.payload;
    },
  },
});

export const { setActivCategory, setSort } = filterSlice.actions;
export default filterSlice.reducer;
