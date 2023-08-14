'use client';
import React, { useState, useEffect, useRef }from 'react';
import { useUser } from '../../../utils/Context';
import handleResetPassword from '../ResetPassword/resetpass';


// AccountDropdown
const AccDropDown = () => {
    const { user, logout} = useUser(); 
    const [open, setOpen] = useState(false);
    

    let menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let handler = (event: MouseEvent) => {
            if (menuRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return ()=> {
            document.removeEventListener("mousedown", handler);
        }
    });

    const handleSignOut = () => {


        useEffect(() => {
            logout();
        }, [])
    }
        


    return (
        <div className="main-popup-container">
            <div className="secondary-popup-container" ref={menuRef}>
                {/* <div className="Email">
                    <button className="email-title">{user.email}</button>
                </div>
                <div className="Billing">
                    <button className="billing-title">Billing</button>
                </div>
                <div className="ChangePassword">
                    <button className="change-password-title" onClick={handleResetPassword}>Change Password</button>
                </div>
                <div className="SignOut">
                    <button className="sign-out-title" onClick={handleSignOut}>Sign Out</button>
                </div>       */}
                <div className="email-title">{user.email}</div>
                <div className="billing-title">Billing</div>
                <div className="change-password-title" onClick={handleResetPassword}>Change Password</div>
                <div className="sign-out-title" onClick={handleSignOut}>Sign Out</div>  
            </div>
        </div>
    );
}

export default { AccDropDown };

// interface DropdownItemProps {
//     img: string;
//     text: string;
// }

