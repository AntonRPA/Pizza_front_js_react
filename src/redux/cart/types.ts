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

export interface ICartSliceState {
  totalPrice: number;
  sumCount: number;
  items: TCartItem[];
}
