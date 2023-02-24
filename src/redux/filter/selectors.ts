import { RootState } from '../store';

export const selectorSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;
