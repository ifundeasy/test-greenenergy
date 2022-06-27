// * This model will represent discount configuration table
export interface Discount {
  unique: number,
  off: number
}

// * This model is used for summerize discount rules (return value)
export interface DiscountRule {
  discounts: Discount[],
  min: Discount,
  max: Discount
}

// * This model is used by calcutor (return value)
export interface BestDeal {
  superset: number[][],
  maximum: number,
  indexes: number[]
}