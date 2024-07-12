import React, { useState, useEffect } from 'react';
import Logo from '../images/avatar1.jpg';
import { Link } from 'react-router-dom';
import { HiBars3 } from "react-icons/hi2";
import { MdOutlineClose } from "react-icons/md";
import Logout from '../pages/Logout';

const Header = ({ posts }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);
  

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };

  

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className='nav__logo' onClick={closeNavHandler}>
          <img src={Logo} alt='NavBar Logo' />
        </Link>
       
        {isNavShowing && (
          <ul className="nav__menu">
            {currentUser ? (
              <>
                <li><Link to="/profile/sdfsdf" onClick={closeNavHandler}>{currentUser.name}</Link></li>
                <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
                <li><Logout /></li>
              </>
            ) : (
              <>
                <li><Link to="/register" onClick={closeNavHandler}>Sign Up</Link></li>
                <li><Link to="/login" onClick={closeNavHandler}>Login</Link></li>
              </>
            )}
          </ul>
        )}
        <button className="nav__toggle-btn" onClick={() => setIsNavShowing(!isNavShowing)}>
          {isNavShowing ? <MdOutlineClose /> : <HiBars3 />}
        </button>
      </div>
    </nav>
  );
}

export default Header;
