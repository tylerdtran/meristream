// import HomePage from './(dashboard-items)/Home/page';
import SignUp from './SignUp/SignUp';
  import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
  import { cookies } from 'next/headers';
  import { redirect } from 'next/navigation';
// import HomePage from './Home';

async function Home() {




  const supabase = createServerComponentClient({ cookies });
  const { 
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/Home');
  }
  return (
    <SignUp />
  );
}

export default Home;
