'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { XCircle } from 'lucide-react'

export default function CheckoutFailurePage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-center text-2xl">
              Payment Failed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p>
              We're sorry, but there was an issue processing your payment. This
              could be due to insufficient funds, incorrect card details, or a
              temporary issue with the payment processor.
            </p>
            <p>
              Please try again with a different payment method or contact your bank
              for more information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={() => router.push('/checkout')}
                variant="outline"
              >
                Try Again
              </Button>
              <Button onClick={() => router.push('/cart')}>
                Back to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 