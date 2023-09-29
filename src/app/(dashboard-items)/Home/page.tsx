// 'use server'
import HomePage from './Home';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getUserDetails,
  getSession,
  getSubscription,
} from '@/utils/supabase-server';

export default async function AuthHomePage() {
  // const [session, products, subscription ] = await Promise.all([
  //     getSession(),
  //     getSubscription(),
  // ]);

  const supabase = createServerComponentClient({ cookies });
  const { 
    data: { session }
  } = await supabase.auth.getSession();

  // const [userDetails, subscription] = await Promise.all([
  //   getUserDetails(),
  //   getSubscription()
  // ]);


  if (!session) {
    redirect('/SignIn');
  }

  // if (!subscription) {
  //   redirect('/Pricing');
  // }

  return (
    <div className="ActivePage-Container h-full">
      <HomePage
      // session={session}
      // user={session?.user}
      // products={products}
      // subscription={subscription}          
       />
    </div>
  )
}