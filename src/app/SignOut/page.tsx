'use client'
import React, { useEffect } from 'react';
import { useUser } from '../../utils/Context';

export default function SignOut() {
    const { logout } = useUser();

    useEffect (() => {

        logout();

    })

    return (
        <div>
            <h1>Sign Out</h1>
        </div>
    )
}