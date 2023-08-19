// import HomePage from './(dashboard-items)/Home/page';
import SignUp from './SignUp/SignUp';
  import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
  import { cookies } from 'next/headers';
  import { redirect } from 'next/navigation';
// import HomePage from './Home';

async function Home() {

  // might use this implementation for the second half of retrieving a cookie.
  const supabase = createServerComponentClient({ cookies });
  // session is retrived from the server component that stored the user authentication session/token in a cookie through supabase
  // user can then call data: session supabase.auth.getSession() to get the session data from the cookie directly. 
  const { 
    data: { session }
  } = await supabase.auth.getSession();

  console.log(session)  
  
  if (session) {
    redirect('/Home');
  }
  return (
    <SignUp />
  );
}

export default Home;
