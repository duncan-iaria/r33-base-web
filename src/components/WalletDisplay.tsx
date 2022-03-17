import React, { useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';


export const WalletDisplay = () => {
  return (
    <div
      style={{
        position: 'absolute',
        right: 40,
        zIndex: 100,
        display: 'flex',
        flex: 1,
        padding: 24,
        justifyContent: 'flex-end',
      }}
    >
      <WalletMultiButton
        className="forge-bot-wallet-button"
        style={{ backgroundColor: 'rgb(167, 0, 0)' }}
      />
    </div>
  );
};
