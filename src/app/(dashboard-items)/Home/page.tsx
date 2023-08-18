// 'use server'
import HomePage from './Home';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';



export default async function AuthHomePage() {
  const supabase = createServerComponentClient({ cookies });
  const { 
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/SignUp');
  }

  return (
    <div className="ActivePage-Container">
      <HomePage />
    </div>
  )
}