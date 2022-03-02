import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts } from '@polkadot/extension-dapp';
import type { InjectedExtension } from '@polkadot/extension-inject/types';
import { keyring } from '@polkadot/ui-keyring';
import { isTestChain } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { web3Enable } from '@polkadot/extension-dapp';
// import { objToArray } from 'src/hooks/helper/common';
// import { getInjectedExtensions } from 'src/hooks/helper/wallet';
import { options } from '@astar-network/astar-api';

interface InjectedAccountExt {
  address: string;
  meta: {
    name: string;
    source: string;
    whenCreated: number;
  };
}

export const objToArray = (obj: any): any[] => {
  const keys = Object.keys(obj);
  const array = keys.map((k) => obj[k]);
  return array;
};

export const getInjectedExtensions = async (): Promise<any[]> => {
  const extensions = await web3Enable('AstarNetwork/astar-apps');
  // Memo: obtain the extension name
  // console.log('extensions', extensions);
  return extensions;
};

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
  const api = new ApiPromise(options({ provider }));
  console.log('networkIdx', networkIdx);

  store.commit('general/setCurrentNetworkStatus', 'connecting');
  // store.commit('setCurrentNetworkStatus', 'connecting');

  api.on('error', (error: Error) => console.error(error.message));
  try {
    await api.isReadyOrError;
  } catch (e) {
    console.error(e);
  }

  const injectedPromise = await getInjectedExtensions();

  // load the web3 extension
  let extensions: InjectedExtension[] = [];
  try {
    extensions = await injectedPromise;
  } catch (e) {
    console.error(e);
  }

  try {
    await loadAccounts(api);

    keyring.accounts.subject.subscribe((accounts) => {
      if (accounts) {
        const accountArray = objToArray(accounts);
        const accountMap = accountArray.map((account) => {
          const { address, meta } = account.json;
          return {
            address,
            name: meta.name.replace('\n              ', ''),
            source: meta.source,
          };
        });

        store.commit('general/setSubstrateAccounts', accountMap);
        // store.commit('setSubstrateAccounts', accountMap);
      }
    });

    store.commit('general/setCurrentNetworkStatus', 'connected');
    // store.commit('setCurrentNetworkStatus', 'connected');
  } catch (err) {
    console.error(err);
    store.commit('general/setCurrentNetworkStatus', 'offline');
    // store.commit('setCurrentNetworkStatus', 'offline');
  }

  return {
    api,
    extensions,
  };
}