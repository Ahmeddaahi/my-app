'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/context/cart-context'

interface OrderSummaryProps {
  shippingData?: any
}

export function OrderSummary({ shippingData }: OrderSummaryProps) {
  const { state } = useCart()
  const cartItems = state?.items || []

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = 50 // This should be calculated based on shipping method
  const tax = subtotal * 0.15 // 15% tax rate
  const total = subtotal + shippingCost + tax

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (15%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {shippingData && (
          <>
            <Separator />
            <div className="space-y-2">
              <h3 className="font-semibold">Shipping Address</h3>
              <p>
                {shippingData.firstName} {shippingData.lastName}
              </p>
              <p>{shippingData.address}</p>
              <p>
                {shippingData.city}, {shippingData.state} {shippingData.zipCode}
              </p>
              <p>{shippingData.country}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
} 