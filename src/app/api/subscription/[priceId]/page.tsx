// import { supabase } from "@/utils/supabase";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// 'use client'
import { supabase } from "@/utils/supabase";
import { NextResponse, NextRequest } from "next/server";
// // import cookie from 'cookie';
import { cookies } from 'next/headers'
import Stripe from 'stripe'
// import { useUser } from "@/utils/Context";
// import { use } from "react";

// const handler = async (req: NextRequest, res: Response) => {
//     // const { user } = await supabase.auth.api.getUserbyCookie(req)

//     // if(!user) {
//     //     return NextResponse.json('Unauthorized', { status: 401 })
//     // }

//     // const token = cookie.parse(req.headers.cookie)["sb:token"];

//     // const { data: { stripe_customer }} = await supabase.from('user_profiles').select('stripe_customer_id').eq('id', user.id).single()
    
//     // const lineItems = [{
//     //     price: priceId,
//     //     quantity: 1,
//     // }]

//     // const session = await stripe.checkout.sessions.create({
//     //     customer: stripe_customer, 
//     //     mode: 'subscription',
//     //     payment_method_types: ['card'],
//     //     lineItems: lineItems,
//     //     success_url: `${process.env.NEXT_PUBLIC_URL}/payments/success`,
//     //     cancel_url: `${process.env.NEXT_PUBLIC_URL}/payments/cancelled`,
//     // })

//     // NextResponse.json({
//     //     ...user,
//     //     stripe_customer,
//     // })
        
//     // NextResponse.json({
//     //     id: session.id,
//     // })
// }
// export default handler; 

export async function handler(request: Request, res: Response) {

    const { data: user }= await supabase.auth.getUser()
    console.log(user)

    async function getUserByCookie() {
        const { data: { session } } = await supabase.auth.getSession()
        console.log(session)

        return session?.access_token;
    }
    const cookie = cookies()

    const userSession = getUserByCookie()

    if(!userSession) {
        return NextResponse.json('Unauthorized', { status: 401 })
    }
    const cookie_auth_token = cookie.get("sb:token")

    console.log(cookie_auth_token)

    const { data: stripe_customer } = await supabase.from('user_profiles').select('stripe_customer_id').eq('id', user.user?.id).single()


    // NextResponse.json({
    //     ...user,
    //     stripe_customer,
    // })

    // NextResponse.json({
    //     id: session.id,
    // })
}