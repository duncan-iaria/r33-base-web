import React from 'react';

import { InfoPanel } from './InfoPanel';
import { Logo } from './Logo';
interface Props {
  setGameInProgress: (isInProgress: boolean) => void;
}

export const GameOverlayUi = ({ setGameInProgress }: Props) => (
  <div
    style={{
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between',
    }}
  >
    <Logo/>
    <InfoPanel setGameInProgress={setGameInProgress}></InfoPanel>
  </div>
);
