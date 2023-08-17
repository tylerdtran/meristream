// this is a server component intended to detect sessions
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
import HomePage from './page'

export default async function AuthHomePage () {
    // const supabase = createServerComponentClient({ cookies })
    // const { data: { session} } = await supabase.auth.getSession()
    // console.log(session)

    // if (!session) {
    //     redirect('/SignIn')
    // }

    return (
        <HomePage />
    );
}