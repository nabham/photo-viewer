import React from 'react';

import './Header.css';

export const Header = () => {
  return (
    <div className="header">
      <div className="header-logo-text">Photos Viewer</div>
      <nav>
        <li selected><a href="/">Home</a></li>
        <li><a href="https://github.com/nabham/photo-viewer" target="_blank">Github</a></li>
      </nav>
    </div>
  );
}