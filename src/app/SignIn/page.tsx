'use client';
import { useState } from 'react';
import './SignIn.scss';
import Link from 'next/link';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  // const [oneTimePassword, setOneTimePassword] = useState('');

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // Handle sign-in logic here
  //   console.log('Email:', email);
  //   console.log('Password:', password);
    
  // };

  
  // const Login = async () => {
  //   const router = useRouter()
  //   // inserted .auth.signInWithPassword to write to the supabase auth sector of the database
  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   })
  //   if (error) {
  //     console.log(error.message)
  //   }else {
  //     console.log('Login successful')
  //     router.push('/')
  //   }
  // }
  const Login = async (e: any) => {
    e.preventDefault();
  
    try {
      // Call the authentication method
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
  
      // Check for any errors during authentication
      if (error) {
        throw error;
      } else {
        console.log('Login successful');
        console.log(supabase.auth.getUser())
        router.push('/'); // Navigate to the desired route on successful login
      }
    } catch (error) {
      console.log('Error during login:', error);
    }
  };

  return (
    <div className="h-screen signin-container">
      <div className="signin-content">
        <div className="signin-fields">
          <div className='signin-header-container'>      
            <div className='signin-header'>
              <h2 className="signin-title">Sign In</h2>
              <div className='signin-account'><Link href="../SignUp">Need to create an account? Click Here</Link></div>
            </div>
          </div>
          <div>
            <form onSubmit={Login}>
              <div className='email-passwd'>
                <div className="email-field general-field">
                  <label htmlFor="email">Email Address:</label>
                  <input
                    className="field-input text-black"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className='password-field general-field'>
                  <label htmlFor="password">Password:</label>
                  <input
                    className="field-input text-black"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="signin-button">
                <button className="continue-button" type="submit">Continue</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;




// const { email } = req.body; 
// const customer = await stripe.customers.create({ email: email });
// res.send(customer);

