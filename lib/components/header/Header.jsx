import React from 'react';

import './Header.css';

export const Header = () => {
  return (
    <div className="header">
      <div className="header-logo-text">photos viewer</div>
      <nav>
        <li selected><a href="/">Home</a></li>
        <li><a href="https://github.com/nabham" target="_blank">Github</a></li>
      </nav>
    </div>
  );
}