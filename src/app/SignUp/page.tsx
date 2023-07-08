
'use client';
import React, { useState } from 'react';
import './SignUp.scss';

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
    <div>
      <div className="signuppage-header">
        <h1>Sign Up</h1>
        <div>Already have an account?</div>
        <div>Click here to log in</div>
      </div>
      <div className="signup-container">
        <form className="h-screen signup-form" onSubmit={handleSubmit}>
          <div>First Name</div>
          <input name="firstName" onChange={handleInputChange} placeholder="First Name" />
          {errors.firstName && <p>{errors.firstName}</p>}

          <div>Last Name</div>
          <input name="lastName" onChange={handleInputChange} placeholder="Last Name" />
          {errors.lastName && <p>{errors.lastName}</p>}

          <div>Company/Organization Name</div>
          <input name="company" onChange={handleInputChange} placeholder="Company/Organization" />
          {errors.company && <p>{errors.company}</p>}

          <div>Email:</div>
          <input name="email" onChange={handleInputChange} placeholder="Email Address" />
          {errors.email && <p>{errors.email}</p>}

          <div>Password:</div>
          <input name="password" onChange={handleInputChange} placeholder="Set Password" type="password" />
          {errors.password && <p>{errors.password}</p>}

          <div>Confirm Password:</div>
          <input name="confirmPassword" onChange={handleInputChange} placeholder="Confirm Password" type="password" />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

          <input type="submit" value="Continue" />
        </form>
      </div>
      <div className="choose-plan-container">
        <div className="choose-plan">
          <div className="choose-plan-header">Choose a plan</div>
          <div className="choose-plan-body">
            <div className="cp-per-month"> Per-device cost: $30 </div>
            <div className="cp-per-device"> Amount of devices </div>
            <div className="total-per-month"> N/A</div>
          </div>
        </div>
      <div className="payment-fields">
        <div className="payment-header">Payment Information</div>
        <form className="payment-form"> 
          <div>Card Number</div>
          <input name="cardNumber" onChange={handleInputChange} placeholder="Card Number" type="number" />
          {/* {errors.cardNumber && <p>{errors.cardNumber}</p>} */}
          <div>Expiration Date</div>
          <input name="expirationDate" onChange={handleInputChange} placeholder="Expiration Date" type="number" />  
          {/* {errors.expirationDate && <p>{errors.expirationDate}</p>} */}
          <div>CVV</div>
          <input name="cvv" onChange={handleInputChange} placeholder="CVV" type="number" />
          {/* {errors.cvv && <p>{errors.cvv}</p>} */}
          <button className="payment-button">Complete Checkout</button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default SignUp;
