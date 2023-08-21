import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
    console.log('get stripe was succcessful')
    if(!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    }
    else {
        console.log('stripe API KEY ERROR')
    }

    return stripePromise;
}