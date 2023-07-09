
import React from 'react';
import './Footer.scss';
import Link from 'next/link';

export default function Footer() {
    return (
        <div className="footer-total flex justify-between items-center w-full p-7 text-white bottom-0">
            <div className="footer-links flex flex-row gap-4">
                <Link href="/tou"><div>Terms of Use </div></Link>
                <Link href="/pp"> <div>Privacy Policy</div></Link>
                <Link href="/about"> <div>About</div></Link>
            </div>
            <div className="footer-logo">
                <div>© 2023 Meristream LLC</div>
            </div>
        </div>
        
    )
}
