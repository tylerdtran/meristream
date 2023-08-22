
// 'use client';
// import React from 'react';
// import Link from 'next/link';
// import Stripe from 'stripe';
// import { useState } from 'react';
// import { getStripe } from '@/utils/stripe-client'
// import { Database } from '../../../../database.types';
// import { Session, User } from '@supabase/supabase-js';
// import { useRouter } from 'next/navigation';
// import { postData } from '@/utils/helpers';

// type Subscription = Database['public']['Tables']['subscriptions']['Row'];
// type Product = Database['public']['Tables']['products']['Row'];
// type Price = Database['public']['Tables']['prices']['Row'];
// interface ProductWithPrices extends Product {
//   prices: Price[];
// }
// interface PriceWithProduct extends Price {
//   products: Product | null;
// }
// interface SubscriptionWithProduct extends Subscription {
//   prices: PriceWithProduct | null;
// }

// interface Props {
//   session: Session | null;
//   user: User | null | undefined;
//   products: ProductWithPrices[];
//   subscription: SubscriptionWithProduct | null;
// }

// export const revalidate = 0;

// type BillingInterval = 'lifetime' | 'year' | 'month';

// export default async function Pricing({
//     session,
//     user,
//     products,
//     subscription
//   }: Props) {
    
//     const router = useRouter();
//     const [billingInternval, setBillingInterval] = useState<BillingInterval>('month');
//     const [pricceIdLoading, setPriceIdLoading] = useState<string>();

//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });
//     const { data: prices } = await stripe.prices.list();
//     // const supabase = createServerComponentClient({ cookies })
//     // const user = await supabase.auth.getUser();
//     // infinite stripe request error
//     // const { user, isLoading } = useUser();



//     // console.log(user)
//     console.log('no success')


//         const plans = await Promise.all(
//             prices.map(async (price) => {
//                 const product = await stripe.products.retrieve(price.product as string);
//                 return {
//                     id: price.id,
//                     name: product.name,
//                     price: price.unit_amount,
//                     interval: price.recurring?.interval,
//                     currency: price.currency,
//                 };
//         })
//     );

//     const handleCheckout = async (price: Price) => {
//         setPriceIdLoading(price.id);

//         if(!user) {
//             return router.push('/SignIn');
//         }
//         if (subscription) {
//             return router.push('/Account-Profile');
//         }
//         const handleCheckout = async (price: Price) => {
//             setPriceIdLoading(price.id);
//             if (!user) {
//               return router.push('/SignIn');
//             }
//             if (subscription) {
//               return router.push('/Account-Profile');
//             }
//             try {
//               const { sessionId } = await postData({
//                 url: '/api/create-checkout-session',
//                 data: { price }
//               });
        
//               const stripe = await getStripe();
//               stripe?.redirectToCheckout({ sessionId });
//             } catch (error) {
//               return alert((error as Error)?.message);
//             } finally {
//               setPriceIdLoading(undefined);
//             }
//           };

//     }


//     // if there are zero products present 
//     if (!products.length)
//     return (
//       <section className="bg-black">
//         <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
//           <div className="sm:flex sm:flex-col sm:align-center"></div>
//           <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
//             No subscription pricing plans found. Create them in your{' '}
//             <a
//               className="text-pink-500 underline"
//               href="https://dashboard.stripe.com/products"
//               rel="noopener noreferrer"
//               target="_blank"
//             >
//               Stripe Dashboard
//             </a>
//             .
//           </p>
//         </div>
//       </section>
//     );

//     return (
//         <div className="w-full max-w-3xl mx-auto py-16 flex justify-around justify-center align-items gap-4 ">
//             {plans.map((plan) => (
//                 <div key={plan.id} className="w-80 h-40 rounded shadow px-6 py-4 flex flex-col justify-center align-items
//                 divide-y rounded-lg hover:bg-zinc-200">
//                         <div className="flex justify-center items-center flex-col">
//                             <h2>{plan.name}</h2>
//                             <p> 
//                                 ${plan.price! / 100} / {plan.interval}
//                             </p>
//                         </div>
//                         <button className="block w-full py-2 mt-12 text-sm font-semibold text-center text-white border-4 rounded-md hover:bg-zinc-900">
//                             <Link href={`/PricingPlans/${plan.id}`}>Subscribe</Link>
//                         </button>
//                         {/* {!isLoading && (
//                             <div>
//                             {showSubscribeButton && (
//                                 <button onClick={() => processSubscription(plan.id)}>
//                                 Subscribe
//                                 </button>
//                             )}
//                             {showManageSubscriptionButton && (
//                                 <button>Manage Subscription</button>
//                             )}
//                             </div>
//                         )} */}

//                 </div>
//             ))}
//         </div>
//     );

//     if (products.length === 1)
// return (
//   <section className="bg-black">
//     <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
//       <div className="sm:flex sm:flex-col sm:align-center">
//         <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
//           Pricing Plans
//         </h1>
//         <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
//           Start building for free, then add a site plan to go live. Account
//           plans unlock additional features.
//         </p>
//         <div className="relative flex self-center mt-12 border rounded-lg bg-zinc-900 border-zinc-800">
//           <div className="border border-pink-500 border-opacity-50 divide-y rounded-lg shadow-sm bg-zinc-900 divide-zinc-600">
//             <div className="p-6 py-2 m-1 text-2xl font-medium text-white rounded-md shadow-sm border-zinc-800 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8">
//               {products[0].name}
//             </div>
//           </div>
//         </div>
//         <div className="mt-6 space-y-4 sm:mt-12 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
//           {products[0].prices?.map((price) => {
//             const priceString =
//               price.unit_amount &&
//               new Intl.NumberFormat('en-US', {
//                 style: 'currency',
//                 currency: price.currency!,
//                 minimumFractionDigits: 0
//               }).format(price.unit_amount / 100);

//             return (
//               <div
//                 key={price.interval}
//                 className="divide-y rounded-lg shadow-sm divide-zinc-600 bg-zinc-900"
//               >
//                 <div className="p-6">
//                   <p>
//                     <span className="text-5xl font-extrabold white">
//                       {priceString}
//                     </span>
//                     <span className="text-base font-medium text-zinc-100">
//                       /{price.interval}
//                     </span>
//                   </p>
//                   <p className="mt-4 text-zinc-300">{price.description}</p>
//                   <Button
//                     variant="slim"
//                     type="button"
//                     disabled={false}
//                     loading={priceIdLoading === price.id}
//                     onClick={() => handleCheckout(price)}
//                     className="block w-full py-2 mt-12 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900 "
//                   >
//                     {products[0].name ===
//                     subscription?.prices?.products?.name
//                       ? 'Manage'
//                       : 'Subscribe'}
//                   </Button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   </section>
// );

// return (
// <section className="bg-black">
//   <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
//     <div className="sm:flex sm:flex-col sm:align-center">
//       <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
//         Pricing Plans
//       </h1>
//       <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
//         Start building for free, then add a site plan to go live. Account
//         plans unlock additional features.
//       </p>
//       <div className="relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
//         {intervals.includes('month') && (
//           <button
//             onClick={() => setBillingInterval('month')}
//             type="button"
//             className={`${
//               billingInterval === 'month'
//                 ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
//                 : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
//             } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
//           >
//             Monthly billing
//           </button>
//         )}
//         {intervals.includes('year') && (
//           <button
//             onClick={() => setBillingInterval('year')}
//             type="button"
//             className={`${
//               billingInterval === 'year'
//                 ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
//                 : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
//             } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
//           >
//             Yearly billing
//           </button>
//         )}
//       </div>
//     </div>
//     <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
//       {products.map((product) => {
//         const price = product?.prices?.find(
//           (price) => price.interval === billingInterval
//         );
//         if (!price) return null;
//         const priceString = new Intl.NumberFormat('en-US', {
//           style: 'currency',
//           currency: price.currency!,
//           minimumFractionDigits: 0
//         }).format((price?.unit_amount || 0) / 100);
//         return (
//           <div
//             key={product.id}
//             className={cn(
//               'rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900',
//               {
//                 'border border-pink-500': subscription
//                   ? product.name === subscription?.prices?.products?.name
//                   : product.name === 'Freelancer'
//               }
//             )}
//           >
//             <div className="p-6">
//               <h2 className="text-2xl font-semibold leading-6 text-white">
//                 {product.name}
//               </h2>
//               <p className="mt-4 text-zinc-300">{product.description}</p>
//               <p className="mt-8">
//                 <span className="text-5xl font-extrabold white">
//                   {priceString}
//                 </span>
//                 <span className="text-base font-medium text-zinc-100">
//                   /{billingInterval}
//                 </span>
//               </p>
//               <button
//                 type="button"
//                 disabled={!session}
//                 loading={priceIdLoading === price.id}
//                 onClick={() => handleCheckout(price)}
//                 className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
//               >
//                 {subscription ? 'Manage' : 'Subscribe'}
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   </div>
// </section>
// );
// }


// }
'use client';

import Button from './button';
import { Database } from '../../../../database.types';
import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import { Session, User } from '@supabase/supabase-js';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

type BillingInterval = 'lifetime' | 'year' | 'month';

export default function Pricing({
  session,
  user,
  products,
  subscription
}: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push('/signin');
    }
    if (subscription) {
      return router.push('/account');
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

  if (products.length === 1)
    return (
      <section className="bg-black">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
              Pricing Plans
            </h1>
            <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
              Start building for free, then add a site plan to go live. Account
              plans unlock additional features.
            </p>
            <div className="relative flex self-center mt-12 border rounded-lg bg-zinc-900 border-zinc-800">
              <div className="border border-pink-500 border-opacity-50 divide-y rounded-lg shadow-sm bg-zinc-900 divide-zinc-600">
                <div className="p-6 py-2 m-1 text-2xl font-medium text-white rounded-md shadow-sm border-zinc-800 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8">
                  {products[0].name}
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4 sm:mt-12 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
              {products[0].prices?.map((price) => {
                const priceString =
                  price.unit_amount &&
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: price.currency!,
                    minimumFractionDigits: 0
                  }).format(price.unit_amount / 100);

                return (
                  <div
                    key={price.interval}
                    className="divide-y rounded-lg shadow-sm divide-zinc-600 bg-zinc-900"
                  >
                    <div className="p-6">
                      <p>
                        <span className="text-5xl font-extrabold white">
                          {priceString}
                        </span>
                        <span className="text-base font-medium text-zinc-100">
                          /{price.interval}
                        </span>
                      </p>
                      <p className="mt-4 text-zinc-300">{price.description}</p>
                      <Button
                        variant="slim"
                        type="button"
                        disabled={false}
                        loading={priceIdLoading === price.id}
                        onClick={() => handleCheckout(price)}
                        className="block w-full py-2 mt-12 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900 "
                      >
                        {products[0].name ===
                        subscription?.prices?.products?.name
                          ? 'Manage'
                          : 'Subscribe'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );

  return (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Pricing Plans
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            Start building for free, then add a site plan to go live. Account
            plans unlock additional features.
          </p>
          <div className="relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
            {intervals.includes('month') && (
              <button
                onClick={() => setBillingInterval('month')}
                type="button"
                className={`${
                  billingInterval === 'month'
                    ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                    : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
              >
                Monthly billing
              </button>
            )}
            {/* {intervals.includes('year') && (
              <button
                onClick={() => setBillingInterval('year')}
                type="button"
                className={`${
                  billingInterval === 'year'
                    ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                    : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
              >
                Yearly billing
              </button>
            )} */}
          </div>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency!,
              minimumFractionDigits: 0
            }).format((price?.unit_amount || 0) / 100);
            return (
              <div
                key={product.id}
                className={cn(
                  'rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900',
                  {
                    'border border-pink-500': subscription
                      ? product.name === subscription?.prices?.products?.name
                      : product.name === 'Freelancer'
                  }
                )}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold leading-6 text-white">
                    {product.name}
                  </h2>
                  <p className="mt-4 text-zinc-300">{product.description}</p>
                  <p className="mt-8">
                    <span className="text-5xl font-extrabold white">
                      {priceString}
                    </span>
                    <span className="text-base font-medium text-zinc-100">
                      /{billingInterval}
                    </span>
                  </p>
                  <Button
                    variant="slim"
                    type="button"
                    disabled={!session}
                    loading={priceIdLoading === price.id}
                    onClick={() => handleCheckout(price)}
                    className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                  >
                    {subscription ? 'Manage' : 'Subscribe'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
