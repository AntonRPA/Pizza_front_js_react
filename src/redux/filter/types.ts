export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}

export type TSort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface IFilterSliceState {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sort: TSort;
}
