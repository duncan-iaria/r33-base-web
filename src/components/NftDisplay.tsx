import React from 'react';
import { useWalletNfts } from '@nfteyez/sol-rayz-react';

const FORBOT_SYMBOL = 'FORGEBOTS';
const UPDATE_AUTH = 'GPi8gWDoUbTHC153diiFfcuYLg8UNnMSxzbsmYJpr2RZ';
const FIRST_CREATOR = 'GyFfdLMsKhyYFGv14KYafbpCiZLBZwSuaJGqeyqZts5s';

export const NftDisplay = ({ publicKey, connection }: any) => {
  const { nfts, isLoading } = useWalletNfts({
    publicAddress: publicKey,
    connection,
  });

  const isForgeBotOwner = nfts.some(
    (nft) =>
      nft.data.symbol === FORBOT_SYMBOL &&
      nft.updateAuthority === UPDATE_AUTH &&
      nft.data?.creators[0]?.address === FIRST_CREATOR
  );

  return (
    <>
      NFTs you own: {nfts.length} and you have access {isForgeBotOwner.toString()}
    </>
  );
};
