'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { useUser } from '../../utils/supabase-provider';
import { useSupabase } from '../../utils/supabase-provider';
import '../(components)/NavBar/NavBar.scss'
 
export default function SignOutButton() {
    const router = useRouter();
    const { supabase } = useSupabase();
    return (
    <button
        className="sign-out-button"
        onClick={async () => {
        await supabase.auth.signOut();
        router.push('/SignIn');
        }}
    >
        SIGN OUT 
    </button>
    );
}
