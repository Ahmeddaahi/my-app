import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { OrderList } from '@/components/dashboard/order-list';

export default async function OrdersPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          View and track your order history
        </p>
      </div>
      <OrderList userId={session.user.id} />
    </div>
  );
} 