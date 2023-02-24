export type TSearchPizzas = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export type TPizza = {
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

export interface PizzaSliceState {
  items: TPizza[];
  status: Status; //loading | success | error
}
