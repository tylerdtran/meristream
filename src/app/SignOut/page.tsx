'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { useUser } from '../../utils/supabase-provider';
import { useSupabase } from '../../utils/supabase-provider';

export default function SignOut() {
    const { supabase } = useSupabase();

    const router = useRouter();
    
    const logout = async () => {
        await supabase.auth.signOut()
        router.push('/SignIn')
        router.refresh()
      };


    useEffect (() => {

        logout();

    })

    return (
        <div className="w-screen h-screen">
            <h1>Sign Out</h1>
        </div>
    )
}