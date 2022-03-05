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
        zIndex: 100,
        display: 'flex',
        flex: 1,
        // backgroundColor: 'red',
        padding: 12,
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
