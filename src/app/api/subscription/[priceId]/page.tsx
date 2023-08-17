// import { supabase } from "@/utils/supabase";
// import { NextResponse, NextRequest } from "next/server";
// // import cookie from 'cookie';
// import Stripe from 'stripe'

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