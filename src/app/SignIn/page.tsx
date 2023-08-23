import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SignIn from "./SignIn";
import signin from '@/images/signin.png';

export default async function AuthSignIn() {
  const supabase = createServerComponentClient({ cookies });
  const { 
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/Home');
  }

  return (
    <div className="SignIn-Container" style={{ backgroundImage: `url(${signin})`}}>
      <SignIn />
    </div>
  )

}