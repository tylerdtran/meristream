import Stripe from 'stripe';


const Pricing = ({ plans }) => {

    return (
        <div>
        {/* <h1>Pricing</h1>
        <pre>{JSON.stringify(prices, null, 2)}</pre> */}
            {plans.map((plan) => (
                <div key={plan.id}>
                    <h2>{plan.name}</h2>
                    <p>
                        ${plan.price / 100 } / {plan.interval}
                    </p>
                </div>
            ))}
        </div>
    );
}

export const getStaticProps = async () => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });
    const { data: prices } = await stripe.prices.list();

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

    const sortedPlans = plans.sort((a, b) => a.price - b.price);
        
    
    return {
      props: {
        plans: sortedPlans,
      },
    };
}

export default Pricing;