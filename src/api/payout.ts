const SERVER_URL = process.env.SERVER_URL;

export async function requestTokenPayout(walletAddress: string, nftAddress?: string) {
  try {
    const response = await fetch(`${SERVER_URL}/api/v1/transactions/payout`, <any>{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        receivingWalletAddress: walletAddress,
        nftAddress,
      }),
    });

    if (response.status !== 200) {
      // TODO error handling
    }
    return response.json();
  } catch (error) {
    console.log('Error calling payout endpoing...', error);
  }
}
