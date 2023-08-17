
'use client';
import React, { useState } from 'react';
import './SignUp.scss';
import Link from 'next/link';
import { supabase } from '../../utils/supabase';

import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const router = useRouter()

  const Register = async (e: any) => { 
    e.preventDefault();
    const confirmPwdInput = document.querySelector<HTMLInputElement>('input[name="confirmPwd"]');
    const confirmPwd = confirmPwdInput ? confirmPwdInput.value : '';
  
    if (password !== confirmPwd) {
      // You can replace this with a more user-friendly error message display
      alert("Passwords do not match!");
  
      // Stop the registration process
      return;
    }
    if (password.length < 5) {
      alert('password is not long enough')
    }

    try {
    const { data , error } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            first_name: firstName,
            last_name: lastName,
            company_name: companyName
          }
        }
      }
    )
    router.refresh();

    if (error) {
      throw error;
    }

    console.log("User registered successfully:", data.user);
    
    router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const {
    register,
  formState: { errors }
  } = useForm();

  const handlePasswordChange = (e: any) => {
    const value = e.target.value;
    setPassword(value); // Update the password state on input change

    // Manually register the password field with custom validation
    register("password", {
      required: true,
      minLength: 5,
      value // You can also include the value in the validation rules
    });
  };

  return (
    <div className='signuppage h-screen'>
      <div className="signup-container">
        <form className="signup-form" onSubmit={Register}>
        <div className="signuppage-header">
          <div className='signuppage-content'>
            <div>
              <h1 className="container-title field-title">Sign Up</h1>
            </div>
            <div>Already have an account? 
              <br /> 
            <Link className="click-login" href="../SignIn">Click here to log in</Link>
            </div>
          </div>
        </div>
          <div className="signup-name-container">
            <div className='field-input'>
              <div className="field-title">First Name:</div>
              <input className="field" name="firstName" onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
            </div>
            <div className='field-input'>
              <div className="field-title">Last Name:</div>
              <input className="field" name="lastName" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
            </div>
          </div>

          <div className='signup-org-container signup-name-container'>
            <div className='field-input'>
              <div className="field-title">Company/Organization Name</div>
              <input className="field" name="company" onChange={(e) => setCompanyName(e.target.value)} placeholder="Company/Organization" />
            </div>
            <div className='field-input'>
              <div className="field-title">Email:</div>
              <input className="field" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
            </div>
          </div>

          <div className='signup-password-container signup-name-container'>
            <div className='field-input'>
              <div className="field-title">Password:</div>
              <input className={`field form-control ${errors.password ? 'is-invalid' : ''}`} name="password" 
               value={password}
              onChange={handlePasswordChange} placeholder="Set Password" type="password" 
              />
              <div className="invalid-feedback">{errors.password?.message?.toString()}</div>
            </div>
            <div className='field-input'>
              <div className="field-title">Confirm Password:</div>
              <input 
                placeholder="Confirm Password" 
                type="password" 
                {...register('confirmPwd', {
                  required: true,
                  validate: (value) => value === password || "The passwords do not match"
                })} 
                className={`field form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.confirmPwd?.message?.toString()}</div>
            </div>
          </div>

          <div className='continue-button'>
            <button className="signup-button" type="submit">Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

// name="confirmPassword" onChange={handleInputChange}

// import React from 'react'

//   return (
//     <div className="container mt-5">
//       <h2>React Confirm Password Validation Example</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="form-group">
//           <label>Password</label>
//           <input
//             name="password"
//             type="password"
//             {...register('password')}
//             className={`form-control ${errors.password ? 'is-invalid' : ''}`}
//           />
//           <div className="invalid-feedback">{errors.password?.message}</div>
//         </div>
//         <div className="form-group">
//           <label>Confirm Password</label>
//           <input
//             name="confirmPwd"
//             type="password"
//             {...register('confirmPwd')}
//             className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}
//           />
//           <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
//         </div>
//         <div className="mt-3">
//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

 
// // /*
// //   const [Rmsg, setRMsg] = useState(''); // Registration message

// // Resetting the User's Password
// await supabase.auth.resetPasswordForEmail('hello@example.com', {
//   redirectTo: 'http://example.com/account/update-password',
// })

// await supabase.auth.updateUser({ password: new_password })

// // api/auth/callback.ts

// // The code is retrieved from the query parameter - use whichever mechanism is recommended
// // for your app/framework. This is just an example.
// const code = url.searchParams.get('code')

// // call the Supabase API to exchange the code for a session
// await supabase.auth.exchangeCodeForSession(code)

// // api/auth/callback.ts

// // The password page path is retrieved from the query parameter - use whichever mechanism is recommended
// // for your app/framework. This is just an example.
// const next = url.searchParams.get('next')

// // using NextJS API response object in this example
// res.redirect(next)

// await supabase.auth.updateUser({ password: new_password })
// */


{/* <div className="choose-plan-container">
<div className="choose-plan-header">
  <div className="choose-plan-title">
    <h1 className="container-title field-title">Choose a plan</h1>
  </div>
  <div className="choose-plan-body">
    <div className="cp-per-month"> Per-device cost: $30 </div>
    <div className="cp-per-device"> Amount of devices:  </div>
    <div> 
      <div className="total-per-month">Total Per Month: N/A</div>
    </div>
  </div>
</div>
<div className="payment-fields">
  <form className="payment-form"> 
    <div className="payment-header">
    <h1>Payment Information</h1>
  </div>
    <div className='field-input'>
      <div className="field-title">Card Number</div>
      <input className="field" name="cardNumber" onChange={handleInputChange} placeholder="Card Number" type="number" />
    </div>
    <div className='signup-name-container'>
      <div className='field-input'>
        <div className="field-title">Expiration Date</div>
        <input className="field" name="expirationDate" onChange={handleInputChange} placeholder="Expiration Date" type="number" />  
      </div>
      <div className='field-input'>
        <div className="field-title">CVV</div>
        <input className="field" name="cvv" onChange={handleInputChange} placeholder="CVV" type="number" />
      </div>
    </div>
    <div className="payment-button">
      <button className="signup-button">Complete Checkout</button>
    </div>
    <div>
      <div> 
        <div> 
          payment secured in SSL 
        </div>
        <div>
          All prices listed in USD
        </div>
      </div>
    <div>
      Your payment renews on june 1, 2023. To cancel your subscription, click here. 
    </div>
  </div>
  </form>
</div>
</div> */}
