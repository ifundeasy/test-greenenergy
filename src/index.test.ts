import { CartModel, calculator, changeProducts, changeRules } from './index';

describe('Discount calculator', () => {
  it('Best price should to be equal 51.2 (An example result from Taylor)', function () {
    // * We set product price as your example
    changeProducts([
      { id: 1, label: 'Red Tshirt', price: 8 },
      { id: 2, label: 'Green Tshirt', price: 8 },
      { id: 3, label: 'Blue Tshirt', price: 8 },
      { id: 4, label: 'Brown Tshirt', price: 8 },
      { id: 5, label: 'Pink Tshirt', price: 8 }
    ]);
    
    // * Also we need to discount rule as example
    changeRules([
      { qty: 1, off: 0 },
      { qty: 2, off: 5 },
      { qty: 3, off: 10 },
      { qty: 4, off: 20 },
      { qty: 5, off: 25 }
    ])

    const userCarts: CartModel[] = [
      { productId: 1, qty: 2 },
      { productId: 2, qty: 2 },
      { productId: 3, qty: 2 },
      { productId: 4, qty: 1 },
      { productId: 5, qty: 1 }
    ]
    const bestPrice = calculator(userCarts);

    console.debug(JSON.stringify(bestPrice, null, 2))

    expect(bestPrice.price).toEqual(51.2)
    expect([
      bestPrice.discountsets[0].off,
      bestPrice.discountsets[1].off
    ]).toEqual([20, 20])
  });
});
