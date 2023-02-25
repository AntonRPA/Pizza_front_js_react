import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilterSliceState, SortPropertyEnum, TSort } from './types';

const initialState: IFilterSliceState = {
  categoryId: 0,
  searchValue: '',
  currentPage: 1,
  sort: {
    name: 'популярности (убыв.)',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActivCategory(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<TSort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilter(state, action: PayloadAction<IFilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.searchValue = action.payload.searchValue;
    },
  },
});

export const { setActivCategory, setSort, setCurrentPage, setFilter, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
