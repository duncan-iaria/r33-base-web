const SERVER_URL = process.env.SERVER_URL;

export async function requestTokenPayout(walletAddress: string, nftAddress?: string) {
  const response = await fetch(`${SERVER_URL}/api/v1/transactions/payout`, <any>{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      receivingWalletAddress: walletAddress,
      nftAddress,
    }),
  });

  return response.json();
}
