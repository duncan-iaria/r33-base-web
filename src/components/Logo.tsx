import React from 'react';

import fbLogo from '../assets/images/fb-logo.png';

export const Logo = () => {
  return (
    <div style={{ zIndex: 1, display: 'flex', marginTop: 100, marginLeft: 12 }}>
      <img src={fbLogo} height={164} />
      <div>
        <h1>ForgeBots</h1>
        <h2>GEM COLLECTOR</h2>
        <p>
          <i>A Portals Experience...</i>
        </p>
      </div>
    </div>
  );
};
