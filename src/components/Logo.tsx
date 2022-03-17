import React from 'react';

import fbLogo from '../assets/images/fb-logo.png';
// import FbLogoSvg from 'jsx:../assets/images/fb-logo.svg';

export const Logo = () => {
  return (
    <div style={{ zIndex: 1, display: 'flex', marginTop: 100, marginLeft: 12 }}>
      {/* <FbLogoSvg/>
      <svg xmlns={fbLogoSvg}>
      </svg> */}
      <img src={fbLogo} height={164} style={{ marginRight: -10 }} />
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
