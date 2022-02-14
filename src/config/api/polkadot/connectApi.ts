import { objToArray } from '../../../common';
import { providerEndpoints } from '../../../config';
import { getInjectedExtensions } from '../../..//wallet/utils';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts } from '@polkadot/extension-dapp';
import type { InjectedExtension } from '@polkadot/extension-inject/types';
import { keyring } from '@polkadot/ui-keyring';
import { isTestChain } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';

interface InjectedAccountExt {
  address: string;
  meta: {
    name: string;
    source: string;
    whenCreated: number;
  };
}

const loadAccounts = async (api: ApiPromise) => {
  // wait for the WASM crypto libraries to load first
  await cryptoWaitReady();

  const [systemChain, injectedAccounts] = await Promise.all([
    api.rpc.system.chain() as any,
    web3Accounts().then((accounts): InjectedAccountExt[] =>
      accounts.map(
        ({ address, meta }, whenCreated): InjectedAccountExt => ({
          address,
          meta: {
            ...meta,
            name: `${meta.name} (
              ${meta.source === 'polkadot-js' ? 'extension' : meta.source})`,
            whenCreated,
          },
        })
      )
    ),
  ]);

  const isDevelopment = isTestChain(
    systemChain ? systemChain.toString() : '<unknown>'
  );

  keyring.loadAll(
    {
      genesisHash: api.genesisHash,
      isDevelopment,
      ss58Format: 5,
    },
    injectedAccounts
  );
};

export async function connectApi(
  endpoint: string,
  networkIdx: number,
  store: any
) {
  const provider = new WsProvider(endpoint);

  // load the web3 extension
  let extensions: InjectedExtension[] = [];

  const typeDefinitions = providerEndpoints[networkIdx].typeDef;
  // console.log('t', typeDefinitions);

  const api = new ApiPromise({
    provider,
    types: {
      ...typeDefinitions,
    },
  });

  store.commit('setCurrentNetworkStatus', 'connecting');

  api.on('error', (error: Error) => console.error(error.message));
  try {
    await api.isReadyOrError;
  } catch (e) {
    console.error(e);
  }

  const injectedPromise = await getInjectedExtensions();

  try {
    extensions = await injectedPromise;
  } catch (e) {
    console.error(e);
  }

  try {
    await loadAccounts(api);

    keyring.accounts.subject.subscribe((accounts: any) => {
      if (accounts) {
        const accountArray = objToArray(accounts);
        const accountMap = accountArray.map((account: any) => {
          const { address, meta } = account.json;
          return {
            address,
            name: meta.name.replace('\n              ', ''),
            source: meta.source,
          };
        });

        store.commit('setSubstrateAccounts', accountMap);
      }
    });

    store.commit('setCurrentNetworkStatus', 'connected');
  } catch (err) {
    console.error(err);
    store.commit('setCurrentNetworkStatus', 'offline');
  }

  return {
    api,
    extensions,
  };
}
