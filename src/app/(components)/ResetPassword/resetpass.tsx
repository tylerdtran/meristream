import { supabase } from '../../../utils/supabase';
import { useState } from 'react';
import { useUser } from '../../../utils/Context';
import { CSSTransition } from 'react-transition-group';

const handleResetPassword = async (e: any) => {
    const { user } = useUser();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    e.preventDefault();
    const { data, error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: 'https://example.com/update-password',
    })

    if (error) {
        setErrorMessage('Error sending reset password email');
    } else {
        setErrorMessage('Reset password email sent');
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
            })
    }

    return (
        <div className="main-resetpass-container">
            <div className="secondary-resetpass-container">
                <div className="changepass-title-container">
                    <h1 className="changepass-title-container">Change Password</h1>
                </div>
                <div className="changepass-form-container">
                    <form onSubmit={handleResetPassword}>
                        <div className="new-password-field general-field">
                            <label htmlFor="new-password">New Password:</label>
                            <input
                                className="field-input text-black"
                                type="password"
                                id="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="confirm-password-field general-field">
                            <label htmlFor="confirm-password">Confirm Password:</label>
                            <input
                                className="field-input text-black"
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default handleResetPassword;