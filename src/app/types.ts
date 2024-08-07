export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  nuts: boolean;
  image: string;
  vegeterian: boolean;
  spiciness: number;
  categoryId: number;
}

export interface TCrat {
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    price: number;
    nuts: boolean;
    image: string;
    vegeterian: boolean;
    spiciness: number;
    categoryId: number;
  };
}

export interface TData {
  quantity: number;
  price: number;
  productId: number;
}
