import React, { useContext } from 'react';
import companionPortrait from '../assets/images/companion-bot-portrait.png';
import blockyPortrait from '../assets/images/blocky-portrait.png';
import { useNftAuthentication } from '../hooks/useNftAuthentication';
import { UnityContextData, GAME_NAME } from '../hooks/useUnityContext';

const width = 400;

export const InfoPanel = () => {
  const { isLoading, isAuthenticated, walletPublicKey } = useNftAuthentication();
  const unityContext = useContext(UnityContextData);

  const isDisplayingInfo = !isLoading && walletPublicKey;

  const onPressPlay = () => {
    unityContext.send(GAME_NAME, 'OnGameStart');
  };

  return (
    <div style={{ zIndex: 10 }}>
      {isDisplayingInfo && (
        <div className="fb-info-panel" style={{ width: width }}>
          {isAuthenticated ? <img src={companionPortrait} /> : <img src={blockyPortrait} />}
          <div style={{ marginTop: 12 }}>
            {isAuthenticated ? (
              <p>
                You have connected a wallet that holds a Forge- Bot. You have unlocked the full
                experience and will earn the maximium $EGEM reward!
              </p>
            ) : (
              <p>
                You don’t have a ForgeBot in this wallet so you will be using a Portals avatar. For
                the full expe- rience and to maximize your $EGEM reward connect with a wallet
                holding a ForgeBot.
              </p>
            )}
          </div>
          {!isAuthenticated && (
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row-reverse' }}>
              <a href="https://magiceden.io/marketplace/forgebots" style={{ marginTop: 24 }}>
                <button style={{ fontSize: '1.25rem' }}>BUY A FORGE BOT</button>
              </a>
            </div>
          )}
        </div>
      )}
      {isDisplayingInfo && (
        <button onClick={onPressPlay} style={{ width, marginTop: 24 }}>
          PLAY
        </button>
      )}
    </div>
  );
};
