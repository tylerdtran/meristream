
'use client';
import React from 'react';
import Link from 'next/link';
import Stripe from 'stripe';
import { useState } from 'react';
import { getStripe } from '@/utils/stripe-client'
import { Database } from '../../../../database.types';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { postData } from '@/utils/helpers';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  session: Session | null;
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

export const revalidate = 0;

type BillingInterval = 'lifetime' | 'year' | 'month';

export default async function Pricing({
    session,
    user,
    products,
    subscription
  }: Props) {
    
    const router = useRouter();
    const [billingInternval, setBillingInterval] = useState<BillingInterval>('month');
    const [pricceIdLoading, setPriceIdLoading] = useState<string>();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });
    const { data: prices } = await stripe.prices.list();
    // const supabase = createServerComponentClient({ cookies })
    // const user = await supabase.auth.getUser();
    // infinite stripe request error
    // const { user, isLoading } = useUser();



    // console.log(user)
    console.log('no success')

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

    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id);

        if(!user) {
            return router.push('/SignIn');
        }
        if (subscription) {
            return router.push('/Account-Profile');
        }
        const handleCheckout = async (price: Price) => {
            setPriceIdLoading(price.id);
            if (!user) {
              return router.push('/SignIn');
            }
            if (subscription) {
              return router.push('/Account-Profile');
            }
            try {
              const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price }
              });
        
              const stripe = await getStripe();
              stripe?.redirectToCheckout({ sessionId });
            } catch (error) {
              return alert((error as Error)?.message);
            } finally {
              setPriceIdLoading(undefined);
            }
          };

    }


    // if there are zero products present 
    if (!products.length)
    return (
      <section className="bg-black">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{' '}
            <a
              className="text-pink-500 underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
      </section>
    );

    return (
        <div className="w-full max-w-3xl mx-auto py-16 flex justify-around justify-center align-items gap-4 ">
            {plans.map((plan) => (
                <div key={plan.id} className="w-80 h-40 rounded shadow px-6 py-4 flex flex-col justify-center align-items
                divide-y rounded-lg hover:bg-zinc-200">
                        <div className="flex justify-center items-center flex-col">
                            <h2>{plan.name}</h2>
                            <p> 
                                ${plan.price! / 100} / {plan.interval}
                            </p>
                        </div>
                        <button className="block w-full py-2 mt-12 text-sm font-semibold text-center text-white border-4 rounded-md hover:bg-zinc-900">
                            <Link href={`/PricingPlans/${plan.id}`}>Subscribe</Link>
                        </button>
                        {/* {!isLoading && (
                            <div>
                            {showSubscribeButton && (
                                <button onClick={() => processSubscription(plan.id)}>
                                Subscribe
                                </button>
                            )}
                            {showManageSubscriptionButton && (
                                <button>Manage Subscription</button>
                            )}
                            </div>
                        )} */}

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
// export { Pricing };


    // const handleSubscribe = async (priceId: string) => {
    //     const { sessionId } = await fetch('/api/create-checkout-session', {
    //         body: JSON.stringify({ priceId }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         method: 'POST',
    //     }).then((res) => res.json());

    //     // const { error } = await stripe.redirectToCheckout({
    //     //     sessionId: sessionId,
    //     // });

    //     // if (error) {
    //     //     console.error(error);
    //     // }
    //     // Find a way to redirect to stripe checkout
    //     // redirect to stripe checkout 
    // }
