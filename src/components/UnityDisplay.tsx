import React, { useContext, useEffect } from 'react';
import Unity from 'react-unity-webgl';
import { UnityContextData, GAME_NAME } from '../hooks/useUnityContext';
import { useNftAuthentication } from '../hooks/useNftAuthentication';

export const UnityDisplay = () => {
  const { isAuthenticated } = useNftAuthentication();
  const unityContext = useContext(UnityContextData);
  const onVictory = (walletAddress: string, score: number) => {
    console.info('you won!', walletAddress, score);
  };

  const onLogMessage = (message: string) => {
    console.log(message);
  };

  const setUnityWallet = (walletAddress: string) => {
    unityContext.send(GAME_NAME, 'OnWalletSet', walletAddress);
  };

  useEffect(() => {
    unityContext.on('Victory', onVictory);
    unityContext.on('debug', onLogMessage);
  }, []);

  useEffect(() => {
    console.log('is authenticated...', isAuthenticated);
    isAuthenticated && setUnityWallet('test');
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
