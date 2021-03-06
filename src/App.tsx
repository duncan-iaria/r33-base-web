import React, { FC, ReactNode, useMemo, useState } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import {
  WalletDisplay,
  GameOverlayUi,
  UnityDisplay,
  DebugHelper,
  Loader,
  Logo,
} from './components';

import { UnityContextProvider } from './hooks/useUnityContext';

export const App: FC = () => {
  return (
    <WalletContextProvider>
      <UnityContextProvider>
        <Content />
      </UnityContextProvider>
    </WalletContextProvider>
  );
};

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const Content: FC = () => {
  const [isGameInProgress, setGameInProgress] = useState<boolean>(false);
  const [isGameLoaded, setGameLoaded] = useState<boolean>(false);
  const [isGameEnabled] = useState<boolean>(false);

  return (
    <main style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <Logo />
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          marginTop: 100,
          padding: 36,
        }}
      >
        <h2>???? Closed until further notice ??? we're busy building... ????</h2>
      </div>
      {/* <DebugHelper /> */}
      {/* 
        <ToastContainer />
        <UnityDisplay setGameLoaded={setGameLoaded} setGameInProgress={setGameInProgress} />
        {!isGameInProgress && isGameLoaded && <GameOverlayUi setGameInProgress={setGameInProgress} />}
        {isGameLoaded ? <WalletDisplay /> : <Loader />} 
      */}
    </main>
  );
};
