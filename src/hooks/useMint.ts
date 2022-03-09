import { useStore } from 'src/store';
import { computed } from 'vue';
import { Contract } from 'web3-eth-contract';

export const useMint = () => {
  const store = useStore();
  const mintContract = computed(() => store.getters['general/mintContract']);
  const mintContractAddress = computed(() => store.getters['general/mintContractAddress']);
  const account = computed(() => store.getters['general/ethereumAccount']);

  // Todo: Modify the logic once contract has been finalized
  const mint = () => {
    const contract = mintContract.value as Contract;
    contract.methods
      .mint('1')
      .send({
        to: mintContractAddress.value,
        from: account.value,
      })
      .once('error', (err: Error) => {
        console.error(err.message);
        store.dispatch('general/setError', err.message);
      })
      .then((receipt: any) => {
        console.log(receipt);
        //TODO check if data reload is required
      });
  };

  return {
    mint,
  };
};
