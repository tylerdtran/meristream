import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '../../utils/supabase';

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
    // if(req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    //     return res.status(401).send('Unauthorized');
    // }
    // if(!req.query || req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    //     return res.status(401).send('Unauthorized');
    // }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, 
        { apiVersion: '2022-11-15' })

    const requestData = await request.json()

    // console.log(requestData)
    console.log(requestData.email)
    
    // return NextResponse.json(requestData);

    try {
        const customer = await stripe.customers.create({
        email: requestData.email,
        });
        console.log(customer.id)
            await supabase
            .from("user_profiles")
            .update({
                stripe_customer_id: customer.id,
            })
            .eq("id", requestData.id);

        return NextResponse.json({ message: `stripe customer created: ${customer.id}` });
    } catch (error) {
        console.error('Error occurred:', error);
        return NextResponse.json({ message: `Error occurred: ${error}`});
    }

    return NextResponse.json({ message: 'Hello world!' });
    
}

// export default handler;


    // const customer = await stripe.customers.create({
    //     email: 'tylerdtran@g.ucla.edu'
    // }) 
     
//     try {
//     await supabase.from('user_profiles').update({
//         stripe_customer_id: customer.id 
//     }).eq('id', '93b27f75-eba9-4816-b582-903aa05b18a7')
// } catch (error) {
//     console.log(error)
// }

    // const customer = await stripe.customers.create({
    //     email: request.body.record.email,
    //   });
    
    // await supabase
    //     .from("users_profiles")
    //     .update({
    //       stripe_customer_id: customer.id,
    //     })
    //     .eq("id", request.body.record.id);