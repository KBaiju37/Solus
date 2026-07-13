export interface Product {
  id: string;
  name: string;
  category: 'Oversized' | 'Compression' | 'Performance' | 'Running';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  hoverImage: string;
  description: string;
  sizes: string[];
  colors: { name: string; class: string }[];
  details: string[];
  materials: string;
  shipping: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponUsed?: string;
  shippingDetails: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
  };
}

export interface GAEventLog {
  id: string;
  timestamp: string;
  eventName: string;
  payload: any;
}
