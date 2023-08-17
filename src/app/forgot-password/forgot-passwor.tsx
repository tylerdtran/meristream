"use client"
import { supabase } from '../../utils/supabase';
import { useState } from 'react';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');


    const handleResetPassword = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: 'http://localhost:3000/update-password',
            });
            if (error) throw error;
            setMessage('Check your email for the password reset link');
            console.log(message);
        } catch (error) {
            console.log(error);
        } 
    }

    return (
        <div className="w-screen h-screen">
            <h1>Forgot Password</h1>
            <div>
                <form onSubmit={handleResetPassword}>
                <label htmlFor="email">Email</label>    
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" disabled={loading}>Send</button>
                </form>
                <div>{message}</div>
            </div>
        </div>
    );
}