
'use client';
import React, { useState } from 'react';
import './SignUp.scss';
import Link from 'next/link';
import { supabase } from '../../utils/supabase';


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
          emailRedirectTo: "https://localhost:3000/auth/callback",
          data: {
            first_name: firstName,
            last_name: lastName,
            company_name: companyName
          }
        }
      }
    )

    if (error) {
      throw error;
    }

    console.log("User registered successfully:", data.user);

    router.push('/SignIn')
    
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


