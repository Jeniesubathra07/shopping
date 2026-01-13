export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  stock?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id?: string;
  items: CartItem[];
  total: number;
  shippingDetails: ShippingDetails;
  date: Date;
}

export interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  zip: string;
  email: string;
}
