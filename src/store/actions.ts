import { ActionTree } from 'vuex';
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import { StateInterface } from './index';
import { Config } from '../types/config';
import { ConnectPayload } from './mutations';

const UNRECOGNIZED_CHAIN_ID_ERROR_CODE = 4902;

/**
 * Switches to network given by chainConfig or creates a new network configuration if needed.
 * @param ethereum Web3 provider.
 * @param chainConfig Network configuration.
 */
const switchNetwork = async (ethereum: any, chainConfig: Config) => {
  const networkId: number = await ethereum.request({
    method: "net_version",
  });

  if (networkId != chainConfig.network.id) {
    const chainIdHex = `0x${chainConfig.network.id.toString(16)}`;

    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }]
      });
    } catch (error: any) {
      if (error.code == UNRECOGNIZED_CHAIN_ID_ERROR_CODE ) {
        await ethereum.request({
          method: "wallet_addEthereumChain",
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
}

const actions: ActionTree<StateInterface, StateInterface> = {
  async connect({ commit }) {
    const { ethereum } = window as any;
    const isMetamaskInstalled = ethereum && ethereum.isMetaMask;

    commit('connectRequest');
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config: Config = await configResponse.json();

    if (isMetamaskInstalled) {
      console.log('metamask is installed');
      (Web3EthContract as any).setProvider(ethereum);
      const web3 = new Web3(ethereum);

      try {
        // Get Metamask accounts and network id
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts'
        });

        // Switch network or create a new configuration if needed.
        await switchNetwork(ethereum, config);
        
        // Create a minting contract instance
        const abiResponse = await fetch("/config/mint_abi.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const abi = await abiResponse.json();

        const mintContract = new web3.eth.Contract(
          abi,
          config.mintContractAddress
        );

        // TODO create Astar base contract here and put it to vuex

        commit('connectSuccess', {
          account: accounts[0],
          mintContract,
          mintContractAddress: config.mintContractAddress,
        } as ConnectPayload);

        // Register listeners
        ethereum.on("accountsChanged", (accounts: string[]) => {
          commit('changeAccount', accounts[0]);
        });

        ethereum.on("chainChanged", async () => {
          // Avoid reloading window in case when new network configuration is 
          // aded to the wallet, otherwise reload window.
          const networkId: number = await ethereum.request({
            method: "net_version",
          });
        
          if (networkId != config.network.id) {
            window.location.reload();
          }
        });
      } catch(err) {
        commit('connectFailed', err);
      }

    } else {
      commit('connectFailed', 'Install Metamask first.');
    }
  },
  setError({commit}, errorMessage: string) {
    commit('setError', errorMessage);
  },
  async disconnect({ commit }) {
    commit('changeAccount', '');
  }
};

export default actions;
