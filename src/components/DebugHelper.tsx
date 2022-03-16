import React, { useCallback } from 'react';

import { useNftAuthentication } from '../hooks/useNftAuthentication';
import { requestTokenPayout } from '../api';

export const DebugHelper = () => {
  const { isAuthenticated, walletPublicKey, getFirstAuthenticatedNft } = useNftAuthentication();

  const onVictory = useCallback(
    async (walletAddress: string, score: number) => {
      const winningNft = getFirstAuthenticatedNft();
      console.info('you won!', walletAddress, score, winningNft?.mint);
      const payoutResponse = await requestTokenPayout(
        walletPublicKey!.toBase58(),
        winningNft?.mint
      );
      console.info('payoutRes:', payoutResponse);
      console.info('payout amount', payoutResponse.body.data.amountPaidOut);
    },
    [walletPublicKey, isAuthenticated]
  );

  return (
    <div style={{ position: 'absolute', top: 12, left: 12 }}>
      <button onClick={() => onVictory(walletPublicKey!.toBase58(), 1)}>test</button>
    </div>
  );
};
