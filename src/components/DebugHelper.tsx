import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import { useNftAuthentication } from '../hooks/useNftAuthentication';
import { requestTokenPayout } from '../api';

const WALLET = process.env.TEST_WALLET_ADDRESS as string;
const NFT = process.env.TEST_NFT_ADDRESS;
const toastOptions = {
  position: toast.POSITION.TOP_CENTER,
};

export const TryAgain = ({ message, onClick }: any) => {
  return (
    <div>
      {message} <button onClick={onClick}>Try Again?</button>
    </div>
  );
};

export const DebugHelper = () => {
  const { isAuthenticated, walletPublicKey, getFirstAuthenticatedNft } = useNftAuthentication();

  const onVictory = useCallback(
    async (walletAddress: string, score: number) => {
      const winningNft = getFirstAuthenticatedNft();
      console.info('you won!', walletAddress, score, winningNft?.mint);
      const payoutResponse = await requestTokenPayout(WALLET, NFT);
      console.log('payout res', payoutResponse);
      const payout =
        payoutResponse?.body?.data?.amountPaidOut &&
        payoutResponse?.body?.data?.amountPaidOut / 100;

      switch (payoutResponse.statusCode) {
        case 200:
          toast.success(`${payout} Egems Successfully Awarded!`, { ...toastOptions });
          break;
        case 500:
          toast.error(
            !payoutResponse.body.isRetryAllowed ? (
              <TryAgain
                message={payoutResponse.body.message}
                onClick={() => onVictory(walletAddress, 1)}
              />
            ) : (
              `${payoutResponse.body.message}`
            ),
            { ...toastOptions, autoClose: false }
          );
          break;
        default:
          toast.error('Something went wrong...');
          break;
      }
      console.info('code', payoutResponse.statusCode);
      console.info('payoutRes:', payoutResponse);
      // console.info('payout amount', payoutResponse.body.data.amountPaidOut);
    },
    [walletPublicKey, isAuthenticated]
  );

  const onToast = () => {
    console.log('toasting...');
    toast.success('Default Notification !');
  };

  return (
    <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 100 }}>
      <button onClick={() => onVictory(WALLET, 1)}>test</button>
      <button onClick={onToast}>toast</button>
    </div>
  );
};
