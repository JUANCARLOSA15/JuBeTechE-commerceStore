export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  customizable: boolean;
  stock: number;
  active: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  customization?: {
    text?: string;
    design?: string;
  };
  printJob?: PrintJob;
}

export interface PrintJob {
  fileUrl: string;
  fileName: string;
  printType: 'color' | 'blackAndWhite';
  paperType: string;
  size: string;
  copies: number;
  price: number;
}

export interface User {
  name: string;
  email: string;
  address?: string;
  phone?: string;
}