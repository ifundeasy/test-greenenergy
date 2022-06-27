import { Product } from '../models';

export function getData(): Product[] {
  /* FIXME: This data should returned from database; Which mean master product table */
  return [
    { id: 1, label: 'Red Tshirt', price: 100 },
    { id: 2, label: 'Green Tshirt', price: 110 },
    { id: 3, label: 'Blue Tshirt', price: 120 },
    { id: 4, label: 'Magenta Tshirt', price: 130 },
    { id: 5, label: 'Black Tshirt', price: 140 }
  ]
}
