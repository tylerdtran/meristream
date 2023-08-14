'use client';
import React, { useState, useEffect, useRef }from 'react';
import { useUser } from '../../../utils/Context';
import handleResetPassword from '../ResetPassword/resetpass';
// import React, { useState, useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import './NavBar.scss';
import  AccDropDown  from '../AccountDropdown/AccDropDown';

export default function NavBar() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [open, setOpen] = useState(false); 

    const toggleMobileMenu = () => {
      setMobileMenuOpen(!isMobileMenuOpen);
    };  

    // const toggleAccDropdown = () => {

    // };


    return (
        <div className='navbar-total flex justify-between items-center w-full top-0 p-7'>
          <div className="nav-hamburger-title-holder">
            <div className="nav-title-holder">

              <div className="nav-title uppercase"><Link href="/">Meristream</Link></div>
            </div>
            <div className={`nav-mobile-menu ${isMobileMenuOpen ? '' : ''}`}>
              <MenuIcon className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu} style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'none' }}/>
              {/* <div className={`nav-element-holder-mobile flex flex-col gap-4 ${isMobileMenuOpen ? '' : 'hidden'}`}>
                <Link href="../../SignUp"><div>Devices</div></Link>
                <Link href="/license"><div>License</div></Link>
                <Link href="/account"><div>Account</div></Link>
              </div> */}
            </div>
          </div>
          <div className={`nav-element-holder-mobile flex flex-col gap-4 ${isMobileMenuOpen ? '' : 'hidden'}`}>
              <NavBarItem link="../../SignUp" name="Devices" />
              <NavBarItem link="../../License" name="License" />
              <NavBarItem link="#" name="Account" > 
                <DropdownMenu></DropdownMenu>
              </NavBarItem>
              {/* <Link href="../../SignUp"><div>Devices</div></Link>
              <Link href="../../License"><div>Pricing</div></Link>
              <Link href="/account"><div>Account</div></Link> */}
          </div>
          <div className="nav-regular-menu">
            <div className="nav-element-holder flex flex-row gap-4 ">
                {/* <Link href="../../SignUp"><div>Devices</div></Link>
                <Link href="../../License"><div>License</div></Link>
                <button onClick={toggleAccDropdown}><DropdownMenu>Account</DropdownMenu></button> */}
              <NavBarItem link="../../SignUp" name="Devices" />
              <NavBarItem link="../../License" name="License" />
              <NavBarItem link="#" name="Account" > 
                <DropdownMenu></DropdownMenu>
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
  // const [activeMenu, setActiveMenu] = useState('main');
  // const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  // }, [])

  // function calcHeight(el) {
  //   const height = el.offsetHeight;
  //   setMenuHeight(height);
  // }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item">
        {props.children}
      </a>
    );
  }

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
    <div className="dropdown">
      <div className="menu">
        {/* <DropdownItem>My Profile</DropdownItem> */}

        <DropdownItem className="email-title">{user.email}</DropdownItem>
        <DropdownItem className="billing-title">Billing</DropdownItem>
        <DropdownItem className="change-password-title" onClick={handleResetPassword}>Change Password</DropdownItem>
        <DropdownItem className="sign-out-title" onClick={handleSignOut}>Sign Out</DropdownItem>  
      </div>
    </div>
  );

}




    // return (
    //     <div className='navbar-total flex justify-between items-center w-full top-0 p-7'>
    //         <div className="nav-title-holder">
    //             <div className="nav-title uppercase">Meristream</div>
    //         </div>
    //         <div className="nav-menu">
    //             <div className="nav-element-holder flex flex-row gap-4 {`mobile-menu ${isMobileMenuOpen ? styles.open : ''}`}">
    //                 <Link href="/devices"><div>Devices</div></Link>
    //                 <Link href="/license"><div>License</div></Link>
    //                 <Link href="/account"><div>Account</div></Link>
    //             </div>
    //         </div>
    //     </div>mobile-element-container
    // )