import { ActionTree } from 'vuex';
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import { StateInterface } from './index';
import { Config } from '../types/config';
import { ConnectPayload } from './mutations';

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
        // Metamask accounts and network id
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts'
        });
        const networkId: number = await ethereum.request({
          method: "net_version",
        });
        
        if (networkId == config.network.id) {
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
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
        } else {
          commit('connectFailed', `Change network to ${config.network.name}`);
        }
      } catch(err) {
        commit('connectFailed', err);
      }

    } else {
      commit('connectFailed', 'Install Metamask first.');
    }
  }
};

export default actions;