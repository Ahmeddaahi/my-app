'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { StripePaymentForm } from './stripe-payment-form'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

type PaymentMethod = 'stripe' | 'ebirr' | 'esahal' | 'telebirr'

interface PaymentFormProps {
  onSubmit: (data: any) => void
}

export function PaymentForm({ onSubmit }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe')
  const [mobileNumber, setMobileNumber] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (paymentMethod === 'stripe') {
      // Stripe payment will be handled by the StripePaymentForm component
      return
    }

    // Handle mobile money payment
    const paymentData = {
      method: paymentMethod,
      mobileNumber,
      amount: 0, // This should be passed from the parent component
      reference: `ORDER-${Date.now()}`,
    }

    onSubmit(paymentData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RadioGroup
        value={paymentMethod}
        onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="stripe" id="stripe" />
          <Label htmlFor="stripe">Credit/Debit Card (Stripe)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="ebirr" id="ebirr" />
          <Label htmlFor="ebirr">eBirr</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="esahal" id="esahal" />
          <Label htmlFor="esahal">eSahal</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="telebirr" id="telebirr" />
          <Label htmlFor="telebirr">Telebirr</Label>
        </div>
      </RadioGroup>

      {paymentMethod === 'stripe' ? (
        <Elements stripe={stripePromise}>
          <StripePaymentForm onSubmit={onSubmit} />
        </Elements>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Mobile Money Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                type="tel"
                placeholder="+251 9XX XXX XXX"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Payment Instructions</Label>
              <p className="text-sm text-muted-foreground">
                Please send the payment to the following number:
              </p>
              <p className="text-sm font-medium">251995817222</p>
              <p className="text-sm font-medium">Name: Ahmed Bashir Ahmed</p>
            </div>
            <Button type="submit" className="w-full">
              Continue to Review
            </Button>
          </CardContent>
        </Card>
      )}
    </form>
  )
} 