import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/'); // Redirect to the login page
    window.location.reload()
  };

  return (
    <div>
      <li className='li' onClick={handleLogout}><a href="">Logout</a></li>
    </div>
  );
};

export default Logout;
