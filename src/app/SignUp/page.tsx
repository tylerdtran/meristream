// this is a server component intended to detect sessions
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
import SignUp from './SignUp'

export default async function AuthSignUp () {
    const supabase = createServerComponentClient({ cookies })
    const { data: { session} } = await supabase.auth.getSession()

    if (session) {
        redirect('/')
    }

    return (
        <SignUp />
    );
}