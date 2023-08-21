'use client';
import { useState } from 'react';
import './SignIn.scss';
import Link from 'next/link';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/navigation';
import { useUser } from '../../utils/supabase-provider';

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useUser();

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  
  //   try {
  //     // Call the authentication method
  //     const { data, error } = await supabase.auth.signInWithPassword({
  //       email: email,
  //       password: password,
  //     });

  //       if (error) {
  //         setErrorMessage('Incorrect email or password. Please try again.');
  //       } else {
  //         console.log('Login successful');
  //         console.log(supabase.auth.getUser())
  //         router.push('/Home');
  //       }
  //     } catch (error) {
  //       console.log('Error during login:', error);
  //     }
  // };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    login(email, password);
  }

  


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
            <form onSubmit={handleSubmit}>
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

                <div className="error-message text-red-100">{errorMessage}</div>
                <div className="reset-pass-button"><Link href="/forgot-password">Reset Password</Link></div>
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


