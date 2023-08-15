// 'use client';
// import React, { useState, useEffect, useRef }from 'react';
// import { useUser } from '../../../utils/Context';
// import handleResetPassword from '../ResetPassword/resetpass';
// import { supabase } from '../../../utils/supabase';
// import MenuIcon from '@mui/icons-material/Menu';
// import Link from 'next/link';
// import './NavBar.scss';
// // import  AccDropDown  from '../AccountDropdown/AccDropDown';
// import { CSSTransition } from 'react-transition-group';

// export default function NavBar() {
//     const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//     const [open, setOpen] = useState(false); 

//     const toggleMobileMenu = () => {
//       setMobileMenuOpen(!isMobileMenuOpen);
//     };  



//     return (
//         <div className='navbar-total flex justify-between items-center w-full top-0 p-7'>
//           <div className="nav-hamburger-title-holder">
//             <div className="nav-title-holder">

//               <div className="nav-title uppercase"><Link href="/">Meristream</Link></div>
//             </div>
//             <div className={`nav-mobile-menu ${isMobileMenuOpen ? '' : ''}`}>
//               <MenuIcon className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu} style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'none' }}/>
//               {/* <div className={`nav-element-holder-mobile flex flex-col gap-4 ${isMobileMenuOpen ? '' : 'hidden'}`}>
//                 <Link href="../../SignUp"><div>Devices</div></Link>
//                 <Link href="/license"><div>License</div></Link>
//                 <Link href="/account"><div>Account</div></Link>
//               </div> */}
//             </div>
//           </div>
//           <div className={`nav-element-holder-mobile flex flex-col gap-4 ${isMobileMenuOpen ? '' : 'hidden'}`}>
//               <NavBarItem link="../../SignUp" name="Devices" />
//               <NavBarItem link="../../PricingPlans" name="License" />
//               <NavBarItem link="#" name="Account" > 
//                 <DropdownMenu></DropdownMenu>
//               </NavBarItem>
//               {/* <Link href="../../SignUp"><div>Devices</div></Link>
//               <Link href="../../License"><div>Pricing</div></Link>
//               <Link href="/account"><div>Account</div></Link> */}
//           </div>
//           <div className="nav-regular-menu">
//             <div className="nav-element-holder flex flex-row gap-4 ">
//                 {/* <Link href="../../SignUp"><div>Devices</div></Link>
//                 <Link href="../../License"><div>License</div></Link>
//                 <button onClick={toggleAccDropdown}><DropdownMenu>Account</DropdownMenu></button> */}
//               <NavBarItem link="../../SignUp" name="Devices" />
//               <NavBarItem link="../../PricingPlans" name="Pricing Plans" />
//               <NavBarItem link="#" name="Account" > 
//                 <DropdownMenu></DropdownMenu>
//               </NavBarItem>
//             </div> 
//          </div> 
//         </div>
//       );
       
// }

// interface NavBarItemProps {
//   link: string;
//   name: string;
//   children?: React.ReactNode;
// }

// function NavBarItem (props: NavBarItemProps) {
//   const [open, setOpen] = useState(false);

//   return (
//     <Link href={props.link}>
//       <div onClick={() => setOpen(!open)}>{props.name}</div>
//       {open && props.children}
//     </Link>
//   )
// }

// function DropdownMenu() {

//   const [activeMenu, setActiveMenu] = useState('main');
//   const [menuHeight, setMenuHeight] = useState<number | null>(null);
//   const dropdownRef = useRef(null);

//   // useEffect(() => {
//   //   // setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
//   //   if (dropdownRef.current?.firstElementChild) { // Check if firstChild exists before accessing
//   //     setMenuHeight(dropdownRef.current.firstElementChild.offsetHeight);
//   //   }
//   // }, [])

//   function calcHeight(el: HTMLElement) {
//     const height = el.offsetHeight;
//     setMenuHeight(height);
//   }


//   function DropdownItem(props: React.HTMLProps<HTMLAnchorElement>) {
//     return (
//       <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
//         {props.children}
//       </a>
//     );
//   }

//   const { user, logout} = useUser(); 

//   const handleSignOut = () => {
//       useEffect(() => {
//           logout();
//       }, [])
//   }

//   return (
//     <div className="dropdown" style={{ height: menuHeight}} ref={dropdownRef}>
//       <CSSTransition
//         in={activeMenu === 'main'}
//         timeout={500}
//         classNames="menu-primary"
//         unmountOnExit
//         onEnter={calcHeight}>
//         <div className="menu">
//           {/* <DropdownItem>My Profile</DropdownItem> */}

//           <DropdownItem className="email-title">{user.email}</DropdownItem>
//           <DropdownItem className="billing-title">Billing</DropdownItem>
//           <DropdownItem className="change-password-title" onClick={handleResetPassword} goToMenu="settings">Change Password</DropdownItem>
//           <DropdownItem className="sign-out-title" onClick={handleSignOut}>Sign Out</DropdownItem>  
//         </div>
//       </CSSTransition>
//       <CSSTransition
//         in={activeMenu === 'settings'}
//         timeout={500}
//         classNames="menu-secondary"
//         unmountOnExit
//         onEnter={calcHeight}>
//           <div className="menu">
//             <div className="secondary-resetpass-container">
//                   <div className="changepass-title-container">
//                       <h1 className="changepass-title-container">Change Password</h1>
//                   </div>
//                   <div className="changepass-form-container">
//                       <form onSubmit={handleResetPassword}>
//                           <div className="new-password-field general-field">
//                               <label htmlFor="new-password">New Password:</label>
//                               <input
//                                   className="field-input text-black"
//                                   type="password"
//                                   id="new-password"
//                                   // value={newPassword}
//                                   // onChange={(e) => setNewPassword(e.target.value)}
//                                   required
//                               />
//                           </div>
//                           <div className="confirm-password-field general-field">
//                               <label htmlFor="confirm-password">Confirm Password:</label>
//                               <input
//                                   className="field-input text-black"
//                                   type="password"
//                                   id="confirm-password"
//                                   // value={confirmPassword}
//                                   // onChange={(e) => setConfirmPassword(e.target.value)}
//                                   required
//                               />
//                           </div>
//                       </form>
//                   </div>
//               </div>
//             </div>
//       </CSSTransition>
//     </div>
//   );

// }

'use client';
import React, { useState, useEffect, useRef }from 'react';
import { useUser } from '../../../utils/Context';
import handleResetPassword from '../../forgot-password/resetpass';
// import React, { useState, useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import './NavBar.scss';
// import  AccDropDown  from '../AccountDropdown/AccDropDown';

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
              <NavBarItem link="../../SignUp" name="Devices" />
              <NavBarItem link="../../License" name="License" />
              <NavBarItem link="#" name="Account" > 
                <DropdownMenu></DropdownMenu>
              </NavBarItem>
          </div>
          <div className="nav-regular-menu">
            <div className="nav-element-holder flex flex-row gap-4 ">
              <NavBarItem link="../../SignUp" name="Devices" />
              <NavBarItem link="../../License" name="Change Plan" />
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

  function DropdownItem(props: React.HTMLProps<HTMLAnchorElement>) {
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
        <DropdownItem className="email-title">{user.email}</DropdownItem>
        <DropdownItem className="billing-title"><Link href="#">Billing</Link></DropdownItem>
        <DropdownItem className="change-password-title" onClick={handleResetPassword}><Link href="../../update-password">Change Password</Link></DropdownItem>
        <DropdownItem className="sign-out-title" onClick={handleSignOut}><Link href="../../SignOut">Sign Out</Link></DropdownItem>  
      </div>
    </div>
  );

}

