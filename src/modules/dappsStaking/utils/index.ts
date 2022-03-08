import { EraIndex } from '@polkadot/types/interfaces';
import { ContractEvm, EraStakingPoints } from './../index';
import { ApiPromise } from '@polkadot/api';
import { Option } from '@polkadot/types';

const getDapps = async (api: ApiPromise): Promise<string[]> => {
  try {
    const dApps = (await api.query.dappsStaking.registeredDapps.entries()).map((it) => {
      const dapp = it[0].toHuman() as ContractEvm[];
      return dapp[0].Evm;
    });
    return dApps;
  } catch (error: any) {
    console.error(error.messages);
    return [];
  }
};

const getCurrentEra = async (api: ApiPromise): Promise<number> => {
  return (await api.query.dappsStaking.currentEra<EraIndex>()).toNumber();
};

const getAddressEnum = (address: string) => ({ Evm: address });

const getLatestStakePoint = async (
  api: ApiPromise,
  contract: string,
  currentEra: number
): Promise<EraStakingPoints | undefined> => {
  const contractAddress = getAddressEnum(contract);
  for (let era = currentEra; era > 0; era--) {
    const stakeInfoPromise = await api.query.dappsStaking.contractEraStake<
      Option<EraStakingPoints>
    >(contractAddress, era);
    const stakeInfo = stakeInfoPromise.unwrapOr(undefined);

    if (stakeInfo) {
      return stakeInfo;
    }
  }

  return undefined;
};

// Memo: the way to fetch the data before applying individual claim
export const getStakingArray = async ({
  api,
  address,
}: {
  api: ApiPromise;
  address: string;
}): Promise<string[]> => {
  const [dApps, era] = await Promise.all([getDapps(api), getCurrentEra(api)]);
  const data = await Promise.all(
    dApps.map(async (hash) => {
      const stakeInfo = await getLatestStakePoint(api, hash, era);
      if (stakeInfo) {
        for (const [account] of stakeInfo.stakers) {
          if (account.toString() === address) {
            return hash;
          }
        }
      }
    })
  );
  const filteredData = data.filter((it) => it !== undefined) as string[];
  return filteredData;
};
