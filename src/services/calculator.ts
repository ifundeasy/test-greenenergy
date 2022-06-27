import { getData as getProducts } from '../repository/products'
import { getData as getDiscountData } from '../repository/discount'
import { Discount, DiscountRule, Cart, BestDeal } from '../models'

/**
 * Get detailed discount rules
 * @returns Summarize discount
 */
function getDiscount(): DiscountRule {
  const discounts: Discount[] = getDiscountData()
    .map((el) => el)
    .sort((a, b) => a.off - b.off)
    .filter((discount) => discount.off != 0)

  return {
    discounts,
    min: discounts[0],
    max: discounts[discounts.length - 1]
  }
}

/**
 * Get detailed user carts
 * @param carts User carts
 * @returns Detailed user carts
 */
function getDetailCart(carts: Cart[]): Cart[] {
  return carts.map((c) => {
    c.price = getProducts().filter((product) => product.id == c.productId)[0].price
    c.subtotal = c.price * c.qty;
    return c
  })
}

/**
 * Main logic for finding discount combination
 * @param discounts Available discounts rule
 * @param totalQty Total quantity of user cart
 * @returns The supersets
 */
function getCombination(discounts: number[], totalQty: number): number[][] {
  const finish: number[][] = [];
  let working: number[][] = [[]];
  while (working.length) {
    const next_work: number[][] = []
    for (let i = 0; i < working.length; i++) {
      for (let j = 0; j < discounts.length; j++) {
        const subset: number[] = working[i].concat([discounts[j]])
        const sum: number = subset.reduce((a, b) => a + b, 0)
        if (sum <= totalQty) {
          (sum == totalQty ? finish : next_work).push(subset)
        }
      }
    }
    working = next_work
  }
  return finish
}

/**
 * Getting Highest discount that user can get
 * @param basket User carts
 * @returns List of supersets
 */
export function findBestDeal(basket: Cart[]): BestDeal {
  const { discounts } = getDiscount();
  const availableDiscounts: number[] = discounts.map(discount => discount.unique);

  const carts = getDetailCart(basket);
  const totalQty = carts.reduce((partial, el) => partial + el.qty, 0)

  const combi = getCombination(availableDiscounts, totalQty);
  const setMap: { [key: string]: boolean } = {}
  combi.forEach(e => {
    const sorted = e.sort()
    setMap[sorted.join(',')] = setMap[sorted.join(',')] || true
  })
  const superSets: number[][] = Object.keys(setMap).map(key => key.split(',').map(e => parseInt(e)));

  let maxAt = 0;
  const indexes: number[] = [];
  const discountSets: number[][] = superSets.map((sets, i) => {
    const discountSet = sets.map(set => discounts.filter(discount => discount.unique == set)[0].off);
    const sum = discountSet.reduce((partial, el) => (partial + el));
    if ((!maxAt) || (sum > maxAt)) {
      maxAt = sum
      indexes.push(i)
    }
    return discountSet
  })

  return {
    superset: discountSets,
    maximum: maxAt,
    indexes
  }
}