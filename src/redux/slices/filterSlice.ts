import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}

type TSort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface IFilterSliceState {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sort: TSort;
}

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
    },
  },
});

export const selectorSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

export const { setActivCategory, setSort, setCurrentPage, setFilter, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
