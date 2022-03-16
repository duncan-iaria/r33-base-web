import React, { useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { useNftAuthentication } from '../hooks/useNftAuthentication';

export const WalletDisplay = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const jsonPubKey = publicKey?.toJSON();

  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
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
