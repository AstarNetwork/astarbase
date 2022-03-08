import { BTreeMap, Struct } from '@polkadot/types';
import { AccountId, Balance, EraIndex } from '@polkadot/types/interfaces';
import BN from 'bn.js';

export { getStakingArray } from './utils';

export type ContractEvm = {
  Evm: string;
};

export interface EraStakingPoints extends Struct {
  readonly total: Balance;
  readonly stakers: BTreeMap<AccountId, Balance>;
  readonly formerStakedEra: EraIndex;
  readonly claimedRewards: Balance;
  readonly numberOfStakers: BN;
}
