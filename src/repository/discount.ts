import { Discount } from '../models';

export function getData(): Discount[] {
  /* FIXME: This data should returned from database; Which mean discount configuration table */
  return [
    { unique: 1, off: 0 },
    { unique: 2, off: .05 }, // * 5% off
    { unique: 3, off: .1 }, // * 10% off
    { unique: 4, off: .2 }, // * 20% off
    { unique: 5, off: .25 } // * 25% off
  ]
}