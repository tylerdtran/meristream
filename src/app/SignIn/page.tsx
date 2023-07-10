'use client';
import { useState } from 'react';
import './SignIn.scss';
import Link from 'next/link';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
                    className="field-input"
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
                    className="field-input"
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
          </div>
        </div>
        <div className="signin-verification">
          <div>
            <div className="SignInVerification">We sent a verification code to your email, <br />please enter below to continue:</div>
          </div>
          <form>  
              <input className="verification-number-form"type="number"></input>
          </form>  
        </div>
        <div className="signin-button">
                <button className="continue-button" type="submit">Continue</button>
              </div>
      </div>
    </div>
  );
};

export default SignIn;
