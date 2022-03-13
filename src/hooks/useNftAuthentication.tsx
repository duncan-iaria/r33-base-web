import { useMemo } from 'react';
import { useWalletNfts } from '@nfteyez/sol-rayz-react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const FORBOT_SYMBOL = 'FORGEBOTS';
const UPDATE_AUTH = 'GPi8gWDoUbTHC153diiFfcuYLg8UNnMSxzbsmYJpr2RZ';
const FIRST_CREATOR = 'GyFfdLMsKhyYFGv14KYafbpCiZLBZwSuaJGqeyqZts5s';

// Just incase we need this
const TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';

export const useNftAuthentication = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const { nfts, isLoading } = useWalletNfts({
    publicAddress: publicKey?.toString() || '',
    connection,
  });

  const isAuthenticated = useMemo(
    () =>
      nfts.some(
        (nft) =>
          nft.data.symbol === FORBOT_SYMBOL &&
          nft.updateAuthority === UPDATE_AUTH &&
          nft.data?.creators[0]?.address === FIRST_CREATOR
      ),
    [nfts]
  );

  return {
    isLoading,
    isAuthenticated,
    walletPublicKey: publicKey,
  };
};
