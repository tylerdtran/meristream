// primary reason for storing data in cookies
// this route handler sets up a CodeExchange route to exchange an auth code for the user's session, which is set as a cookie for future requests made to supabase
// essentially, the user being sent to this route after sign up creates a permanent session for them that is stored into a cookie via the route handler client
// we use a get request to find the url of the user, then we retrieve the code using the search params
// if there is a code, We then exchange the code for a session, which is stored in a cookie
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '../../../../database.types'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}