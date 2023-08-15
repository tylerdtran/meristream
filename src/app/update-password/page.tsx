"use client"
import { supabase } from "../../utils/supabase";
import { useState } from 'react';  // Removed unnecessary import
import { useUser } from "../../utils/Context";

export default function UpdatePassword() {
    const { user } = useUser();
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
        <div className="w-screen h-screen">
            <h1>Update Password</h1>
            <form onSubmit={updatePassword}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>Password updated successfully!</p>}
                <button type="submit">Update Password</button>
            </form>
        </div>
    )
}
