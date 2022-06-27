// * This model will represent master product table
export interface Product {
  id: number;
  label?: string;
  price: number;
}

// * Used for user carts for in every single row
export interface Cart {
  productId: number,
  qty: number,
  price?: number,
  subtotal?: number
}