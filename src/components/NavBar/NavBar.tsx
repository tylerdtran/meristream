"use client";
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import './NavBar.scss';

export default function NavBar() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
      setMobileMenuOpen(!isMobileMenuOpen);
    };  

    // return (
    //     <div className='navbar-total flex justify-between items-center w-full top-0 p-7'>
    //         <div className="nav-title-holder">
    //             <div className="nav-title uppercase">Meristream</div>
    //         </div>
    //         <div className="nav-menu">
    //             <MenuIcon className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}></MenuIcon>
    //             <div className="nav-element-holder flex flex-row gap-4 {`mobile-menu ${isMobileMenuOpen ? styles.open : ''}`}">
    //                 <Link href="/devices"><div>Devices</div></Link>
    //                 <Link href="/license"><div>License</div></Link>
    //                 <Link href="/account"><div>Account</div></Link>
    //             </div>
    //         </div>
    //     </div>
    // )
    return (
        <div className='navbar-total flex justify-between items-center w-full top-0 p-7'>
          <div className="nav-title-holder">
            <div className="nav-title uppercase">Meristream</div>
          </div>
          <div className="nav-menu">
            <MenuIcon className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu} />
            <div className={`nav-element-holder flex flex-row gap-4 ${isMobileMenuOpen ? '' : 'hidden'}`}>
              <Link href="/devices"><div>Devices</div></Link>
              <Link href="/license"><div>License</div></Link>
              <Link href="/account"><div>Account</div></Link>
            </div>
          </div>
        </div>
      );
       
}




