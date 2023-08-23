// 'use server'
import HomePage from './Home';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
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

  if (!session) {
    redirect('/SignIn');
  }

  return (
    <div className="ActivePage-Container">
      <HomePage
      // session={session}
      // user={session?.user}
      // products={products}
      // subscription={subscription}          
       />
    </div>
  )
}