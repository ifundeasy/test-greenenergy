import { Cart } from '../../src/models';
import { findBestDeal } from '../../src/services/calculator';
import logger from '../../src/utils/loggger';

describe('Discount calculator', () => {
  beforeAll(function() {
    logger.info('start');
  });
  afterAll(function() {
    logger.info('done');
  });

  it('It should not to be equal 0.4', function () {
    const carts: Cart[] = [
      { productId: 1, qty: 2 },
      { productId: 2, qty: 2 },
      { productId: 3, qty: 2 },
      { productId: 4, qty: 1 },
      { productId: 5, qty: 1 }
    ]
    const result = findBestDeal(carts);
    logger.info(result)
    expect(result.maximum).toEqual(.4)
  });
});
