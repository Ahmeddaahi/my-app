'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

export default function CheckoutSuccessPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-center text-2xl">
              Thank You for Your Order!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p>
              Your order has been successfully placed. We've sent a confirmation
              email with your order details.
            </p>
            <p>
              You can track your order status in your account dashboard or using
              the tracking number we'll send you once your order ships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={() => router.push('/')}
                variant="outline"
              >
                Continue Shopping
              </Button>
              <Button onClick={() => router.push('/orders')}>
                View Order Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 