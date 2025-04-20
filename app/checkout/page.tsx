'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ShippingForm } from '@/components/checkout/shipping-form'
import { PaymentForm } from '@/components/checkout/payment-form'
import { OrderSummary } from '@/components/checkout/order-summary'
import { ArrowLeft } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { useOrder } from '@/context/order-context'

type CheckoutStep = 'shipping' | 'payment' | 'review'

export default function CheckoutPage() {
  const router = useRouter()
  const { state: cartState, clearCart } = useCart()
  const { addOrder } = useOrder()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping')
  const [shippingData, setShippingData] = useState<any>(null)

  const handleShippingSubmit = (data: any) => {
    setShippingData(data)
    setCurrentStep('payment')
  }

  const handlePaymentSubmit = async (data: any) => {
    // Handle payment processing here
    setCurrentStep('review')
  }

  const handleOrderComplete = async () => {
    try {
      // Calculate totals
      const subtotal = cartState.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const shippingCost = 50 // This should be calculated based on shipping method
      const tax = subtotal * 0.15 // 15% tax rate
      const total = subtotal + shippingCost + tax

      // Create order
      addOrder({
        items: cartState.items,
        total,
        shippingAddress: shippingData
      })

      // Clear cart and redirect
      clearCart()
      router.push('/checkout/success')
    } catch (error) {
      console.error('Error completing order:', error)
      router.push('/checkout/failure')
    }
  }

  const handleBack = () => {
    if (currentStep === 'payment') {
      setCurrentStep('shipping')
    } else if (currentStep === 'review') {
      setCurrentStep('payment')
    } else {
      router.push('/cart')
    }
  }

  const getProgressValue = () => {
    switch (currentStep) {
      case 'shipping':
        return 33
      case 'payment':
        return 66
      case 'review':
        return 100
      default:
        return 0
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>
        
        <Progress value={getProgressValue()} className="mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentStep === 'shipping' && 'Shipping Information'}
                  {currentStep === 'payment' && 'Payment Method'}
                  {currentStep === 'review' && 'Order Review'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentStep === 'shipping' && (
                  <ShippingForm onSubmit={handleShippingSubmit} />
                )}
                {currentStep === 'payment' && (
                  <PaymentForm onSubmit={handlePaymentSubmit} />
                )}
                {currentStep === 'review' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                    <OrderSummary shippingData={shippingData} />
                    <Button 
                      className="w-full mt-4"
                      onClick={handleOrderComplete}
                    >
                      Place Order
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <OrderSummary shippingData={shippingData} />
          </div>
        </div>
      </div>
    </div>
  )
} 