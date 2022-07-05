import { calculator, CartModel } from './index';

describe('Discount calculator', () => {
  it('It should not to be equal 0.4', function () {
    const carts: CartModel[] = [
      { productId: 1, qty: 2 },
      { productId: 2, qty: 2 },
      { productId: 3, qty: 2 },
      { productId: 4, qty: 1 },
      { productId: 5, qty: 1 }
    ]
    const result = calculator(carts);

    expect(result.price).toEqual(51.2)
    expect(result.discountset).toEqual([4, 4])
  });
});
