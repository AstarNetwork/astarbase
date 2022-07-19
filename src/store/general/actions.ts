import { ActionTree } from 'vuex';
import Web3EthContract from 'web3-eth-contract';
import Web3 from 'web3';
import { decodeAddress } from '@polkadot/util-crypto';
import { StateInterface } from './../index';
import { Config } from '../../types/config';
import { ConnectPayload } from './mutations';
import { GeneralStateInterface as State } from './index';
import { LOCAL_STORAGE } from 'src/config/localStorage';

const UNRECOGNIZED_CHAIN_ID_ERROR_CODE = 4902;
const toastTimeout = 5000;

/**
 * Switches to network given by chainConfig or creates a new network configuration if needed.
 * @param ethereum Web3 provider.
 * @param chainConfig Network configuration.
 */
const switchNetwork = async (ethereum: any, chainConfig: Config) => {
  const networkId: number = await ethereum.request({
    method: 'net_version',
  });

  if (networkId != chainConfig.network.id) {
    const chainIdHex = `0x${chainConfig.network.id.toString(16)}`;

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
    } catch (error: any) {
      if (error.code == UNRECOGNIZED_CHAIN_ID_ERROR_CODE) {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: chainIdHex,
              chainName: chainConfig.network.name,
              rpcUrls: [chainConfig.network.rpcUrl],
              nativeCurrency: {
                name: chainConfig.network.name,
                symbol: chainConfig.network.symbol,
                decimals: chainConfig.network.decimals,
              },
              blockExplorerUrls: [chainConfig.network.blockExplorerUrl],
            },
          ],
        });
      }
    }
  }
};

const actions: ActionTree<State, StateInterface> = {
  async connect({ commit }) {
    const { ethereum } = window as any;
    const isMetamaskInstalled = ethereum && ethereum.isMetaMask;
    const { SELECTED_ADDRESS } = LOCAL_STORAGE;

    const configResponse = await fetch('/config/register_config.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const config: Config = await configResponse.json();

    if (isMetamaskInstalled) {
      (Web3EthContract as any).setProvider(ethereum);
      const web3 = new Web3(ethereum);

      try {
        // Get Metamask accounts and network id
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });

        const account = accounts[0];

        // Switch network or create a new configuration if needed.
        await switchNetwork(ethereum, config);

        // Create a registerContract contract instance
        const abiResponse = await fetch('/config/register_abi.json', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        const abi = await abiResponse.json();

        web3.eth.handleRevert = true;

        let registeredEvm = '';

        const registerContract = new web3.eth.Contract(abi, config.astarBaseContractAddress);

        const stakerStatus = await registerContract.methods.checkStakerStatus(account).call();
        const isRegistered = await registerContract.methods.isRegistered(account).call();

        console.log('stakerStatus', stakerStatus);
        console.log('isRegistered', isRegistered);

        const substrateAddress = localStorage.getItem(SELECTED_ADDRESS);

        console.log(substrateAddress);

        if (substrateAddress) {
          const publicKey = decodeAddress(substrateAddress, undefined, 5);

          try {
            const registeredAddress = await registerContract.methods.ss58Map(publicKey).call();

            if (
              registeredAddress &&
              registeredAddress !== '0x0000000000000000000000000000000000000000'
            ) {
              registeredEvm = registeredAddress;
            }

            console.log('registeredEvm', registeredEvm);
          } catch (error: any) {
            console.error(error);
          }
        }

        commit('connectSuccess', {
          ethereumAccount: account,
          registerContract,
          astarBaseContractAddress: config.astarBaseContractAddress,
          stakerStatus,
          isRegistered,
          registeredEvm,
        } as ConnectPayload);

        // Register listeners
        ethereum.on('accountsChanged', async (accounts: string[]) => {
          commit('changeEthereumAccount', accounts[0]);
          const stakerStatus = await registerContract.methods.checkStakerStatus(accounts[0]).call();
          const isRegistered = await registerContract.methods.isRegistered(accounts[0]).call();

          commit('changeStakerStatus', stakerStatus);
          commit('changeIsRegistered', isRegistered);
        });

        ethereum.on('chainChanged', async () => {
          // Avoid reloading window in case when new network configuration is
          // aded to the wallet, otherwise reload window.
          const networkId: number = await ethereum.request({
            method: 'net_version',
          });

          if (networkId != config.network.id) {
            window.location.reload();
          }
        });
      } catch (err) {
        commit('connectFailed', err);
      }
    } else {
      commit('connectFailed', 'Install Metamask first.');
    }
  },
  setError({ commit }, errorMessage: string) {
    commit('setError', errorMessage);
  },
  setRegistered({ commit }, registered: boolean) {
    commit('setRegistered', registered);
  },
  async disconnect({ commit }) {
    commit('changeEthereumAccount', '');
    commit('changeStakerStatus', 0);
    commit('changeIsRegistered', false);
    commit('setRegisteredEvm', '');
  },
  showAlertMsg({ commit }, { msg, alertType }) {
    commit('setShowAlertMsg', true);
    commit('setAlertMsg', msg);
    commit('setAlertType', alertType);
    setTimeout(() => {
      commit('setShowAlertMsg', false);
    }, toastTimeout);
  },
};

export default actions;
