import React from 'react';

import { InfoPanel } from './InfoPanel';
import { Logo } from './Logo';
export const GameOverlayUi = () => (
  <div
    style={{
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between',
    }}
  >
    <Logo></Logo>
    <InfoPanel></InfoPanel>
  </div>
);
