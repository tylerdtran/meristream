'use client'
import { useEffect } from "react"
import { useUser } from "../../utils/Context"

export default function LogOut() {
    const { logout } = useUser();

    useEffect(() => {
        logout();
        console.log("logout successful")

    }, [])
    return (
        <div>
            <h1>Log Out</h1>
        </div>

    )
}