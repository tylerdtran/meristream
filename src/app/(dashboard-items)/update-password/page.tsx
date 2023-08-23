"use client"
// import { supabase } from "@/utils/supabase";
import { useState } from 'react';  // Removed unnecessary import
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import './UpdatePassword.scss';

import type { Database } from '../../../../database.types';

export default function UpdatePassword() {
    const supabase = createClientComponentClient<Database>();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");  // Added state to handle errors
    const [success, setSuccess] = useState(false);  // Added state to handle success message

    const updatePassword = async (e: any) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        console.log(password)
        
        try {
            await supabase.auth.updateUser({
                password: password,
            });

            setSuccess(true);
            setError("");  // Clear any previous errors
        } catch (error) {
            setError("Error updating password");
            console.error(error);
        }
        console.log("password updated");
    }

    return (
        <div className="signin-container h-screen w-screen flex justify-center items-center">
            <div className="signin-content">
                <div className="signin-fields">
                    <div className='signin-header-container'>      
                        <div className='signin-header'>
                            <h1>Update Password</h1>
                        </div>
                    </div>
                    <form onSubmit={updatePassword}>
                        <div className='email-passwd'>
                            <div className="email-field general-field">
                                <label htmlFor="password">Password</label>
                                <input 
                                    className="field-input text-black"
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className='password-field general-field'>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    className="field-input text-black"
                                    type="password" 
                                    name="confirmPassword" 
                                    id="confirmPassword" 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {success && <p style={{ color: 'green' }}>Password updated successfully!</p>}
                        </div>
                        <div className="signin-button">
                            <button type="submit" className="continue-button">Update Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
