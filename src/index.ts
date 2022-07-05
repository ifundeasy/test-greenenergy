import Data from './data.json';
import * as comb from './combination';

export interface RuleModel { qty: number, off: number }
export interface ProductModel { id: number; label?: string; price: number; }
export interface CartModel { productId: number, qty?: number, price?: number, _id?: number }
export interface BestDealModel { price: number, discountset: number[], cartsetIds: number[][] }

const Rules = Data.rules as RuleModel[];
const Products = Data.products as ProductModel[];

/**
 * [HELPER] get rule by qty
 * @param qty: rule flag
 * @returns RuleModel
 */
function getRuleByQty (qty: number): RuleModel {
  return Rules.filter(rule => rule.qty == qty)[0];
}

/**
 * [HELPER] get product by id
 * @param id: product id 
 * @returns ProductModel
 */
function getProductById (id: number): ProductModel {
  return Products.filter(product => product.id == id)[0];
}

/**
 * [HELPER] get cart by id
 * @param id: cart id 
 * @returns CartModel
 */
function getCartById (id: number, carts: CartModel[]): CartModel {
  return carts.filter(cart => cart._id == id)[0];
}

/**
 * [HELPER] get extended carts
 * @param carts: user carts / basket
 * @returns CartModel
 */
function getDetailedCart (carts: CartModel[]): CartModel[] {
  const result: CartModel[] = [];
  carts.forEach(cart => {
    if (cart.qty) {
      const price = getProductById(cart.productId).price;
      for (let i = 0; i < cart.qty; i++) {
        result.push({
          ...cart,
          qty: 1,
          price,
          _id: result.length + 1
        })
      }
    }
  })

  return result;
}

/**
 * [HELPER] Sum numbers in array
 * @param list: numbers array
 * @returns number
 */
function sum(list: number[]): number {
  return list.reduce((partial, el) => (partial + el));
}

/**
 * Getting Highest discount the user's can get
 * @param carts User carts
 * @returns List of supersets
 */
export function calculator(carts: CartModel[]): BestDealModel {
  const Carts = getDetailedCart(carts);
  const qtyRules: number[] = Rules.map(rule => rule.qty);

  const transIds = Carts.map(cart => cart._id) as number[];
  const groupsets = comb.getGroupsets(qtyRules, Carts.length);
  
  let _price = 0;
  let _discountset = 0;
  let _cartsetIds: number[][] = [];
  
  groupsets.forEach((groupset, i) => {
    const combinationsets = comb.getMultiCombinations(groupset, transIds);

    combinationsets.forEach((combinations, j) => {
      const total: number = sum(
        combinations.map((combination) => {
          const offValue = getRuleByQty(combination.length).off
          const transId2Price = combination.map(transId => getCartById(transId, Carts).price) as number[];
          const subtotal = sum(transId2Price);
          
          return subtotal - (subtotal * offValue / 100)
        })
      );
      
      if (!_price) {
        _price = total;
        _discountset = i
        _cartsetIds = combinationsets[j];
        console.debug('[INFO] Found cheap:', { _price, _discountset: groupsets[_discountset], _cartsetIds })
      } else if (total < _price) {
        _price = total;
        _discountset = i
        _cartsetIds = combinationsets[j];
        console.debug('[INFO] Found cheap:', { _price, _discountset: groupsets[_discountset], _cartsetIds })
      }
    })
  })

  return {
    price: _price,
    discountset: groupsets[_discountset],
    cartsetIds: _cartsetIds
  }
}