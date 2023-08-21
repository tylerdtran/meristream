/*This API Handles the creation of a stripe customer */
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '../../../utils/supabase';

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {

    const {searchParams} = new URL(request.url);
    const param = searchParams.get('API_ROUTE_SECRET');

    if (param !== process.env.API_ROUTE_SECRET) {
        return NextResponse.json('Unauthorized', {status: 500});
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, 
        { apiVersion: '2022-11-15' })

    const requestData = await request.json()
    console.log(requestData)

    try {
        const customer = await stripe.customers.create({
            email: requestData.record.email,
        });
        
        const { error } = await supabase
        .from("user_profiles")
        .update({
            stripe_customer_id: customer.id,
        })
        .eq("id", requestData.record.id);
        if (!error) {
            console.log('success')
        }
        console.log(error)

        return NextResponse.json({ message: `stripe customer created: ${customer.id}` });
    } catch (error) {
        console.error('Error occurred:', error);
        return NextResponse.json({ message: `Error occurred: ${error}`});
    }
}

