
'use client';
import React, { useState } from 'react';
import './SignUp.scss';
import Link from 'next/link';

interface Inputs {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface PaymentInputs {
  cardNumber: string;
  expiryDate: string;
  cvc: string;

}
interface PaymentErrors {
  cardNumber?: string;
  expiryDate?: string;
  cvc?: string;
}


const SignUp: React.FC = () => {
  const [inputs, setInputs] = useState<Inputs>({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  const validateForm = () => {
    let formErrors: Errors = {};

    if(!inputs.firstName) formErrors.firstName = "This field is required";
    if(!inputs.lastName) formErrors.lastName = "This field is required";
    if(!inputs.company) formErrors.company = "This field is required";
    if(!inputs.email) formErrors.email = "This field is required";
    else if(!/^\S+@\S+$/.test(inputs.email)) formErrors.email = "Invalid email";
    if(!inputs.password) formErrors.password = "Password is required (minimum 8 characters)";
    else if(inputs.password.length < 8) formErrors.password = "Password should be minimum 8 characters";
    if(!inputs.confirmPassword) formErrors.confirmPassword = "This field is required";
    else if(inputs.confirmPassword !== inputs.password) formErrors.confirmPassword = "The passwords do not match";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(validateForm()) {
      console.log(inputs);
      // Add your onSubmit logic here
    }
  }

  return (
    <div className='signuppage h-screen'>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
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
              <input className="field" name="firstName" onChange={handleInputChange} placeholder="First Name" />
              {errors.firstName && <p>{errors.firstName}</p>}
            </div>
            <div className='field-input'>
              <div className="field-title">Last Name:</div>
              <input className="field" name="lastName" onChange={handleInputChange} placeholder="Last Name" />
              {errors.lastName && <p>{errors.lastName}</p>}
            </div>
          </div>

          <div className='signup-org-container signup-name-container'>
            <div className='field-input'>
              <div className="field-title">Company/Organization Name</div>
              <input className="field" name="company" onChange={handleInputChange} placeholder="Company/Organization" />
              {errors.company && <p>{errors.company}</p>}
            </div>
            <div className='field-input'>
              <div className="field-title">Email:</div>
              <input className="field" name="email" onChange={handleInputChange} placeholder="Email Address" />
              {errors.email && <p>{errors.email}</p>}
            </div>
          </div>

          <div className='signup-password-container signup-name-container'>
            <div className='field-input'>
              <div className="field-title">Password:</div>
              <input className="field" name="password" onChange={handleInputChange} placeholder="Set Password" type="password" />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <div className='field-input'>
              <div className="field-title">Confirm Password:</div>
              <input className="field" name="confirmPassword" onChange={handleInputChange} placeholder="Confirm Password" type="password" />
              {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className='continue-button'>
            <button className="signup-button" type="submit">Continue</button>
          </div>
        </form>
      </div>
      <div className="choose-plan-container">
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
              {/* {errors.cardNumber && <p>{errors.cardNumber}</p>} */}
            </div>
            <div className='signup-name-container'>
              <div className='field-input'>
                <div className="field-title">Expiration Date</div>
                <input className="field" name="expirationDate" onChange={handleInputChange} placeholder="Expiration Date" type="number" />  
                {/* {errors.expirationDate && <p>{errors.expirationDate}</p>} */}
              </div>
              <div className='field-input'>
                <div className="field-title">CVV</div>
                <input className="field" name="cvv" onChange={handleInputChange} placeholder="CVV" type="number" />
                {/* {errors.cvv && <p>{errors.cvv}</p>} */}
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
      </div>
    </div>
  );
}

export default SignUp;

// cost to register the user
// const Register = async () => {
//   const { data, error } = await supabase.auth.signUp({
//     email, 
//     password 
//   }, 
//   { 
//     data: {
//       username
//     }
//   })
//   if (error) {
//     setRMsg(error.message)
//   }else {
//     setRMsg('User created successfully')
//     setUser('data.user')
//   }
// }
 
// // /*
// // Signing the User out 
// async function signOut() {
//   const { error } = await supabase.auth.signOut()
// }
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