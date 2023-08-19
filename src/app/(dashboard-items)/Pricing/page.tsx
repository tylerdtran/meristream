import Pricing from '@/app/(dashboard-items)/Pricing/Pricing';



export default async function PricingPage() {
    
    return (
        <div className="h-screen">
            <h1 className="flex justify-center align-items">Pricing Plans</h1>
            <Pricing />
        </div>
    )
}