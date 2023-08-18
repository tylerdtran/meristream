'use server'
import SignUp from './SignUp';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';



export default async function AuthSignUp() {
  const supabase = createServerComponentClient({ cookies });
  const { 
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/Home');
  }

  return (
    <div className="SignUp-Container">
      <SignUp />
    </div>
  )
}