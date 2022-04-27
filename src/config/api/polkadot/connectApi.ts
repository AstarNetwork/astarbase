import { objToArray } from './../../../modules/common/utils/index';
import { getInjectedExtensions } from 'src/modules/wallet';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts } from '@polkadot/extension-dapp';
import type { InjectedExtension } from '@polkadot/extension-inject/types';
import type { KeypairType } from '@polkadot/util-crypto/types';
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
  type: KeypairType | undefined;
}

const loadAccounts = async (api: ApiPromise) => {
  await cryptoWaitReady();

  const [systemChain, injectedAccounts] = await Promise.all([
    api.rpc.system.chain() as any,
    web3Accounts().then((accounts): InjectedAccountExt[] =>
      accounts.map(
        ({ address, meta, type }, whenCreated): InjectedAccountExt => ({
          address,
          meta: {
            ...meta,
            name: `${meta.name} (
              ${meta.source === 'polkadot-js' ? 'extension' : meta.source})`,
            whenCreated,
          },
          type,
        })
      )
    ),
  ]);

  const isDevelopment = isTestChain(systemChain ? systemChain.toString() : '<unknown>');

  keyring.loadAll(
    {
      genesisHash: api.genesisHash,
      isDevelopment,
      ss58Format: 5,
    },
    injectedAccounts
  );
};

export async function connectApi(endpoint: string, store: any) {
  const provider = new WsProvider(endpoint);
  const api = new ApiPromise({
    provider,
  });

  store.commit('general/setCurrentNetworkStatus', 'connecting');

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
            type: account.type,
          };
        });

        store.commit('general/setSubstrateAccounts', accountMap);
      }
    });

    store.commit('general/setCurrentNetworkStatus', 'connected');
  } catch (err) {
    console.error(err);
    store.commit('general/setCurrentNetworkStatus', 'offline');
  }

  return {
    api,
    extensions,
  };
}
