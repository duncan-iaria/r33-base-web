import React, { useContext, useEffect, useCallback } from 'react';
import Unity from 'react-unity-webgl';
import { toast } from 'react-toastify';
import { UnityContextData, GAME_NAME } from '../hooks/useUnityContext';
import { useNftAuthentication } from '../hooks/useNftAuthentication';
import { requestTokenPayout } from '../api';

const toastOptions = {
  position: toast.POSITION.TOP_CENTER,
};

interface Props {
  setGameLoaded: (isGameLoaded: boolean) => void;
  setGameInProgress: (isGameLoaded: boolean) => void;
}

export const TryAgain = ({ message, onClick }: any) => {
  return (
    <div>
      {message}{' '}
      <button className="fb-retry-button" onClick={onClick}>
        Try Again?
      </button>
    </div>
  );
};

export const UnityDisplay = ({ setGameLoaded, setGameInProgress }: Props) => {
  const { isAuthenticated, walletPublicKey, getFirstAuthenticatedNft } = useNftAuthentication();
  const unityContext = useContext(UnityContextData);

  // TODO clean this up!
  const onVictory = useCallback(
    async (walletAddress: string, score: number) => {
      const winningNft = getFirstAuthenticatedNft();
      const payoutResponse = await requestTokenPayout(
        walletPublicKey!.toBase58(),
        winningNft?.mint
      );
      const payout =
        payoutResponse?.body?.data?.amountPaidOut &&
        payoutResponse?.body?.data?.amountPaidOut / 100;

      switch (payoutResponse.statusCode) {
        case 200:
          toast.success(`${payout} Egems Successfully Awarded!`, { ...toastOptions });
          break;
        case 500:
          toast.error(
            payoutResponse.body.isRetryAllowed ? (
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
    },
    [isAuthenticated, walletPublicKey, getFirstAuthenticatedNft]
  );

  const onLogMessage = (message: string) => {
    console.log(message);
  };

  const setUnityWallet = (walletAddress: string) => {
    unityContext.send(GAME_NAME, 'OnWalletSet', walletAddress);
  };

  const setUnityAuthenticationStatus = (isAuthenticatedBit: number) => {
    unityContext.send(GAME_NAME, 'OnAuthenticationSet', isAuthenticatedBit);
  };

  const onGameStart = () => {
    setUnityAuthenticationStatus(isAuthenticated ? 1 : 0);
    setGameInProgress(true);
  };

  useEffect(() => {
    unityContext.on('victory', onVictory);
    unityContext.on('debug', onLogMessage);
    unityContext.on('gameStart', onGameStart);
    unityContext.on('loaded', () => {
      setGameLoaded(true);
    });

    () => {
      unityContext.removeAllEventListeners();
    };
  }, [walletPublicKey, isAuthenticated]);

  useEffect(() => {
    console.log('is authenticated...', isAuthenticated);

    walletPublicKey && setUnityWallet(walletPublicKey.toString());
    setUnityAuthenticationStatus(isAuthenticated ? 1 : 0);
  }, [isAuthenticated]);

  return (
    <>
      <Unity
        unityContext={unityContext}
        style={{
          left: 0,
          top: 0,
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: 0,
        }}
      ></Unity>
    </>
  );
};
