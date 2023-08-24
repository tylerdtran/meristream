import Pricing from '@/app/(dashboard-items)/Pricing/Pricing';
import {
    getSession,
    getSubscription,
    getActiveProductsWithPrices
  } from '@/utils/supabase-server';


export default async function PricingPage() {
    const [session, products, subscription ] = await Promise.all([
        getSession(),
        getActiveProductsWithPrices(),
        getSubscription(),
    ]);
    
    return (
        <div className="h-screen">
            <Pricing 
                session={session}
                user={session?.user}
                products={products}
                subscription={subscription}            
            />
        </div>
    )
}