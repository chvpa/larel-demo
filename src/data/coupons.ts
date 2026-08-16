export type Coupon = {
  code: string
  type: 'percent' | 'shipping'
  value: number // percent (0-100) for 'percent', ignored for 'shipping'
  minSubtotal?: number
  active: boolean
  uses: number
  description: string
}

export const seedCoupons: Coupon[] = [
  { code: 'LAREL10', type: 'percent', value: 10, active: true, uses: 148, description: '10% de descuento en toda la tienda' },
  { code: 'OUTLET20', type: 'percent', value: 20, minSubtotal: 400000, active: true, uses: 62, description: '20% OFF en compras desde Gs. 400.000' },
  { code: 'ENVIOGRATIS', type: 'shipping', value: 0, active: true, uses: 231, description: 'Envío gratis sin mínimo de compra' },
  { code: 'FANFEST15', type: 'percent', value: 15, active: false, uses: 89, description: '15% OFF — campaña Fan Fest (finalizada)' },
]

export const SHIPPING_COST = 25000
export const FREE_SHIPPING_MIN = 500000
