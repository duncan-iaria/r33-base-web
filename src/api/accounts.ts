const SERVER_URL = process.env.SERVER_URL;

export async function createOrGetTokenAccount(walletAddress: string) {
  try {
    const response = await fetch(`${SERVER_URL}/api/v1/account/createTokenAccount`, <any>{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        receivingWalletAddress: walletAddress,
      }),
    });

    if (response.status !== 200) {
      // TODO move error handling here
    } else {
      console.info('token account exists or was created successfully...');
    }

    return response.json();
  } catch (error) {
    console.log('Error calling create token account endpoint...', error);
  }
}
