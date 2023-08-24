
'use client';
import React, { useState, useEffect, useRef }from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import './NavBar.scss';


export default function NavBar() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [open, setOpen] = useState(false); 

    const toggleMobileMenu = () => {
      setMobileMenuOpen(!isMobileMenuOpen);
    };  


    return (
        <div className='navbar-total flex justify-between items-center w-full top-0 p-7'>
          <div className="nav-hamburger-title-holder">
            <div className="nav-title-holder">

              <div className="nav-title uppercase"><Link href="/">Meristream</Link></div>
            </div>
            <div className={`nav-mobile-menu ${isMobileMenuOpen ? '' : ''}`}>
              <MenuIcon className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu} style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'none' }}/>
            </div>
          </div>
          <div className={`nav-element-holder-mobile flex flex-col gap-4 ${isMobileMenuOpen ? '' : 'hidden'}`}>
              <NavBarItem link="../../Devices" name="Devices" />
              <NavBarItem link="../../account" name="Account" />
              <NavBarItem link="../../Pricing" name="Pricing Plans" />
              <NavBarItem link="../../SignOut" name="Sign Out" > 
                {/* <DropdownMenu></DropdownMenu> */}
              </NavBarItem>
          </div>
          <div className="nav-regular-menu">
            <div className="nav-element-holder flex flex-row gap-6 ">
              <NavBarItem link="../../Devices" name="Devices" />
              <NavBarItem link="../../account" name="Account" />
              <NavBarItem link="../../Pricing" name="Pricing Plans" />
              <NavBarItem link="../../SignOut" name="Sign Out" > 
                {/* <DropdownMenu></DropdownMenu> */}
              </NavBarItem>
            </div> 
         </div> 
        </div>
      );
       
}

interface NavBarItemProps {
  link: string;
  name: string;
  children?: React.ReactNode;
}

function NavBarItem (props: NavBarItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <Link href={props.link}>
      <div onClick={() => setOpen(!open)}>{props.name}</div>
      {open && props.children}
    </Link>
  )
}

function DropdownMenu() {

  const dropdownRef = useRef<HTMLDivElement>(null);

  function DropdownItem(props: React.HTMLProps<HTMLAnchorElement>) {
    return (
      <div className="menu-item">
        {props.children}
      </div>
    );
  }

  // const { user, logout} = useUser(); 
  const [open, setOpen] = useState(false);

  let menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="dropdown">
      <div className="menu">
        {/* <DropdownItem className="email-title">{user.email}</DropdownItem> */}
        <DropdownItem className="billing-title"><Link href="#">Billing</Link></DropdownItem>
        <DropdownItem className="change-password-title"><Link href="../../update-password">Change Password</Link></DropdownItem>
        <DropdownItem className="sign-out-title"><Link href="../../SignOut">Sign Out</Link></DropdownItem> 
      </div>
    </div>
  );

}

