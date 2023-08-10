'use client';
import React from 'react';
import { useUser } from '../../../utils/Context';
import { useEffect } from 'react';
import handleResetPassword from '../ResetPassword/resetpass';


// AccountDropdown
const AccDropDown = () => {

    const { user, logout} = useUser(); 

    const handleSignOut = () => {


        useEffect(() => {
            logout();
        }, [])
    }
        


    return (
        <div className="main-popup-container">
            <div className="secondary-popup-container">
                <div className="Email">
                    <button className="email-title">{user.email}</button>
                </div>
                <div className="Billing">
                    <button className="billing-title">Billing</button>{/* Link to Billing Page */}
                </div>
                <div className="ChangePassword">
                    <button className="change-password-title" onClick={handleResetPassword}>Change Password</button>
                </div>
                <div className="SignOut">
                    <button className="sign-out-title" onClick={handleSignOut}>Sign Out</button>
                </div>      
            </div>
        </div>
    );
}

export default { AccDropDown };