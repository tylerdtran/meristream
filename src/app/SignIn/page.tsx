'use client';
import { useState } from 'react';
import './SignIn.scss';
import Link from 'next/link';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/router';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [oneTimePassword, setOneTimePassword] = useState('');
  const [Lmsg, setLMsg] = useState(''); // Login message
  

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle sign-in logic here
    console.log('Email:', email);
    console.log('Password:', password);
    
  };

  
  const Login = async () => {
    const router = useRouter()
    // inserted .auth.signInWithPassword to write to the supabase auth sector of the database
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setLMsg(error.message)
    }else {
      setLMsg('Login successful')
      console.log('Login successful')
      router.push('/')
    }
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
            <form onSubmit={Login}>
              <div className='email-passwd'>
                <div className="email-field general-field">
                  <label htmlFor="email">Email Address:</label>
                  <input
                    className="field-input text-black"
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
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
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>
              <div className="signin-button">
                <button className="continue-button" type="submit">Continue</button>
              </div>
            </form>
            <p>{Lmsg}</p>
          </div>
        </div>
        {/* <div className="signin-verification">
          <div>
            <div className="SignInVerification">We sent a verification code to your email, <br />please enter below to continue:</div>
          </div>
          <form>  
              <input className="verification-number-form"type="number"></input>
          </form>  
        </div> 
        <div className="signin-button">
                <button className="continue-button" type="submit">Continue</button>
        </div> */}
      </div>
    </div>
  );
};

export default SignIn;




// const { email } = req.body; 
// const customer = await stripe.customers.create({ email: email });
// res.send(customer);

