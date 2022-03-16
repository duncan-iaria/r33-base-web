import React, { useContext, useEffect, useCallback } from 'react';
import Unity from 'react-unity-webgl';
import { UnityContextData, GAME_NAME } from '../hooks/useUnityContext';
import { useNftAuthentication } from '../hooks/useNftAuthentication';
import { requestTokenPayout } from '../api';

interface Props {
  setGameLoaded: (isGameLoaded: boolean) => void;
  setGameInProgress: (isGameLoaded: boolean) => void;
}

export const UnityDisplay = ({ setGameLoaded, setGameInProgress }: Props) => {
  const { isAuthenticated, walletPublicKey, getFirstAuthenticatedNft } = useNftAuthentication();
  const unityContext = useContext(UnityContextData);

  const onVictory = useCallback(
    async (walletAddress: string, score: number) => {
      const winningNft = getFirstAuthenticatedNft();
      console.info('you won!', walletAddress, score, winningNft?.mint);
      const payoutResponse = await requestTokenPayout(
        walletPublicKey!.toBase58(),
        winningNft?.mint
      );
      console.info('payoutRes:', payoutResponse);
    },
    [walletPublicKey, isAuthenticated]
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
