'use client';
import { useState } from 'react';

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
    <div>
      <div className='signup-header-container'>      
        <div className='signup-header'>
          <h2>Sign In</h2>
          <div>Need to create an account? Click Here</div>
        </div>
      </div>
      <div className='email-passwd'>
        <form onSubmit={handleSubmit}>
          <div className="email-field">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className='password-field'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div>
        <div> Google Sign In Option</div>
        <div> Facebook Sign In Option</div>
      </div>
      <div>
        <div className="SignInVerification">We sent a verificationo code to your email, please enter below to continue:</div>
        <form>  
            <input type="number"></input>
            <button type="submit">Continue</button>
        </form>    
      </div>
    </div>
  );
};

export default SignIn;
