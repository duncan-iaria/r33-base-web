import { useMemo } from 'react';
import { useWalletNfts, NftTokenAccount } from '@nfteyez/sol-rayz-react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const FORGEBOT_SYMBOL = process.env.FORGEBOT_SYMBOL;
const UPDATE_AUTH = process.env.UPDATE_AUTH;
const FIRST_CREATOR = process.env.FIRST_CREATOR;

export const useNftAuthentication = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const { nfts, isLoading } = useWalletNfts({
    publicAddress: publicKey?.toString() || '',
    connection,
  });

  const isNftAuthenticated = (nft: NftTokenAccount): boolean =>
    nft.data.symbol === FORGEBOT_SYMBOL &&
    nft.updateAuthority === UPDATE_AUTH &&
    nft.data?.creators[0]?.address === FIRST_CREATOR;

  const isAuthenticated = useMemo(() => nfts.some(isNftAuthenticated), [nfts]);

  const getFirstAuthenticatedNft = () => {
    const nft = nfts.find(isNftAuthenticated);
    console.log('first found nft', nft);
    return nft;
  };

  return {
    isLoading,
    isAuthenticated,
    walletPublicKey: publicKey,
    getFirstAuthenticatedNft,
  };
};
