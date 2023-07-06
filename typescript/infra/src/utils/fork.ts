import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers';
import { ethers } from 'ethers';

import { ChainName, MultiProvider } from '@hyperlane-xyz/sdk';

export const resetFork = async (url: string) => {
  const provider = new JsonRpcProvider();
  await provider.send('hardhat_reset', [
    {
      forking: {
        jsonRpcUrl: url,
      },
    },
  ]);
};

export const impersonateAccount = async (
  account: string,
  rpcUrl: string,
): Promise<JsonRpcSigner> => {
  const provider = new JsonRpcProvider(rpcUrl);
  await provider.send('hardhat_impersonateAccount', [account]);
  await provider.send('hardhat_setBalance', [
    account,
    ethers.utils.parseEther('42').toHexString(),
  ]);
  return provider.getSigner(account);
};

export const useLocalProvider = async (
  multiProvider: MultiProvider,
  chain: ChainName | number,
  rpcUrl: string,
) => {
  const provider = new JsonRpcProvider(rpcUrl);
  multiProvider.setProvider(chain, provider);
};
