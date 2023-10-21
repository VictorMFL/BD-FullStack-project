export interface Product {
  id: string;
  title: string;
  discount?: number;
  quantity: number;
  category: string;
  catalog?: boolean;
  price: number;
  imageUrl: string;
}
