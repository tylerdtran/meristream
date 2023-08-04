'use client';
import { useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/navigation';


// Signing the User out 
const SignOut = () => {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut()
      router.push('/')
    };
    logout();
  }, [])

  return <p>Logging Out</p>
};

export default SignOut;