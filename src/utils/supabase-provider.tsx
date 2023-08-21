// // all of this is meant to provide the data of the user for the entire app to have. 
// // Thus it can be used to regulate the user's access to certain pages, see if they are subscribed or not etc. 
'use client'
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
// import { supabase } from './supabase';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';


type CurrentUserContextType = {
    user: any | null;
    // login: ( email: string, password: string) => void;
    logout: () => void;
    isLoading: boolean;
    };

export const Context = createContext<CurrentUserContextType>(null!);

const Provider = ( { children }: { children: ReactNode }) => {
    const supabase = createClientComponentClient();
    const router = useRouter();
    // initializing our user state to the authorized user. 
    const [user, setUser] = useState<ReturnType<typeof supabase.auth.getUser> | null>(supabase.auth.getUser());
    const [isLoading, setIsLoading] = useState(true);

    // whenever user refreshes the application 
    // they will get which ever user that is currently set to supabase.auth.getUser()
    useEffect(() => {
        const getUserProfile = async () => {
            const {data: {user}, error } = await supabase.auth.getUser()
            

            if (user) {
                const {data: profile} = await supabase.from('user_profiles').select('*').eq('id', user.id).single()
                // updates the component's state by merging the session user data with the profile data and then setting it as the new state
                setUser({...user, ...profile})
        }
    };
    getUserProfile();

    supabase.auth.onAuthStateChange(() => 
    {
        getUserProfile();
    })
        
    }, [])  

    
    // useEffect(() => {
    //   const res = await fetch('http://localhost:3000/api/set-supabase-cookie', {
    //     event: user ? 'SIGNED_IN' : 'SIGNED_OUT',
    //     session: supabase.auth.getSession(),
    //   })
    //   const data = await res.json()
    // }, [user]);

    // if the state of our user changes, which UseEffect will account for, we call this endpoint here ('/api/set-supabase-cookie') if the user has changed
    // useEffect(() => {
    //   axios.post("/api/set-supabase-cookie", {
    //     event: user ? "SIGNED_IN" : "SIGNED_OUT",
    //     session: supabase.auth.getSession(),
    //   });
    // }, [user]);

    // essentially trying to account for the user if 

    // useEffect((() => {
    //   supabase.auth.onAuthStateChange((event, session) => {
    //     if (user) {
    //       event = 'SIGNED_IN';
    //     }
    //     else if (!user) {
    //       event = 'SIGNED_OUT';
    //     }
    //   })
    // }), [user]);

    const login = async (email: string, password: string) => {
      
        try {
          // Call the authentication method
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
    
            if (error) {
              // console.log('Incorrect email or password. Please try again.');
              return error;
            } else {
              console.log('Login successful');
              console.log(supabase.auth.getUser())
              router.push('/Home');
            }
          } catch (error) {
            console.log('Error during login:', error);
          }
      };

    const logout = async () => {
        await supabase.auth.signOut()
        router.push('/SignIn')
        router.refresh()
        setUser(null)
      };

    const exposed = {
        user, 
        // login,
        logout, 
        isLoading
    };

    return (
        <Context.Provider value={exposed}> 
            {children} 
        </Context.Provider>
    );
    
};

export default Provider; 

export const useUser = () => useContext(Context);
