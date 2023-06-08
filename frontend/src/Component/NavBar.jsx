import React from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', text: 'EMP', icon: '🏠' },
  { to: '/all', text: 'View Attendance', icon: '👁️' },
  { to: '/add', text: 'Mark Attendance', icon: '➕' },
];

const NavBar = () => {
  const navStyle = {
    background: '#a599ea',
    padding: '10px',
    fontFamily: 'Poppins, sans-serif',
  };

  const linkStyle = {
    color: '#FFFFFF',
    marginRight: '20px',
    textDecoration: 'none',
    fontSize: '20px',
    transition: 'color 0.3s ease-in-out',
  };

  const activeLinkStyle = {
    fontWeight: 'bold',
  };

  return (
    <nav style={navStyle}>
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          exact
          style={linkStyle}
          activeStyle={activeLinkStyle}
          onMouseEnter={(e) => {
            e.target.style.color = '#a599ea';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#FFFFFF';
          }}
        >
          {link.icon} {link.text}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
