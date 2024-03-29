
import React from 'react';
import './Footer.scss';
import Link from 'next/link';

export default function Footer() {
    return (
        <div className="footer-total flex justify-between items-center w-full p-7 text-white ">
            <div className="footer-links flex flex-row gap-4">
                <Link href="../../Terms"><div>Terms of Use </div></Link>
                <Link href="https://www.meristream.com/privacy-policy"> <div>Privacy Policy</div></Link>
                <Link href="https://www.meristream.com/about"> <div>About</div></Link>
            </div>
            <div className="footer-logo">
                <div>© 2023 Meristream LLC</div>
            </div>
        </div>
        
    )
}
