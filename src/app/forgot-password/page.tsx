"use client"
import { supabase } from '../../utils/supabase';
import { useState } from 'react';
import './Forgot-Password.scss';
import Link from 'next/link';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');


    const handleResetPassword = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: 'http://localhost:3000/UpdatePassword',
            });
            if (error) throw error;
            setMessage('Check your email for the password reset link');
            console.log(message);
        } catch (error) {
            setMessage('Error sending password reset email');
            console.log(error);
        } 
    }

    return (
        <div className="fp-container w-screen h-screen">
            <div className="flex flex-col items-center justify-center h-96">
                <div className="fp-title py-4">
                    <h1>Forgot Password</h1>
                </div>
                <div className="form-input flex flex-col">
                    <form onSubmit={handleResetPassword} className="flex flex-col">
                        <div className='email-title p-1'>
                            <label className="email-title-real" htmlFor="email">Email:</label> 
                        </div> 
                        <div className='email-input-container'>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="email-input px-4 py-3 rounded-md bg-white"
                            placeholder="Your email address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
                        <div className='fp-redirect-container'>
                            <div className="fp-redirect rounded-md ">
                                <Link href="/SignIn"><div className="fp-redirect-text">Have an account?</div></Link>
                            </div>
                        </div>
                        <div className='fp-button-container'>
                            <div className="fp-button my-2 p-3 bg-white rounded-md flex justify-center">
                                <button type="submit" disabled={loading}>Send</button>
                            </div>
                        </div>
                    </form>
                    <div>{message}</div>
                </div>
            </div>
        </div>
    );
}