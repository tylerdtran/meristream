// // all of this is meant to provide the data of the user for the entire app to have. 
// // Thus it can be used to regulate the user's access to certain pages, see if they are subscribed or not etc. 
'use client'
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from './supabase';
import { useRouter } from 'next/navigation';


type CurrentUserContextType = {
    user: any | null;
    login: ( email: string, password: string) => void;
    logout: () => void;
    };

export const Context = createContext<CurrentUserContextType>(null!);

const Provider = ( { children }: { children: ReactNode }) => {
    const router = useRouter();
    // initializing our user state to the authorized user. 
    const [user, setUser] = useState<ReturnType<typeof supabase.auth.getUser> | null>(supabase.auth.getUser());

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

    // const login 

    const login = async (email: string, password: string) => {
      
        try {
          // Call the authentication method
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
    
            if (error) {
              console.log('Incorrect email or password. Please try again.');
            } else {
              console.log('Login successful');
              console.log(supabase.auth.getUser())
              router.push('/');
            }
          } catch (error) {
            console.log('Error during login:', error);
          }
      };

    const logout = async () => {
        await supabase.auth.signOut()
        setUser(null)
        router.push('/')
      };

    const exposed = {
        user, 
        login,
        logout
    };

    return (
        <Context.Provider value={exposed}> 
            {children} 
        </Context.Provider>
    );
    
};

export default Provider; 

export const useUser = () => useContext(Context);

// 'use client'
// import React, { createContext, useState, useEffect, useContext  } from 'react';
// import { supabase } from './supabase';
// import { useRouter } from 'next/navigation';
// import {
//     Session,
//     SupabaseClient,
//     User,
//     createPagesBrowserClient,
//   } from "@supabase/auth-helpers-nextjs";


// type SupabaseAuthContextType = {
//     supabase: SupabaseClient;
//     session: null | Session;
//     user?: User;
//   };

// // const Context = createContext();
// const SupabaseAuthContext = createContext<SupabaseAuthContextType>(null!);

// const useSupabaseAuth = () => {
//     const context = useContext<SupabaseAuthContextType>(SupabaseAuthContext);
  
//     if (context === undefined) {
//       throw new Error("useSupabaseAuth context was used outside of its Provider");
//     }
  
//     return context;
//   };

// const SupabaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const router = useRouter();
//     // initializing our user state to the authorized user. 
//     const [user, setUser] = useState<any | null>(supabase.auth.getUser())

//     console.log(supabase.auth.getUser())

//     // whenever user refreshes the application 
//     // they will get which ever user that is currently set to supabase.auth.getUser()
//     useEffect(() => {
//         const getUserProfile = async () => {
//             const sessionUser = supabase.auth.getUser()

//             if (sessionUser) {
//                 const {data: profile} = await supabase.from('user_profiles').select('*').eq('id', sessionUser.data.user.id).single()
//                 // updates the component's state by merging the session user data with the profile data and then setting it as the new state
//                 setUser({...sessionUser, ...profile})
//         }
//     };
//     getUserProfile();

//     supabase.auth.onAuthStateChange(() => 
//     {
//         getUserProfile();
//     })
        
//     }, [])  

//     // const login 

//     const login = async (e: any, email: string, password: string) => {
//         e.preventDefault();
      
//         try {
//           // Call the authentication method
//           const { data, error } = await supabase.auth.signInWithPassword({
//             email: email,
//             password: password,
//           });
    
//             if (error) {
//               console.log('Incorrect email or password. Please try again.');
//             } else {
//               console.log('Login successful');
//               console.log(supabase.auth.getUser())
//               router.push('/');
//             }
//           } catch (error) {
//             console.log('Error during login:', error);
//           }
//       };

//     const logout = async () => {
//         await supabase.auth.signOut()
//         setUser(null)
//         router.push('/')
//       };

//     const exposed = {
//         user, 
//         login,
//         logout
//     };

//     return (
//         <SupabaseAuthContext.Provider value={ supabase, user, session }> 
//             {children} 
//         </SupabaseAuthContext.Provider>
    
//     );
    
// };

// export const useUser = () => useContext(Context);

// export default Provider; 