import React from 'react';
import Link from 'next/link';
import Stripe from 'stripe';

export const revalidate = 0;

const Pricing = async () => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });
    const { data: prices } = await stripe.prices.list();

    try {
        const plans = await Promise.all(
            prices.map(async (price) => {
                const product = await stripe.products.retrieve(price.product as string);
                return {
                    id: price.id,
                    name: product.name,
                    price: price.unit_amount,
                    interval: price.recurring?.interval,
                    currency: price.currency,
                };
        })
    );

    const handleSubscribe = async (priceId: string) => {
        const { sessionId } = await fetch('/api/create-checkout-session', {
            body: JSON.stringify({ priceId }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }).then((res) => res.json());

        // const { error } = await stripe.redirectToCheckout({
        //     sessionId: sessionId,
        // });

        // if (error) {
        //     console.error(error);
        // }
        // Find a way to redirect to stripe checkout
        // redirect to stripe checkout 
    }

    return (
        <div className="w-full max-w-3xl mx-auto py-16 flex justify-around justify-center align-items gap-4 ">
            {plans.map((plan) => (
                <div>
                    <div key={plan.id} className="w-80 h-40 rounded shadow px-6 py-4 flex flex-col justify-center align-items
                    divide-y rounded-lg hover:bg-zinc-200">
                        {/* <Link href={`/PricingPlans/${plan.id}`}> */}
                            <div className="flex justify-center items-center flex-col">
                                <h2>{plan.name}</h2>
                                <p> 
                                    ${plan.price! / 100} / {plan.interval}
                                </p>
                            </div>
                            <button onClick={() => handleSubscribe(plan.id)} className="block w-full py-2 mt-12 text-sm font-semibold text-center text-white border-4 rounded-md hover:bg-zinc-900">
                                <Link href={`/PricingPlans/${plan.id}`}>Subscribe</Link>
                                {/* Take user to respective pricing checkout portal */}
                            </button>
                        {/* </Link> */}
                    </div>
                </div>
            ))}
        </div>
    );

    }
    catch (error) {
        // Log the error to the console for debugging purposes
        console.error('Error fetching data:', error);
        // You can also display an error message to the user if something goes wrong
        return <p>Error fetching data. Please try again later.</p>;
    }
}
export { Pricing };

export default function PricingPlans() {
    return (
        <div className="h-screen">
            <h1 className="flex justify-center align-items">Pricing Plans</h1>
            <Pricing />
        </div>

    );
}



