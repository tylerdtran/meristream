import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SignIn from "./SignIn";

export default async function AuthSignIn() {
  const supabase = createServerComponentClient({ cookies });
  const { 
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/Home');
  }

  return (
    <div className="SignIn-Container">
      <SignIn />
    </div>
  )

}